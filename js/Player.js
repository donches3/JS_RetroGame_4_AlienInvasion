
const PLAYER_Y = 640;
const PLAYER_START_X = 450;
const PLAYER_HEIGHT = 24; // probably not gonna use this
const PLAYER_WIDTH  = 52;
const PLAYER_TOP    = PLAYER_Y - 12;
const PLAYER_BOTTOM = PLAYER_Y + 12;
const PLAYER_SPEED = 5;
const PLAYER_EDGE_LIMIT = 50;

var playerX = 0;
var playerBounds = {top:0, bottom:0, left:0, right:0};

var playerActive = true;
var playerDestroyed = false;

// ============================================================================= end vars

function managePlayer(){

    movePlayer();
    if (playerExplosionActive){
        incrementPlayerExplosion()
    }
    updatePlayerBounds();

} // =========================================================================== end function managePlayer

function loadPlayer(){

    playerX = PLAYER_START_X;
    updatePlayerBounds();
    playerActive = true;
    playerDestroyed = false;


} // =========================================================================== end function loadPlayer

function updatePlayerBounds(){

    playerBounds.top    = PLAYER_TOP;
    playerBounds.bottom = PLAYER_BOTTOM
    playerBounds.left   = playerX - Math.floor(PLAYER_WIDTH/2);
    playerBounds.right  = playerX + Math.floor(PLAYER_WIDTH/2);

} // =========================================================================== end function updatePlayerBounds

function movePlayer(){

    if (playerActive){
        if (keyHeld_MoveRight && playerBounds.right < canvas.width - PLAYER_EDGE_LIMIT){ // moving right and not at right edge
            playerX += PLAYER_SPEED;
        }
        if (keyHeld_MoveLeft && playerBounds.left > PLAYER_EDGE_LIMIT){ // moving left and not at left edge
            playerX -= PLAYER_SPEED;
        }
    }

} // =========================================================================== end function movePlayer

function drawPlayer(){
    if (!playerDestroyed) {
        drawBitmapCentered(playerPic, playerX, PLAYER_Y);
    }
} // =========================================================================== end function drawPlayer

function destroyPlayer(){

    playerActive = false;
    playerDestroyed = true;
    startPlayerExplosion();

} // =========================================================================== end function destroyPlayer

var playerExplosionCounter;
var playerExplosionActive = false;
var playerExplosionBounds;

function startPlayerExplosion(){

    playerExplosionActive = true;
    playerExplosionCounter = 60;
    playerExplosionBounds = playerBounds;
    playerBounds = {top:0, bottom:0, left:0, right:0};

} // =========================================================================== end function startPlayerExplosion

function incrementPlayerExplosion(){

    var randomBlastPosX = (Math.random() * (playerExplosionBounds.right - playerExplosionBounds.left)) + playerExplosionBounds.left;
    var randomBlastPosY = (Math.random() * (playerExplosionBounds.bottom - playerExplosionBounds.top)) + playerExplosionBounds.top;

    createBlast(randomBlastPosX, randomBlastPosY);

    playerExplosionCounter--;

    if (playerExplosionCounter <= 0){
        playerExplosionActive = false;
    }

} // =========================================================================== end function playerExplosion
