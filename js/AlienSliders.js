
const SLIDERS_MAXIMUM = 3;
const SLIDERS_Y = 135;
const SLIDERS_HEIGHT = 24; // probably not gonna use this
const SLIDERS_TOP = SLIDERS_Y - 12;
const SLIDERS_BOTTOM = SLIDERS_Y + 12;
const SLIDER_SPEED_SLOW = 10;
const SLIDER_SPEED_MEDIUM = 15;
const SLIDER_SPEED_FAST = 20;
const SLIDER_SPAWN_COOL_DOWN = 300;
var sliderSpawnCoolDownCounter = SLIDER_SPAWN_COOL_DOWN;
var sliderSpawnsOnRight = true;
var sliders = [];
var sliderExplosions = [];

// ============================================================================= end vars

function manageSliders(){

    spawnOccasionalSlider();
    moveSliders();
    destroyOffScreenSliders();
    incrementSliderExplosions();

} // =========================================================================== end function manageSliders

function spawnOccasionalSlider(){

    // occasionally spawn a slider
    // uses cool-down timer and maximun number of sliders
    if (sliders.length < SLIDERS_MAXIMUM && sliderSpawnCoolDownCounter <= 0){
        spawnSlider(sliderSpawnsOnRight, ALIEN_SLIDER, SLIDER_SPEED_SLOW);
        sliderSpawnCoolDownCounter = SLIDER_SPAWN_COOL_DOWN;
        sliderSpawnsOnRight = !sliderSpawnsOnRight;
    }
    sliderSpawnCoolDownCounter--;

} // =========================================================================== end function spawnOccasionalSlider

function destroyOffScreenSliders(){

    // destroy sliders that leave the screen
    //
    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = sliders.length - 1; i >= 0; i--){ // does not run if array is empty
        var sliderBounds = getSliderBounds(i);

        if(sliderBounds.right < 0 || sliderBounds.left > canvas.width){
            // destroy slider
            destroyElementOfArray(sliders, i);
        }
    }

} // =========================================================================== end function destroyOffScreenSliders

function moveSliders(){

    // increment slider positions and also slider coolDown timers
    for (var i = 0; i < sliders.length; i++){ // does not run if array is empty
        sliders[i].positionX += sliders[i].velocityX;
        sliders[i].coolDown--;
    }

} // =========================================================================== end function moveSliders

function spawnSlider(spawnOnRight, sliderType, sliderSpeed){

    var initialSlider = {positionX:0, velocityX:0, type:0, width:0, coolDown:0};
    var spawnOffset;

    sliders.push(initialSlider); // adds slider object to end of array

    sliders[sliders.length - 1].type = sliderType;
    sliders[sliders.length - 1].width = alienPics[sliderType].width;
    sliders[sliders.length - 1].coolDown = Math.floor(SLIDER_FIRE_COOL_DOWN/2);

    spawnOffset = Math.floor((sliders[sliders.length - 1].width)/2);

    if (spawnOnRight){ // just off right side of screen with a negative velocity
        sliders[sliders.length - 1].positionX = canvas.width + spawnOffset;
        sliders[sliders.length - 1].velocityX = -sliderSpeed;
    }else{ // just off left side of screen with a positive velocity
        sliders[sliders.length - 1].positionX = -spawnOffset;
        sliders[sliders.length - 1].velocityX = sliderSpeed;
    }

} // =========================================================================== end function spawnSlider

function drawSliders(){

    // draw sliders
    for (var i = 0; i < sliders.length; i++){ // does not run if array is empty
        drawBitmapCentered(alienPics[sliders[i].type], sliders[i].positionX, SLIDERS_Y);
    }

    // draw slider explosions
    for (var i = 0; i < sliderExplosions.length; i++){ // does not run if array is empty
        drawBitmapCentered(alienPics[ALIEN_EXPLOSION], sliderExplosions[i].positionX, SLIDERS_Y);
        var textOffsetX = -20;
        var textOffsetY = 7;
        colorRectCentered(sliderExplosions[i].positionX, SLIDERS_Y, 44, 18, 'black')
        colorText(sliderExplosions[i].score, sliderExplosions[i].positionX + textOffsetX, SLIDERS_Y + textOffsetY, 'white');
    }

} // =========================================================================== end function drawSliders

function getSliderBounds(index){
    var bounds = {top:0, bottom:0, right:0, left:0};

    bounds.top    = SLIDERS_TOP;
    bounds.bottom = SLIDERS_BOTTOM;
    bounds.right  = sliders[index].positionX + Math.floor(sliders[index].width/2);
    bounds.left   = sliders[index].positionX - Math.floor(sliders[index].width/2);

    return bounds;

} // =========================================================================== end function getSliderBounds

function hitSlider(index){

    // randomly generate score from 100 to 300 points at 100 point increments
    var thisScore = 100 + ((Math.floor(Math.random() * 3)) * 100);

    // get position from slider
    var thisPosition = sliders[index].positionX;

    // destroy slider
    destroyElementOfArray(sliders, index);

    // create slider explosion
    createSliderExplosion(thisPosition, thisScore);

    // add this score to game score
    gameScore += thisScore;

} // =========================================================================== end function hitSlider

function createSliderExplosion(x, score){
    var initialExplosion = {positionX:0, countdown:0, score:0};
    var countdown = 15;

    sliderExplosions.push(initialExplosion); // adds explosion object to end of array

    sliderExplosions[sliderExplosions.length - 1].positionX = x;
    sliderExplosions[sliderExplosions.length - 1].countdown = countdown;
    sliderExplosions[sliderExplosions.length - 1].score = score;

} // =========================================================================== end function createSliderExplosion

function incrementSliderExplosions(){

    // decrements each countdown timer and destroys each explosion that hits zero

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = sliderExplosions.length - 1; i >= 0; i--){ // does not run if array is empty
        sliderExplosions[i].countdown--;
        if (sliderExplosions[i].countdown <= 0){
            destroyElementOfArray(sliderExplosions, i);
        }
    }

} // =========================================================================== end function incrementSliderExplosions
