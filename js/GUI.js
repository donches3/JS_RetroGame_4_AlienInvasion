
const KEYS_OFFSET_X = 1;
const KEYS_OFFSET_Y = 0;

const LIFE_BAR_ORIGIN_X = 50;
const LIFE_BAR_ORIGIN_Y = 700;
const LIFE_BAR_ICON_OFFSET_X = 180;
const LIFE_BAR_ICON_OFFSET_Y = -20;
const LIFE_BAR_ICON_PITCH = 64;

var drawingLifeBar = true;

var lifeBarLabel = 'Lives Left: ';
var lifeBarValue;

// function drawKeyBar(keys, keysTileX, keysTileY) {
//
//     for (var thisKey = 0; thisKey < keys; thisKey++) {
//         // tile position of this key
//         var thisKeyX = (keysTileX + thisKey) * TILE_WIDTH;
//         var thisKeyY = keysTileY * TILE_HEIGHT;
//
//         // draw this key
//         canvasContext.drawImage(worldPics[WORLD_KEY], thisKeyX, thisKeyY);
//     }
//
// } // =========================================================================== end function drawKeyBar

var testLabel1 = 'LABEL 1  ';
var testValue1 = 909;

var testLabel2 = 'LABEL 2  ';
var testValue2 = 909;

var testLabel3 = 'LABEL 3  ';
var testValue3 = 909;

var testLabel4 = 'LABEL 4  ';
var testValue4 = 909;

var testLabel5 = 'LABEL 5  ';
var testValue5 = 909;

function drawGUI() {

    testLabel1 = 'Score  ';
    testValue1 = gameScorePlayer1;
    //
    testLabel2 = 'Hi Score   ';
    testValue2 = hiScore;
    //
    testLabel3 = 'Fire        ';
    testValue3 = keyHeld_Fire;




    colorText(testLabel1 + testValue1, 100, 50,  'white');
    colorText(testLabel2 + testValue2, 100, 75,  'white');
    // colorText(testLabel3 + testValue3, 100, 100, 'white');
    // colorText(testLabel4 + testValue4, 100, 125, 'white');
    // colorText(testLabel5 + testValue5, 100, 150, 'white');

    if (gameOver){
        colorText('GAME OVER', 400, 150, 'white');
        colorText('Press Spacebar to Start', 400, 200, 'white');
    }

    if (drawingLifeBar){
        drawLifeBar();
    }


    // drawKeyBar(blueWarrior.keysHeld, KEYS_OFFSET_X, KEYS_OFFSET_Y);

} // =========================================================================== end function drawGUI

function drawLifeBar(){
    lifeBarValue = livesLeftPlayer1;
    colorText(lifeBarLabel + lifeBarValue, LIFE_BAR_ORIGIN_X, LIFE_BAR_ORIGIN_Y,  'white');

    for (var i = 0; i < lifeBarValue; i++){
        var drawX = LIFE_BAR_ORIGIN_X + LIFE_BAR_ICON_OFFSET_X + (i * LIFE_BAR_ICON_PITCH);
        var drawY = LIFE_BAR_ORIGIN_Y + LIFE_BAR_ICON_OFFSET_Y;
        drawBitmap(playerPic, drawX, drawY);
    }
} // =========================================================================== end function drawLifeBar

function drawWelcomeScreen(){
    colorText('Welcome Screen', 400, 150, 'white');
    colorText('Press Spacebar to Start', 400, 200, 'white');



} // =========================================================================== end function drawWelcomeScreen
