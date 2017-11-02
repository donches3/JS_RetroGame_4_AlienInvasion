
var canvas, canvasContext;


// ============================================================================= end vars

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    // rudimentary loading screen
    colorRect(0,0, canvas.width, canvas.height, 'black');
    colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

    // game won't start until images finish loading
    loadImages();
} // end window.onload ---------------------------------------------------------

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;

    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();

    hiScore = 0;
    resetGame();
    // loadLevelSequence();

} // =========================================================================== end function imageLoadingDoneSoStartGame

function updateAll() {

    colorRect(0,0, canvas.width, canvas.height, 'black');

    if (welcomeScreenActive){ // -------------------------------- Welcome Screen
        drawWelcomeScreen();
        if (welcomeScreenDone && keyHeld_Fire){
            welcomeScreenActive = false;
            loadingScreenActive = true;
        }
    }

    if (loadingScreenActive){ // -------------------------- Level Loading Screen
        loadLevelSequence();
    }

    if(playScreenActive){ // --------------------------------------- Play Screen
        managePlayScreen();
    }

    if (waveCleared){
        loadingScreenActive = true;
        waveCleared = false;
    }

    if (gameOver && keyHeld_Fire){
        resetGame();
    }

    drawGUI();

} // =========================================================================== end function updateAll

function resetGame(){
    welcomeScreenActive = true;
    loadingScreenActive = false;
    playScreenActive = false;
    gameOver = false;

    welcomeScreenCounter = 0;
    welcomeScreenDone = false;

    drawingLifeBar = false;

    unloadLevel();

    if (gameScore > hiScore){
        hiScore = gameScore;
    }

    gameScore = 0;
    livesOnDeck = 3;
} // =========================================================================== end function resetGame
