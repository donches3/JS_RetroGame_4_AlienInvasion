const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;

const MAX_PLAYER_BULLETS = 1;
const MAX_FORMATION_BULLETS = 2;
const MAX_SLIDER_BULLETS = 12; // I may not use this in the final fire control code

const PLAYER_BULLET_VELOCITY = -20; // pixels per frame, also, negative value goes up
const ENEMY_BULLET_VELOCITY = 10; // for both slider and formation bullets

const BLAST_RADIUS = 10;
const BLAST_RADIUS_MINIMUM = 2;

var playerBullets = [];
var formationBullets = [];
var sliderBullets = [];
var allBlasts = [];

var fireButtonPressed = false;

var playerBulletStartX = 50; // temporary hard-coded values --------------------////////////////
var playerBulletStartY = 630;
var formationBulletStartX = 50; // temporary hard-coded values ---------------------////////////////
var formationBulletStartY = 300;
var sliderBulletStartX = 50; // temporary hard-coded values ---------------------////////////////
var sliderBulletStartY = SLIDERS_BOTTOM;
var spread; // temp variable to randomize firing positions ---------------------////////////////

var fireHold = 6; // temorary counter ------------------------------------------////////////////
const FORMATION_FIRE_COOL_DOWN = 6;
var formationFireCoolDownCounter = FORMATION_FIRE_COOL_DOWN;
const SLIDER_FIRE_COOL_DOWN = 30;

// ============================================================================= end vars

function manageBullets(){

    // increment bullet positions
    moveBullets();

    // increment (shrink) all blasts and destroy the ones with minimum radius
    incrementBlasts();

    // check and resolve all bullet collisions
    collideBullets();

    // fire bullets (both player and enemy)
    fireAllBullets();

} // =========================================================================== end function manageBullets

function drawBullet(x, y){
    colorRectCentered(x, y, BULLET_WIDTH, BULLET_HEIGHT, 'white');
} // =========================================================================== end function drawBullet

function drawTheseBullets(whichBullets){
    // draw all bullets in this array
    for (var i = 0; i < whichBullets.length; i++){ // does not run if array is empty
        drawBullet(whichBullets[i].positionX, whichBullets[i].positionY);
    }
} // =========================================================================== end function drawTheseBullets

function drawBlast(x, y, radius){
    colorCircle(x, y, radius, 'white');
} // =========================================================================== end function drawBlast

function drawBullets(){

    // draw all player bullets
    drawTheseBullets(playerBullets);
    // draw all enemy formation bullets
    drawTheseBullets(formationBullets);
    // draw all enemy slider bullets
    drawTheseBullets(sliderBullets);

    // draw all blasts
    for (var i = 0; i < allBlasts.length; i++){ // does not run if array is empty
        drawBlast(allBlasts[i].positionX, allBlasts[i].positionY, allBlasts[i].radius);
    }

} // =========================================================================== end function drawBullets

function incrementTheseBullets(whichBullets){
        // increment all bullets in this array
        for (var i = 0; i < whichBullets.length; i++){ // does not run if array is empty
            whichBullets[i].positionY += whichBullets[i].velocityY;
            whichBullets[i].positionX += whichBullets[i].velocityX; // in this game, x velocity is always zero --- ////////
        }
} // =========================================================================== end function incrementTheseBullets

function moveBullets(){

    // increment all player bullets
    incrementTheseBullets(playerBullets);
    // increment all enemy formation bullets
    incrementTheseBullets(formationBullets);
    // increment all enemy slider bullets
    incrementTheseBullets(sliderBullets);

} // =========================================================================== end function moveBullets

function collideBullets(){

    collideBulletsWithTopOfWorld(playerBullets);

    collideBulletsWithGround(formationBullets);
    collideBulletsWithGround(sliderBullets);

    collideBulletsWithSliders(playerBullets);

    collideBulletsWithBunkers(playerBullets);
    collideBulletsWithBunkers(formationBullets);
    collideBulletsWithBunkers(sliderBullets);

    collideBulletsWithFormation(playerBullets);

    collideBulletsWithPlayer(formationBullets);
    collideBulletsWithPlayer(sliderBullets);

    collideBulletsWithBullets(playerBullets, formationBullets);
    collideBulletsWithBullets(playerBullets, sliderBullets);

} // =========================================================================== end function collideBullets

function collideBulletsWithTopOfWorld(whichBullets){

    // ===== check top-of-world collision (player bullets only) =====

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty
        if (whichBullets[i].positionY <= TOP_OF_WORLD){

            destroyBullet(whichBullets, i);

        }
    }

} // =========================================================================== end function collideBulletsWithTopOfWorld

function collideBulletsWithGround(whichBullets){

    // ===== check ground collision (enemy bullets only) =====

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

    // ===== check collision with alien sliders (player bullets only) =====

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

    // ===== check collision with bunkers (all bullets) =====

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

    // ===== check collision with Player (enemy bullets only) =====

} // =========================================================================== end function collideBulletsWithPlayer

function collideBulletsWithFormation(whichBullets){

    // ===== check collision with alien formation (player bullets only) =====

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
                    gameScore += (cellKindHere * 100);
                    // destroy this alien by replacing it with an explosion type
                    alienGrid[cellIndex] = ALIEN_EXPLOSION;
                    // update alien count
                    alienCounter = countFormationAliens();
                    // pause formation motion briefly
                    // formationHoldCounter = Math.floor((ALIEN_GRID_COLS * ALIEN_GRID_ROWS)/6); // this doesn't quite work right
                    // destroy this bullet
                    destroyBullet(whichBullets, i);

                } // end if hit

            }// end if cell occupied
        } // end if formation bounds
    } // end for bullet

} // =========================================================================== end function collideBulletsWithFormation

function fireAllBullets(){

    // ---------------------------- temporary fire control code ----------------////////////////
    fireButtonPressed = false;                                                  ////////////////
                                                                                ////////////////
    if (fireHold % 3 == 0){                                                     ////////////////
        fireButtonPressed = true;                                               ////////////////
    }                                                                           ////////////////
    fireHold++;                                                                 ////////////////
    formationFireCoolDownCounter--;                                             ////////////////
                                                                                ////////////////
    spread = Math.floor(Math.random() * 700);                                   ////////////////
    // ------------------------ end temporary fire control code ----------------////////////////

    // fire player bullet
    if (fireButtonPressed && playerBullets.length < MAX_PLAYER_BULLETS){
        // fireBullet(playerBullets, playerBulletStartX, playerBulletStartY, 0, PLAYER_BULLET_VELOCITY);// restore this line ////////////////
        fireBullet(playerBullets, 100 + spread, playerBulletStartY, 0, PLAYER_BULLET_VELOCITY);// delete this line ////////////////
        fireButtonPressed = false; // temporary -------------------------------------------------------------------------------////////////////
    }

    // fire enemy formation bullet
    if (formationFireCoolDownCounter < 0 && formationBullets.length < MAX_FORMATION_BULLETS){
        fireBullet(formationBullets, formationBulletStartX + spread, formationBulletStartY, 0, ENEMY_BULLET_VELOCITY); // delete spread ////////////////
        formationFireCoolDownCounter = FORMATION_FIRE_COOL_DOWN; // temporary ------------------------------------------------------////////////////
    }

    // loop through sliders and fire slider bullets if appropriate
    for (var i = 0; i < sliders.length; i++){
        if (sliders[i].coolDown < 0 && sliderBullets.length < MAX_SLIDER_BULLETS){
            fireBullet(sliderBullets, sliders[i].positionX, SLIDERS_BOTTOM, 0, ENEMY_BULLET_VELOCITY);
            sliders[i].coolDown = SLIDER_FIRE_COOL_DOWN;
        }
    }

} // =========================================================================== end function fireAllBullets

function fireBullet(whichBullets, firePosX, firePosY, bulletVelocityX, bulletVelocityY){
    var initialBullet = {positionX: 0, positionY: 0, velocityX: 0, velocityY: 0};

    whichBullets.push(initialBullet); // adds bullet object to end of array
    whichBullets[whichBullets.length - 1].positionX = firePosX;
    whichBullets[whichBullets.length - 1].positionY = firePosY;
    whichBullets[whichBullets.length - 1].velocityX = bulletVelocityX; // in this game, x velocity is always zero
    whichBullets[whichBullets.length - 1].velocityY = bulletVelocityY;

} // =========================================================================== end function fireBullet

function destroyBullet(whichBullets, index){
    // create new blast object at current bullet position
    createBlast(whichBullets[index].positionX, whichBullets[index].positionY);
    // destroy this bullet without leaving gap in array
    destroyElementOfArray(whichBullets, index);

} // =========================================================================== end function destroyBullet

function createBlast(blastPosX, blastPosY){
    var initialBlast = {positionX: 0, positionY: 0, radius: 0};

    allBlasts.push(initialBlast); // adds blast object to end of array
    allBlasts[allBlasts.length - 1].positionX = blastPosX;
    allBlasts[allBlasts.length - 1].positionY = blastPosY;
    allBlasts[allBlasts.length - 1].radius = BLAST_RADIUS;

} // =========================================================================== end function createBlast

function incrementBlasts(){

    // increment (shrink) all blasts and destroy the ones with minimum radius

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = allBlasts.length - 1; i >= 0; i--){
        allBlasts[i].radius -= 1;
        if (allBlasts[i].radius <= BLAST_RADIUS_MINIMUM){
            // destroy this blast without leaving gap in array
            destroyElementOfArray(allBlasts, i);
        }
    }

} // =========================================================================== end function incrementBlasts
