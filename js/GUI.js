
const KEYS_OFFSET_X = 1;
const KEYS_OFFSET_Y = 0;

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

    testLabel1 = 'Lives Left  ';
    testValue1 = livesLeftPlayer1;
    //
    testLabel2 = 'Move Left   ';
    testValue2 = keyHeld_MoveLeft;
    //
    testLabel3 = 'Fire        ';
    testValue3 = keyHeld_Fire;




    colorText(testLabel1 + testValue1, 100, 50,  'white');
    // colorText(testLabel2 + testValue2, 100, 75,  'white');
    // colorText(testLabel3 + testValue3, 100, 100, 'white');
    // colorText(testLabel4 + testValue4, 100, 125, 'white');
    // colorText(testLabel5 + testValue5, 100, 150, 'white');

    if (gameOver){
        colorText('GAME OVER', 400, 150, 'white');
    }


    // drawKeyBar(blueWarrior.keysHeld, KEYS_OFFSET_X, KEYS_OFFSET_Y);

} // =========================================================================== end function drawGUI
