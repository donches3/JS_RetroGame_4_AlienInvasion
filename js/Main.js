
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

    if (welcomeScreenActive){
        drawWelcomeScreen();
        if (keyHeld_Fire){
            welcomeScreenActive = false;
            loadingScreenActive = true;
        }
    }

    if (loadingScreenActive){
        loadLevelSequence();
    }

    if(playScreenActive){
        managePlayScreen();
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

    bunkersLoaded = false;


    playerActive = false;

    if (gameScorePlayer1 > hiScore){
        hiScore = gameScorePlayer1;
    }

    gameScorePlayer1 = 0;
    livesLeftPlayer1 = 3;
} // =========================================================================== end function resetGame
