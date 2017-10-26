
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
var playerMovingRight = true; // temporary                                      ////////////////


// ============================================================================= end vars

function managePlayer(){

    movePlayer();
    updatePlayerBounds();

} // =========================================================================== end function managePlayer

function loadPlayer(){

    playerX = PLAYER_START_X;
    updatePlayerBounds();

} // =========================================================================== end function loadPlayer

function updatePlayerBounds(){

    playerBounds.top    = PLAYER_TOP;
    playerBounds.bottom = PLAYER_BOTTOM
    playerBounds.left   = playerX - Math.floor(PLAYER_WIDTH/2);
    playerBounds.right  = playerX + Math.floor(PLAYER_WIDTH/2);

} // =========================================================================== end function updatePlayerBounds

function movePlayer(){

    // temporary player movement code
    if (playerMovingRight && playerBounds.right < canvas.width - PLAYER_EDGE_LIMIT){ // moving right and not at right edge
        playerX += PLAYER_SPEED;
    } else if (!playerMovingRight && playerBounds.left > PLAYER_EDGE_LIMIT){ // moving left and not at left edge
        playerX -= PLAYER_SPEED;
    } else { // at an edge
        playerMovingRight = !playerMovingRight;
    }

} // =========================================================================== end function movePlayer

function drawPlayer(){
    drawBitmapCentered(playerPic, playerX, PLAYER_Y);
} // =========================================================================== end function drawPlayer
