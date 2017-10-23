const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;
const MAX_PLAYER_BULLETS = 1;
const MAX_ENEMY_BULLETS = 2;
const PLAYER_BULLET_VELOCITY = -20; // pixels per frame, also, negative value goes up
const ENEMY_BULLET_VELOCITY = 10;
const BLAST_RADIUS = 10;
const BLAST_RADIUS_MINIMUM = 2;

var playerBullets = [];
var enemyBullets = [];
var allBlasts = [];

var fireButtonPressed = false;

var playerBulletStartX = 50; // temporary hard-coded values --------------------////////////////
var playerBulletStartY = 630;
var enemyBulletStartX = 50; // temporary hard-coded values ---------------------////////////////
var enemyBulletStartY = 300;
var spread; // temp variable to randomize firing positions ---------------------////////////////

var fireHold = 6; // temorary counter ------------------------------------------////////////////
const ENEMY_FIRE_COOL_DOWN = 6;
var enemyFireCoolDownCounter = ENEMY_FIRE_COOL_DOWN;

// ============================================================================= end vars

function drawBullet(x, y){
    colorRectCentered(x, y, BULLET_WIDTH, BULLET_HEIGHT, 'white');
} // =========================================================================== end function drawBullet

function drawBlast(x, y, radius){
    colorCircle(x, y, radius, 'white');
} // =========================================================================== end function drawBlast

function drawBullets(){

    // draw all player bullets
    for (var i = 0; i < playerBullets.length; i++){ // does not run if array is empty
        drawBullet(playerBullets[i].positionX, playerBullets[i].positionY);
    }

    // draw all enemy bullets
    for (var i = 0; i < enemyBullets.length; i++){ // does not run if array is empty
        drawBullet(enemyBullets[i].positionX, enemyBullets[i].positionY);
    }

    // draw all blasts
    for (var i = 0; i < allBlasts.length; i++){ // does not run if array is empty
        drawBlast(allBlasts[i].positionX, allBlasts[i].positionY, allBlasts[i].radius);
    }

} // =========================================================================== end function drawBullets

function moveBullets(){

    // increment all player bullets
    for (var i = 0; i < playerBullets.length; i++){ // does not run if array is empty
        playerBullets[i].positionY += playerBullets[i].velocityY;
        playerBullets[i].positionX += playerBullets[i].velocityX; // in this game, x velocity is always zero --- ////////
    }

    // increment all enemy bullets
    for (var i = 0; i < enemyBullets.length; i++){ // does not run if array is empty
        enemyBullets[i].positionY += enemyBullets[i].velocityY;
        enemyBullets[i].positionX += enemyBullets[i].velocityX; // in this game, x velocity is always zero --- ////////
    }

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

    // check and resolve all bullet collisions
    collideBullets();

    // fire bullets (both player and alien)
    fireAllBullets();

} // =========================================================================== end function moveBullets

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

                if (whichBullets[i].positionX > thisSliderBounds.left &&
                    whichBullets[i].positionX < thisSliderBounds.right){ // if in slider bounds (X alignment)

                    hitSlider(j);
                    destroyBullet(whichBullets, i);
                    j = -1; // breaks the j loop

                } // end if slider bounds

            } // end for j (slider index)

        } // end if slider domain

    } // end for i (bullet index)

} // =========================================================================== end function collideBulletsWithSliders

function collideBulletsWithBullets(){

    // ===== check for bullet/bullet collisions =====

    // Both outer and inner loops must start at the end and increment backwards
    // because the lengths of both arrays are changing while these loops are running
    for (var i = playerBullets.length - 1; i >= 0; i--){ // does not run if array is empty
        var playerBulletCollisionTop    = playerBullets[i].positionY - BULLET_HEIGHT/2;
        var playerBulletCollisionBottom = playerBullets[i].positionY + BULLET_HEIGHT/2 - playerBullets[i].velocityY; // prevents tunnelling
        var playerBulletCollisionRight  = playerBullets[i].positionX + BULLET_WIDTH/2;
        var playerBulletCollisionLeft   = playerBullets[i].positionX - BULLET_WIDTH/2;

        for (var j = enemyBullets.length - 1; j >= 0; j--){ // does not run if array is empty
            var enemyBulletCollisionTop    = enemyBullets[j].positionY - BULLET_HEIGHT/2 - enemyBullets[j].velocityY; // prevents tunnelling
            var enemyBulletCollisionBottom = enemyBullets[j].positionY + BULLET_HEIGHT/2;
            var enemyBulletCollisionRight  = enemyBullets[j].positionX + BULLET_WIDTH/2;
            var enemyBulletCollisionLeft   = enemyBullets[j].positionX - BULLET_WIDTH/2;

            if (playerBulletCollisionRight > enemyBulletCollisionLeft &&
                playerBulletCollisionLeft < enemyBulletCollisionRight){ // X alignment

                if (playerBulletCollisionTop < enemyBulletCollisionBottom &&
                    playerBulletCollisionBottom > enemyBulletCollisionTop){ // Y alignment, HIT

                    destroyBullet(playerBullets, i);
                    destroyBullet(enemyBullets, j);
                    j = -1; // breaks the j loop
                } // end if Y alignment

            } // end if X alignment
        } // end for j
    } // end for i

} // =========================================================================== end function collideBulletsWithBullets

function collideBulletsWithBunkers(whichBullets){

    // ===== check collision with bunkers (all bullets) =====

    // Both outer and inner loops must start at the end and increment backwards
    // because the lengths of both arrays are changing while these loops are running
    for (var i = whichBullets.length - 1; i >= 0; i--){ // does not run if array is empty

        if (whichBullets[i].positionY < BUNKERS_BOTTOM &&
            whichBullets[i].positionY > BUNKERS_TOP){ // if in bunker domain (Y alignment)

            for (var j = bunkersAll.length - 1; j >= 0; j--){ // loop through bunkers

                var thisBunkerBounds = bunkersAllBounds[j];

                if (whichBullets[i].positionX > thisBunkerBounds.left &&
                    whichBullets[i].positionX < thisBunkerBounds.right){ // if in this bunker (X alignment)

                    // get index of block (normal test)
                    var blockIndex = getBlockIndexHere(j, whichBullets[i].positionX, whichBullets[i].positionY);

                    // to prevent tunnelling, finds a position halfway between current and previous position
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
        if (whichBullets[i].positionY <= formationBottom &&
            whichBullets[i].positionY >= formationTop &&
            whichBullets[i].positionX <= formationRight &&
            whichBullets[i].positionX >= formationLeft){

            // find which cell (index) bullet is in
            cellIndex = getFormationIndexHere(whichBullets[i].positionX, whichBullets[i].positionY);

            // what is in this cell
            cellKindHere = alienGrid[cellIndex];

            // if cell is occupied
            if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION && cellKindHere != undefined){

                // get the occupant's bounds
                alienBounds = getAlienBounds(cellIndex);

                // temp draw box around bounds (this might not show up)
                colorRect(  alienBounds.left - 2,
                            alienBounds.top - 2,
                            (alienBounds.right - alienBounds.left) + 4,
                            (alienBounds.bottom - alienBounds.top) + 4,
                            'red'); // ----------------------------------------------------------------------- ////////////////

                // check this bullet against occupant's bounds for a hit
                if (whichBullets[i].positionY <= alienBounds.bottom &&
                    whichBullets[i].positionY >= alienBounds.top &&
                    whichBullets[i].positionX <= alienBounds.right &&
                    whichBullets[i].positionX >= alienBounds.left){

                    // award score
                    gameScore += (cellKindHere * 100);
                    // destroy this alien by replacing it with an explosion type
                    alienGrid[cellIndex] = ALIEN_EXPLOSION;
                    // update alien count
                    alienCounter = countAliens();
                    // pause formation motion briefly
                    // formationHoldCounter = Math.floor((ALIEN_GRID_COLS * ALIEN_GRID_ROWS)/6); // this doesn't quite work right
                    // destroy this bullet
                    destroyBullet(whichBullets, i);

                } // end if hit

            }// end if cell occupied
        } // end if formation bounds
    } // end for bullet

} // =========================================================================== end function collideBulletsWithFormation

function collideBullets(){

    collideBulletsWithTopOfWorld(playerBullets);

    collideBulletsWithGround(enemyBullets);

    collideBulletsWithSliders(playerBullets);

    collideBulletsWithBunkers(playerBullets);
    collideBulletsWithBunkers(enemyBullets);

    collideBulletsWithFormation(playerBullets);

    collideBulletsWithPlayer(enemyBullets);

    collideBulletsWithBullets();

} // =========================================================================== end function collideBullets

function fireAllBullets(){

    // ---------------------------- temporary fire control code ----------------////////////////
    fireButtonPressed = false;                                                  ////////////////
                                                                                ////////////////
    if (fireHold % 3 == 0){                                                     ////////////////
        fireButtonPressed = true;                                               ////////////////
    }                                                                           ////////////////
    fireHold++;                                                                 ////////////////
    enemyFireCoolDownCounter--;                                                 ////////////////
                                                                                ////////////////
    spread = Math.floor(Math.random() * 700);                                   ////////////////
    // ------------------------ end temporary fire control code ----------------////////////////

    // fire player bullet
    if (fireButtonPressed && playerBullets.length < MAX_PLAYER_BULLETS){
        // fireBullet(playerBullets, playerBulletStartX, playerBulletStartY, 0, PLAYER_BULLET_VELOCITY);// restore this line ////////////////
        fireBullet(playerBullets, 100 + spread, playerBulletStartY, 0, PLAYER_BULLET_VELOCITY);// delete this line ////////////////
        fireButtonPressed = false; // temporary -------------------------------------------------------------------------------////////////////
    }

    // fire enemy bullet
    if (enemyFireCoolDownCounter < 0 && enemyBullets.length < MAX_ENEMY_BULLETS){
        fireBullet(enemyBullets, enemyBulletStartX + spread, enemyBulletStartY, 0, ENEMY_BULLET_VELOCITY); // delete spread ////////////////
        enemyFireCoolDownCounter = ENEMY_FIRE_COOL_DOWN; // temporary ------------------------------------------------------////////////////
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
    // whichBullets.splice(index, 1);
    destroyElementOfArray(whichBullets, index);

} // =========================================================================== end function destroyBullet

function createBlast(blastPosX, blastPosY){

    var initialBlast = {positionX: 0, positionY: 0, radius: 0};

    allBlasts.push(initialBlast); // adds blast object to end of array
    allBlasts[allBlasts.length - 1].positionX = blastPosX;
    allBlasts[allBlasts.length - 1].positionY = blastPosY;
    allBlasts[allBlasts.length - 1].radius = BLAST_RADIUS;

} // =========================================================================== end function createBlast
