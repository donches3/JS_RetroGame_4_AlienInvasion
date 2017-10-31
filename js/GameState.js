
var isPlayer1 = true;
var gameOver = false;
var gamePaused = false;
var loadingPlayScreen = false;
var playScreenActive = true;
var isPlayerLoading = false
var playerLoadingTimer = 0

var playerActive = true;
var playerDestroyed = false;

var gameScorePlayer1 = 0;
var gameScorePlayer2 = 0;
var hiScore = 0;

var livesLeftPlayer1 = 3;
var livesLeftPlayer2 = 3;




function managePlayScreen(){

    if (!gameOver){
        moveAllGameObjects();
    }

    if (playerExplosionActive){
        addToPlayerExplosion()
    }

    if (playerDestroyed && !isPlayerLoading){
        isPlayerLoading = true;
        playerLoadingTimer = 90;
    }
    if (isPlayerLoading){
        loadPlayerSequence();
    }

    drawAllGameObjects();
} // =========================================================================== end function managePlayScreen

function moveAllGameObjects() {
    // blueWarrior.move(); //  no longer needed --------------------------------////////////////
    if (!gamePaused){
        moveFormation();
        managePlayer();
    }
    manageSliders();
    incrementTheseBlasts(bulletBlasts);
    incrementTheseBlasts(playerBlasts);

    manageBullets(); // bullets should be the last thing moved
} // =========================================================================== end function moveAllGameObjects

function drawAllGameObjects() {
    drawWorld();
    drawBunkers();
    drawFormation();
    drawSliders();
    drawPlayer();
    drawBullets();
    drawTheseBlasts(bulletBlasts);
    drawTheseBlasts(playerBlasts);
    // blueWarrior.draw(); //  no longer needed --------------------------------////////////////
} // =========================================================================== end function drawAllGameObjects

function loadPlayerSequence(){

    if (playerLoadingTimer <= 0){
        if (livesLeftPlayer1 > 0){
            loadPlayer();
            isPlayerLoading = false;
            gamePaused = false;
        } else {
            gameOver = true;
        }

    }

    playerLoadingTimer--;
} // =========================================================================== end function loadPlayerSequence
