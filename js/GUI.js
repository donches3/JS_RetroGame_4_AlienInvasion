
// const KEYS_OFFSET_X = 1;
// const KEYS_OFFSET_Y = 0;

const LIFE_BAR_ORIGIN_X = 50;
const LIFE_BAR_ORIGIN_Y = 700;
const LIFE_BAR_ICON_OFFSET_X = 180;
const LIFE_BAR_ICON_OFFSET_Y = -20;
const LIFE_BAR_ICON_PITCH = 64;

const CENTER_SCREEN_X = 450;
const SCORE_X_LEFT  = CENTER_SCREEN_X - 250;
const SCORE_X_RIGHT = CENTER_SCREEN_X + 250;
const SCORE_LINE_Y_1 = 50;
const SCORE_LINE_Y_2 = 75;

const WELCOME_Y_1 = 150;
const WELCOME_Y_2 = 200;
const WELCOME_Y_3 = 300;
const WELCOME_Y_4 = 350;
const WELCOME_Y_5 = 400;
const WELCOME_Y_6 = 450;
const WELCOME_Y_7 = 500;
const WELCOME_Y_8 = 600;
const SCORE_LINE_X = 405;
const SCORE_ICON_OFFSET_X = -45;
const SCORE_ICON_OFFSET_Y = -6;

const CHAR_WIDTH = 900/71.25; // experimentally measured value

var drawingLifeBar = true;
var lifeBarLabel = 'Lives Left: ';
var lifeBarValue;

var welcomeScreenCounter = 0;
var welcomeScreenDone = false;



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
    testValue1 = gameScore;
    //
    testLabel2 = 'Hi Score   ';
    testValue2 = hiScore;
    //




    // colorText(testLabel1 + testValue1, 100, 50,  'white');
    // colorText(testLabel2 + testValue2, 100, 75,  'white');
    // colorText(testLabel3 + testValue3, 100, 100, 'white');
    // colorText(testLabel4 + testValue4, 100, 125, 'white');
    // colorText(testLabel5 + testValue5, 100, 150, 'white');

    drawScoreBoard();

    if (gameOver){
        // colorText('GAME OVER', 400, 150, 'white');
        colorTextCentered('GAME OVER', CENTER_SCREEN_X, 175, CHAR_WIDTH, 'white')
        // colorText('Press Spacebar to Start', 400, 200, 'white');
        colorTextCentered('PRESS SPACEBAR TO START', CENTER_SCREEN_X, 225, CHAR_WIDTH, 'white')
    }

    if (drawingLifeBar){
        drawLifeBar();
    }



} // =========================================================================== end function drawGUI

// const SCORE_X_LEFT  = CENTER_SCREEN_X - 200;
// const SCORE_X_RIGHT = CENTER_SCREEN_X + 200;
// const SCORE_LINE_Y_1 = 50;
// const SCORE_LINE_Y_2 = 75;

function drawScoreBoard(){

    // draw score
    colorTextCentered('SCORE',    SCORE_X_LEFT, SCORE_LINE_Y_1, CHAR_WIDTH, 'white')
    colorTextCentered('<      >', SCORE_X_LEFT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')
    colorTextCentered(gameScore.toString(),  SCORE_X_LEFT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')

    // draw hi score
    colorTextCentered('HI SCORE', SCORE_X_RIGHT, SCORE_LINE_Y_1, CHAR_WIDTH, 'white')
    colorTextCentered('<      >', SCORE_X_RIGHT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')
    colorTextCentered(hiScore.toString(),    SCORE_X_RIGHT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')


}

function drawLifeBar(){
    lifeBarValue = livesOnDeck;
    colorText(lifeBarLabel + lifeBarValue, LIFE_BAR_ORIGIN_X, LIFE_BAR_ORIGIN_Y,  'white');

    for (var i = 0; i < lifeBarValue; i++){
        var drawX = LIFE_BAR_ORIGIN_X + LIFE_BAR_ICON_OFFSET_X + (i * LIFE_BAR_ICON_PITCH);
        var drawY = LIFE_BAR_ORIGIN_Y + LIFE_BAR_ICON_OFFSET_Y;
        drawBitmap(playerPic, drawX, drawY);
    }
} // =========================================================================== end function drawLifeBar

function drawWelcomeScreen(){

    if (welcomeScreenDone || welcomeScreenCounter > 20){ // draw line 1
        colorTextCentered('ALIENS', CENTER_SCREEN_X, WELCOME_Y_1, CHAR_WIDTH, 'white');
    }
    if (welcomeScreenDone || welcomeScreenCounter > 30){ // draw line 2
        colorTextCentered('WHAT INVADE FROM SPACE', CENTER_SCREEN_X, WELCOME_Y_2, CHAR_WIDTH, 'white');
    }

    if (welcomeScreenDone || welcomeScreenCounter > 50){ // draw line 3
        colorTextCentered('**** SCORE TABLE ****', CENTER_SCREEN_X, WELCOME_Y_3, CHAR_WIDTH, 'white');
    }
    if (welcomeScreenDone || welcomeScreenCounter > 60){ // draw line 4
        colorText('=  10  POINTS', SCORE_LINE_X, WELCOME_Y_4, 'white');
        drawBitmapCentered(alienPics[1], SCORE_LINE_X + SCORE_ICON_OFFSET_X, WELCOME_Y_4 + SCORE_ICON_OFFSET_Y);
    }
    if (welcomeScreenDone || welcomeScreenCounter > 70){ // draw line 5
        colorText('=  20  POINTS', SCORE_LINE_X, WELCOME_Y_5, 'white');
        drawBitmapCentered(alienPics[2], SCORE_LINE_X + SCORE_ICON_OFFSET_X, WELCOME_Y_5 + SCORE_ICON_OFFSET_Y);
    }
    if (welcomeScreenDone || welcomeScreenCounter > 80){ // draw line 6
        colorText('=  30  POINTS', SCORE_LINE_X, WELCOME_Y_6, 'white');
        drawBitmapCentered(alienPics[3], SCORE_LINE_X + SCORE_ICON_OFFSET_X, WELCOME_Y_6 + SCORE_ICON_OFFSET_Y);
    }
    if (welcomeScreenDone || welcomeScreenCounter > 90){ // draw line 7
        colorText('=  ?  MYSTERY', SCORE_LINE_X, WELCOME_Y_7, 'white');
        drawBitmapCentered(alienPics[4], SCORE_LINE_X + SCORE_ICON_OFFSET_X, WELCOME_Y_7 + SCORE_ICON_OFFSET_Y);
    }

    if (welcomeScreenDone){ // draw line 8
        colorTextCentered('PRESS SPACEBAR TO START', CENTER_SCREEN_X, WELCOME_Y_8, CHAR_WIDTH, 'white');
    }

    if (welcomeScreenCounter > 110){
        welcomeScreenDone = true;
    }

    if (!welcomeScreenDone){
        welcomeScreenCounter++;
    }

} // =========================================================================== end function drawWelcomeScreen
