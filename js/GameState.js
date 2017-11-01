
var isPlayer1 = true;
var gameOver = false;
var levelOver = false;
var gamePaused = false;
var loadingPlayScreen = false;
var playScreenActive = true;

var isPlayerLoading = false
var playerLoadingTimer = 0
var isLevelLoading = false;
var bunkersLoaded = false;
var formationLoaded = false;
var revealFormationCounter;

var playerActive = true;
var playerDestroyed = true;

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
            isLevelLoading = false;
            gamePaused = false;
            playScreenActive = true;
        } else {
            gameOver = true;
        }
    }

    playerLoadingTimer--;

} // =========================================================================== end function loadPlayerSequence

function loadLevelSequence(){

    loadBunkers(bunkerNew);      // change back to bunkerNew ---------------- NOTE ////////////////
    loadFormation(formationOne); // change back to formationOne ------------- NOTE ////////////////
    loadPlayer();
    isLevelLoading = false;
    playScreenActive = true;


    // if (!bunkersLoaded){
    //     loadBunkers(bunkerNew);      // change back to bunkerNew ---------------- NOTE ////////////////
    // }
    // drawWorld();
    // drawBunkers();
    //
    // if (!formationLoaded){
    //     loadFormation(formationOne); // change back to formationOne ------------- NOTE ////////////////
    //     revealFormationCounter = 0;
    // }
    // if (revealFormationCounter < alienGrid.length){
    //     drawPartialFormation(revealFormationCounter);
    //     revealFormationCounter++;
    //     if (revealFormationCounter >= alienGrid.length)
    //     {
    //         isPlayerLoading = true;
    //         playerLoadingTimer = 60;
    //     }
    // } else {
    //     drawFormation();
    // }
    //
    // if (isPlayerLoading){
    //     loadPlayerSequence();
    // }

} // =========================================================================== end function loadLevelSequence
