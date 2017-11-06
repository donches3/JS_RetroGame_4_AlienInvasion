
const PLAYER_Y = 640;
const PLAYER_START_X = 450;
const PLAYER_HEIGHT = 24; // probably not gonna use this
const PLAYER_WIDTH  = 52;
const PLAYER_TOP    = PLAYER_Y - 12;
const PLAYER_BOTTOM = PLAYER_Y + 12;
const PLAYER_SPEED = 5;
const PLAYER_EDGE_LIMIT = 40;

var playerX = 0;
var playerBounds = {top:0, bottom:0, left:0, right:0};

var playerExplosionCounter;
var playerExplosionActive = false;
var playerExplosionBounds;

// load player timer
var isLoadPlayerTimerRunning = false;
var isLoadPlayerTimerDone = false;
var loadPlayerCounter = 0;

// ============================================================================= end vars

function resetPlayer(){

    playerLoaded = false;

    playerX = 0;
    playerBounds = {top:0, bottom:0, left:0, right:0};

    playerActive = false;

    playerExplosionCounter = 30;
    playerExplosionActive = false;
    playerExplosionBounds = {top:0, bottom:0, left:0, right:0};

    isLoadPlayerTimerRunning = false;
    isLoadPlayerTimerDone = false;
    loadPlayerCounter = 0;

} // =========================================================================== end function resetPlayer

function loadPlayer(){

    playerX = PLAYER_START_X;
    updatePlayerBounds();
    if (!playerCarryOver){
        livesOnDeck -= 1;
    }
    playerCarryOver = false;
    playerLoaded = true;

} // =========================================================================== end function loadPlayer

function updatePlayerBounds(){

    playerBounds.top    = PLAYER_TOP;
    playerBounds.bottom = PLAYER_BOTTOM
    playerBounds.left   = playerX - Math.floor(PLAYER_WIDTH/2);
    playerBounds.right  = playerX + Math.floor(PLAYER_WIDTH/2);

} // =========================================================================== end function updatePlayerBounds

function loadPlayerTimer(){
    // Start load player timer
    if (!isLoadPlayerTimerRunning && !isLoadPlayerTimerDone){
        isLoadPlayerTimerRunning = true;
        loadPlayerCounter = 90;
    }
    // Stop timer
    if (loadPlayerCounter <= 0 && isLoadPlayerTimerRunning){
        isLoadPlayerTimerDone = true; // marks timer completion, prevents timer from restarting
        isLoadPlayerTimerRunning = false; // reset to initial value and stops timer
        loadPlayerCounter = 90; // reset to initial value
    }
    // Increment timer
    if (isLoadPlayerTimerRunning){
        loadPlayerCounter--;
    }

    // only load player after timer has finished
    if (isLoadPlayerTimerDone){

        if (livesOnDeck > 0){
            resetPlayer();
            loadPlayer();
            playerActive = true;
            gamePaused = false;
            loadingScreenActive = false;
            playScreenActive = true;
        }

    }

} // =========================================================================== end function loadPlayerTimer

function managePlayer(){

    if (playerActive){
        movePlayer();
        updatePlayerBounds();
    }



} // =========================================================================== end function managePlayer

function movePlayer(){

    if (keyHeld_MoveRight && playerBounds.right < canvas.width - PLAYER_EDGE_LIMIT){ // moving right and not at right edge
        playerX += PLAYER_SPEED;
    }
    if (keyHeld_MoveLeft && playerBounds.left > PLAYER_EDGE_LIMIT){ // moving left and not at left edge
        playerX -= PLAYER_SPEED;
    }

} // =========================================================================== end function movePlayer

function drawPlayer(){
    if (playerLoaded) {
        drawBitmapCentered(playerPic, playerX, PLAYER_Y);
    }
} // =========================================================================== end function drawPlayer

function destroyPlayer(){

    playerActive = false;
    playerLoaded = false;
    gamePaused = true;
    startPlayerExplosion();

    // this gives extra time at end of level for player explosions to complete
    if (endConditionTimerRunning && endConditionTimer < 40){
        endConditionTimer = 40;
    }

} // =========================================================================== end function destroyPlayer

function startPlayerExplosion(){

    playerExplosionActive = true;
    playerExplosionCounter = 30;
    playerExplosionBounds = playerBounds;
    playerBounds = {top:0, bottom:0, left:0, right:0};

} // =========================================================================== end function startPlayerExplosion

function addToPlayerExplosion(){

    var randomBlastPosX = (Math.random() * (playerExplosionBounds.right - playerExplosionBounds.left)) + playerExplosionBounds.left;
    var randomBlastPosY = (Math.random() * (playerExplosionBounds.bottom - playerExplosionBounds.top)) + playerExplosionBounds.top;

    createBlast(playerBlasts, randomBlastPosX, randomBlastPosY);

    playerExplosionCounter--;

    if (playerExplosionCounter <= 0){
        playerExplosionActive = false;
    }

} // =========================================================================== end function addToPlayerExplosion
