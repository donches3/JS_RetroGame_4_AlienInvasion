
const PLAYER_Y = 640;
var   playerX = 400;
const PLAYER_HEIGHT = 24; // probably not gonna use this
const PLAYER_TOP    = PLAYER_Y - 12;
const PLAYER_BOTTOM = PLAYER_Y + 12;
const PLAYER_SPEED = 5;
const PLAYER_EDGE_LIMIT = 50;

var playerMovingRight = true;


// ============================================================================= end vars

function managePlayer(){

    movePlayer();

} // =========================================================================== end function managePlayer


function movePlayer(){

    // temporary player movement code
    if (playerMovingRight && playerX < canvas.width - PLAYER_EDGE_LIMIT){ // moving right and not at right edge
        playerX += PLAYER_SPEED;
    } else if (!playerMovingRight && playerX > PLAYER_EDGE_LIMIT){ // moving left and not at left edge
        playerX -= PLAYER_SPEED;
    } else { // at an edge
        playerMovingRight = !playerMovingRight;
    }

} // =========================================================================== end function movePlayer


function drawPlayer(){
    drawBitmapCentered(playerPic, playerX, PLAYER_Y);
} // =========================================================================== end function drawPlayer
