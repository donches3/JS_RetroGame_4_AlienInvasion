const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;

const MAX_PLAYER_BULLETS = 1; // -------------- change back to one ------------ NOTE ////////////////
const MAX_FORMATION_BULLETS = 2;
const MAX_SLIDER_BULLETS = 4; // I may not use this in the final fire control code

const PLAYER_BULLET_VELOCITY = -20; // pixels per frame, also, negative value goes up
const ENEMY_BULLET_VELOCITY = 8; // for both slider and formation bullets

var playerBullets = [];
var formationBullets = [];
var sliderBullets = [];

const FORMATION_FIRE_COOL_DOWN = 20;
var formationFireCoolDownCounter = FORMATION_FIRE_COOL_DOWN;
const SLIDER_FIRE_COOL_DOWN = 30;

// ============================================================================= end vars

function unloadBullets(){

    playerBullets = [];
    formationBullets = [];
    sliderBullets = [];
    formationFireCoolDownCounter = FORMATION_FIRE_COOL_DOWN;

} // =========================================================================== end function unloadBullets

function manageBullets(){

    // increment bullet positions
    moveBullets();
    // check and resolve all bullet collisions
    collideBullets();
    // fire bullets (both player and enemy)
    if (!gamePaused){
        fireAllBullets();
    }

} // =========================================================================== end function manageBullets

function moveBullets(){

    incrementTheseBullets(playerBullets);
    incrementTheseBullets(formationBullets);
    incrementTheseBullets(sliderBullets);

} // =========================================================================== end function moveBullets

function drawBullet(x, y){
    colorRectCentered(x, y, BULLET_WIDTH, BULLET_HEIGHT, 'white');
} // =========================================================================== end function drawBullet

function drawTheseBullets(whichBullets){
    // draw all bullets in this array
    for (var i = 0; i < whichBullets.length; i++){ // does not run if array is empty
        drawBullet(whichBullets[i].positionX, whichBullets[i].positionY);
    }
} // =========================================================================== end function drawTheseBullets


function drawBullets(){

    drawTheseBullets(playerBullets);
    drawTheseBullets(formationBullets);
    drawTheseBullets(sliderBullets);

} // =========================================================================== end function drawBullets

function incrementTheseBullets(whichBullets){
        // increment all bullets in this array
        for (var i = 0; i < whichBullets.length; i++){ // does not run if array is empty
            whichBullets[i].positionY += whichBullets[i].velocityY;
            whichBullets[i].positionX += whichBullets[i].velocityX; // in this game, x velocity is always zero --- ////////
        }
} // =========================================================================== end function incrementTheseBullets

function fireAllBullets(){

    playerFireControl();
    formationFireControl();
    sliderFireControl();

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
    // create new bullet blast object at current bullet position
    createBlast(bulletBlasts, whichBullets[index].positionX, whichBullets[index].positionY);
    // destroy this bullet without leaving gap in array
    destroyElementOfArray(whichBullets, index);

} // =========================================================================== end function destroyBullet

function playerFireControl(){

    if (playerActive){
        if (keyHeld_Fire && playerBullets.length < MAX_PLAYER_BULLETS){
            fireBullet(playerBullets, playerX, PLAYER_TOP, 0, PLAYER_BULLET_VELOCITY);
        }
    }

} // =========================================================================== end function playerFireControl

function sliderFireControl(){
    // loop through sliders and fire slider bullets if appropriate
    for (var i = 0; i < sliders.length; i++){
        if (sliders[i].coolDown < 0 && sliderBullets.length < MAX_SLIDER_BULLETS){
            fireBullet(sliderBullets, sliders[i].positionX, SLIDERS_BOTTOM, 0, ENEMY_BULLET_VELOCITY);
            sliders[i].coolDown = SLIDER_FIRE_COOL_DOWN; // reset cool down timer for this slider
        }
    }
} // =========================================================================== end function sliderFireControl

function formationFireControl(){

    if (alienCounter > 0){

        // increment fire cool down timer
        formationFireCoolDownCounter--;

        // if firing conditions met
        if (formationFireCoolDownCounter < 0 && formationBullets.length < MAX_FORMATION_BULLETS){

            // // ===== fire from bottom of random occupied column ===== // //

            // ===== get the bottom occupied index of all occupied columns =====

            var occupiedColumnBottomIndexes = [];
            for (var col = 0; col < ALIEN_GRID_COLS; col++){
                for (var row = ALIEN_GRID_ROWS - 1; row >= 0; row--){ // start at bottom
                    // what index is this
                    var index = rowColToArrayIndex(col, row, ALIEN_GRID_COLS);
                    // what is in this cell
                    var cellKindHere = alienGrid[index];
                    // if this cell occupied
                    if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION && cellKindHere != undefined){
                        // add this index to end of occupied columns array
                        occupiedColumnBottomIndexes[occupiedColumnBottomIndexes.length] = index;
                        // break row loop
                        row = -1;
                    } // end if occupied
                } // end for row
            } // end for col

            // ===== choose one of these bottom indexes at random =====

            var randomIndex = Math.floor(Math.random() * occupiedColumnBottomIndexes.length);
            var bottomIndex = occupiedColumnBottomIndexes[randomIndex];

            // ===== get firing position from this cell =====

            var alienBounds = getAlienBounds(bottomIndex);
            var fireX = Math.floor((alienBounds.left + alienBounds.right)/2);
            var fireY = alienBounds.bottom;

            // ===== fire bullet from this position =====

            fireBullet(formationBullets, fireX, fireY, 0, ENEMY_BULLET_VELOCITY);

            // ===== reset fire cool down timer =====

            formationFireCoolDownCounter = FORMATION_FIRE_COOL_DOWN;

        } // end if firing conditions
    } // end if alien counter

} // =========================================================================== end function formationFireControl
