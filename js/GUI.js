
const LIFE_BAR_ORIGIN_X = 50;
const LIFE_BAR_ORIGIN_Y = 700;
const LIFE_BAR_ICON_OFFSET_X = 75;
const LIFE_BAR_ICON_OFFSET_Y = -20;
const LIFE_BAR_ICON_PITCH = 64;

const CENTER_SCREEN_X = 480;
const SCORE_X_LEFT  = CENTER_SCREEN_X - 250;
const SCORE_X_RIGHT = CENTER_SCREEN_X + 250;
const SCORE_LINE_Y_1 = 50;
const SCORE_LINE_Y_2 = 100;

const WELCOME_Y_1 = 150;
const WELCOME_Y_2 = 200;
const WELCOME_Y_3 = 300;
const WELCOME_Y_4 = 350;
const WELCOME_Y_5 = 400;
const WELCOME_Y_6 = 450;
const WELCOME_Y_7 = 500;
const WELCOME_Y_8 = 600;
const SCORE_LINE_X = CENTER_SCREEN_X - 80;
const SCORE_ICON_OFFSET_X = -60;
const SCORE_ICON_OFFSET_Y = -10;

const END_MESSAGE_Y_1 = 175;
const END_MESSAGE_Y_2 = 275;

const CHAR_WIDTH = 960/50; // experimentally measured value ------------------- NOTE

var drawingLifeBar = true;
var lifeBarLabel = ''; // I may remove this
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

// var textRuler = '123456789012345678901234567890123456789012345678901234567890';

// ============================================================================= end vars

function drawGUI() {

    // testLabel1 = 'Score  ';
    // testValue1 = gameScore;
    // //
    // testLabel2 = 'Hi Score   ';
    // testValue2 = hiScore;
    //

    // colorText(testLabel1 + testValue1, 100, 50,  'white');
    // colorText(testLabel2 + testValue2, 100, 75,  'white');
    // colorText(testLabel3 + testValue3, 100, 100, 'white');
    // colorText(testLabel4 + testValue4, 100, 125, 'white');
    // colorText(testLabel5 + testValue5, 100, 150, 'white');

    // colorRect(0, 100 - 24, canvas.width, 24, 'red');
    // colorText(textRuler, 0, 100, 'white');

    drawScoreBoard();

    if (drawingLifeBar){
        drawLifeBar();
    }

    if (welcomeScreenActive){ // -------------------------------- Welcome Screen
        drawWelcomeScreen();
    }

    if (levelEndScreenActive){ // ---------------------------- End Level Message
        drawEndLevelScreenMessage();
    }

} // =========================================================================== end function drawGUI

function drawScoreBoard(){

    // draw score
    colorTextCentered('SCORE',    SCORE_X_LEFT, SCORE_LINE_Y_1, CHAR_WIDTH, 'white')
    colorTextCentered('<      >', SCORE_X_LEFT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')
    colorTextCentered(gameScore.toString(), SCORE_X_LEFT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')

    // draw hi score
    colorTextCentered('HI SCORE', SCORE_X_RIGHT, SCORE_LINE_Y_1, CHAR_WIDTH, 'white')
    colorTextCentered('<      >', SCORE_X_RIGHT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')
    colorTextCentered(hiScore.toString(), SCORE_X_RIGHT, SCORE_LINE_Y_2, CHAR_WIDTH, 'white')

} // =========================================================================== end function drawScoreBoard

function drawLifeBar(){

    lifeBarValue = livesOnDeck;
    colorText(lifeBarLabel + lifeBarValue, LIFE_BAR_ORIGIN_X, LIFE_BAR_ORIGIN_Y,  'white');

    // Life Bar Icons
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

function drawEndLevelScreenMessage(){

        if (gameOver){
            colorTextCenteredRect('GAME OVER', CENTER_SCREEN_X, END_MESSAGE_Y_1, CHAR_WIDTH, 'white');
            if (endScreenCounter < 45 || endScreenTimerDone) {
                colorTextCenteredRect('PRESS SPACEBAR TO START', CENTER_SCREEN_X, END_MESSAGE_Y_2, CHAR_WIDTH, 'white');
            }
        }

        if (levelLose){
            colorTextCenteredRect('INVASION FORCE HAS LANDED', CENTER_SCREEN_X, END_MESSAGE_Y_1, CHAR_WIDTH, 'white');
            if (endScreenCounter < 45) {
                colorTextCenteredRect('NEXT WAVE APPROACHING', CENTER_SCREEN_X, END_MESSAGE_Y_2, CHAR_WIDTH, 'white');
            }
        }

        if (levelWin){
            colorTextCenteredRect('WAVE CLEARED', CENTER_SCREEN_X, END_MESSAGE_Y_1, CHAR_WIDTH, 'white');
            if (endScreenCounter < 45) {
                colorTextCenteredRect('NEXT WAVE APPROACHING', CENTER_SCREEN_X, END_MESSAGE_Y_2, CHAR_WIDTH, 'white');
            }
        }

} // =========================================================================== end function drawEndLevelScreenMessage
