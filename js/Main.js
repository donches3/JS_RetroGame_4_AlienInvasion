
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

} // =========================================================================== end function imageLoadingDoneSoStartGame

function updateAll() {

    colorRect(0,0, canvas.width, canvas.height, 'black');

    if (welcomeScreenActive){ // -------------------------------- Welcome Screen
        // function Draw Welcome Screen is in Draw GUI
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

    if (levelEndScreenActive){

        endScreenTimer();
        drawAllGameObjects();

        if (gameOver && (endScreenCounter < 35 || endScreenTimerDone) && keyHeld_Fire){
            resetGame();
        }

        if (levelLose && endScreenTimerDone){
            levelEndScreenActive = false;
            loadingScreenActive = true;
        }

        if (levelWin && endScreenTimerDone){
            levelEndScreenActive = false;
            loadingScreenActive = true;
            playerCarryOver = true;
            playerLoaded = false;
        }

    }

    drawGUI();

} // =========================================================================== end function updateAll
