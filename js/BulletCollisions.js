
function collideBullets(){

    // check top-of-world collision (player bullets only)
    collideBulletsWithTopOfWorld(playerBullets);

    // check ground collision (enemy bullets only)
    collideBulletsWithGround(formationBullets);
    collideBulletsWithGround(sliderBullets);

    // check collision with alien sliders (player bullets only)
    collideBulletsWithSliders(playerBullets);

    // check collision with bunkers (all bullets)
    collideBulletsWithBunkers(playerBullets);
    collideBulletsWithBunkers(formationBullets);
    collideBulletsWithBunkers(sliderBullets);

    // check collision with alien formation (player bullets only)
    collideBulletsWithFormation(playerBullets);

    // check collision with Player (enemy bullets only)
    collideBulletsWithPlayer(formationBullets);
    collideBulletsWithPlayer(sliderBullets);

    // check for bullet/bullet collisions (player bullets vs enemy bullets)
    collideBulletsWithBullets(playerBullets, formationBullets);
    collideBulletsWithBullets(playerBullets, sliderBullets);

} // =========================================================================== end function collideBullets

function collideBulletsWithTopOfWorld(whichBullets){

    // ===== check top-of-world collision =====

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty
        if (whichBullets[i].positionY <= TOP_OF_WORLD){

            destroyBullet(whichBullets, i);

        }
    }

} // =========================================================================== end function collideBulletsWithTopOfWorld

function collideBulletsWithGround(whichBullets){

    // ===== check ground collision =====

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty
        if (whichBullets[i].positionY >= canvas.height - GROUND_LEVEL){

            // move bullet to ground level to prevent tunnelling
            whichBullets[i].positionY = canvas.height - GROUND_LEVEL;

            destroyBullet(whichBullets, i);

        }
    }

} // =========================================================================== end function collideBulletsWithGround

function collideBulletsWithSliders(whichBullets){

    // ===== check collision with alien sliders =====

    // Both outer and inner loops must start at the end and increment backwards
    // because the lengths of both arrays are changing while these loops are running
    for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty

        if (whichBullets[i].positionY < SLIDERS_BOTTOM &&
            whichBullets[i].positionY > SLIDERS_TOP){ // if in slider domain (Y alignment)

            for (var j = sliders.length - 1; j >= 0; j--){ // does not run if array is empty

                var thisSliderBounds = getSliderBounds(j)

                // check bullet position against this slider for HIT
                if (isPointInsideRectangle(whichBullets[i].positionX, whichBullets[i].positionY, thisSliderBounds)){

                    hitSlider(j);
                    destroyBullet(whichBullets, i);
                    j = -1; // breaks the j loop

                } // end if slider bounds
            } // end for j (slider index)
        } // end if slider domain
    } // end for i (bullet index)

} // =========================================================================== end function collideBulletsWithSliders

function collideBulletsWithBullets(theseBullets, thoseBullets){

    // ===== check for bullet/bullet collisions =====

    // Both outer and inner loops must start at the end and increment backwards
    // because the lengths of both arrays are changing while these loops are running
    for (var i = theseBullets.length - 1; i >= 0; i--){ // does not run if array is empty
        var theseBulletBounds = {top:0, bottom:0, right:0, left:0};
        theseBulletBounds.top    = theseBullets[i].positionY - BULLET_HEIGHT/2;
        theseBulletBounds.bottom = theseBullets[i].positionY + BULLET_HEIGHT/2 - theseBullets[i].velocityY; // prevents tunnelling
        theseBulletBounds.right  = theseBullets[i].positionX + BULLET_WIDTH/2;
        theseBulletBounds.left   = theseBullets[i].positionX - BULLET_WIDTH/2;

        for (var j = thoseBullets.length - 1; j >= 0; j--){ // does not run if array is empty
            var thoseBulletBounds = {top:0, bottom:0, right:0, left:0};
            thoseBulletBounds.top    = thoseBullets[j].positionY - BULLET_HEIGHT/2 - thoseBullets[j].velocityY; // prevents tunnelling
            thoseBulletBounds.bottom = thoseBullets[j].positionY + BULLET_HEIGHT/2;
            thoseBulletBounds.right  = thoseBullets[j].positionX + BULLET_WIDTH/2;
            thoseBulletBounds.left   = thoseBullets[j].positionX - BULLET_WIDTH/2;

            // check bullet bounds for overlap for a HIT
            if(doTheseRectanglesOverlap(theseBulletBounds, thoseBulletBounds)){
                destroyBullet(theseBullets, i);
                destroyBullet(thoseBullets, j);
                j = -1; // breaks the j loop
            } // end if overlap

        } // end for j
    } // end for i

} // =========================================================================== end function collideBulletsWithBullets

function collideBulletsWithBunkers(whichBullets){

    // ===== check collision with bunkers =====

    // Both outer and inner loops must start at the end and increment backwards
    // because the lengths of both arrays are changing while these loops are running
    for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty

        // if bullet is in bunker domain
        if (isPointInsideRectangle(whichBullets[i].positionX, whichBullets[i].positionY, bunkerDomainBounds)){

            for (var j = bunkersAll.length - 1; j >= 0; j--){ // loop through bunkers

                var thisBunkerBounds = bunkersAllBounds[j];

                // if bullet is in this bunker
                if (isPointInsideRectangle(whichBullets[i].positionX, whichBullets[i].positionY, thisBunkerBounds)){

                    // get index of block (normal test)
                    var blockIndex = getBlockIndexHere(j, whichBullets[i].positionX, whichBullets[i].positionY);

                    // to prevent tunnelling, finds a position halfway between current and previous position
                    // this won't work reliably for high bullet velocities --------------------------------- NOTE
                    var bulletBackX = whichBullets[i].positionX - Math.floor(whichBullets[i].velocityX/2);
                    var bulletBackY = whichBullets[i].positionY - Math.floor(whichBullets[i].velocityY/2);
                    var blockIndexBack = getBlockIndexHere(j, bulletBackX, bulletBackY);

                    // if this block is a block (HIT)
                    if (bunkersAll[j][blockIndexBack] == BUNKER_BLOCK){ // to prevent tunnelling
                        // destroy this block by replacing it with damaged block
                        bunkersAll[j][blockIndexBack] = BUNKER_DAMAGE;
                        // destroy this bullet
                        destroyBullet(whichBullets, i);
                        j = -1; // breaks the j loop
                    }else if (bunkersAll[j][blockIndex] == BUNKER_BLOCK){ // normal test
                        // destroy this block by replacing it with damaged block
                        bunkersAll[j][blockIndex] = BUNKER_DAMAGE;
                        // destroy this bullet
                        destroyBullet(whichBullets, i);
                        j = -1; // breaks the j loop
                    } // end if block

                } // end if bunker bounds
            } // end for j (bunker index)
        } // end if bunker domain
    } // end for i (bullet index)

} // =========================================================================== end function collideBulletsWithBunkers

function collideBulletsWithPlayer(whichBullets){

    // ===== check collision with Player =====

    if (playerLoaded){
        // this loop must start at the end and increment backwards
        // because the length of the array is changing while this loop is running
        for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty
            if (isPointInsideRectangle(whichBullets[i].positionX, whichBullets[i].positionY, playerBounds)){

                destroyBullet(whichBullets, i);
                destroyPlayer();

            }
        }
    }

} // =========================================================================== end function collideBulletsWithPlayer

function collideBulletsWithFormation(whichBullets){

    // ===== check collision with alien formation =====

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty
        var cellIndex;
        var cellKindHere;

        var alienBounds = {top:0, bottom:0, left:0, right:0};

        // check this bullet against formation bounds
        if (isPointInsideRectangle(whichBullets[i].positionX, whichBullets[i].positionY, formationBounds)){

            // find which cell (index) bullet is in
            cellIndex = getFormationIndexHere(whichBullets[i].positionX, whichBullets[i].positionY);

            // what is in this cell
            cellKindHere = alienGrid[cellIndex];

            // if cell is occupied
            if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION && cellKindHere != undefined){

                // get the occupant's bounds
                alienBounds = getAlienBounds(cellIndex);

                // check this bullet against occupant's bounds for a hit
                if (isPointInsideRectangle(whichBullets[i].positionX, whichBullets[i].positionY, alienBounds)){

                    // award score
                    gameScore += (cellKindHere * 10);
                    // destroy this alien by replacing it with an explosion type
                    alienGrid[cellIndex] = ALIEN_EXPLOSION;
                    // update alien count
                    alienCounter = countFormationAliens();
                    // pause formation motion briefly
                    if (!formationHoldShield){
                        if (formationHoldCounter < FORMATION_HIT_PAUSE){
                            formationHoldCounter = FORMATION_HIT_PAUSE;
                        }
                        formationHoldShield = true;
                    }
                    // destroy this bullet
                    destroyBullet(whichBullets, i);

                } // end if hit

            }// end if cell occupied
        } // end if formation bounds
    } // end for bullet

} // =========================================================================== end function collideBulletsWithFormation
