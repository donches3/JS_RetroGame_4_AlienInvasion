
var gameOver = false;
var levelOver = false;
var gamePaused = false;

var welcomeScreenActive = true;
var loadingScreenActive = false;
var playScreenActive = true;



var loadingPlayScreen = false;

var isPlayerLoading = false
var playerLoadingTimer = 0
var bunkersLoaded = false;
var formationLoaded = false;
var revealFormationCounter;

var playerActive = true;
var playerDestroyed = true;

var livesLeft = 3;
var gameScore = 0;
var hiScore = 0;

var isLevelOverTimerRunning = false;
var isLevelOverTimerDone = false;
var levelOverTimer = 90;
var waveCleared = false;



function managePlayScreen(){

    if (!gameOver && !waveCleared){
        moveAllGameObjects();
    }


    // player destruction and reloading timed sequence
    if (playerDestroyed && !isPlayerLoading && !levelOver){
        isPlayerLoading = true;
        playerLoadingTimer = 90;
    }
    if (isPlayerLoading){
        loadPlayerSequence();
    }
    if (playerExplosionActive){
        addToPlayerExplosion()
    }

    // Start Level Over timer
    if (levelOver && !isLevelOverTimerRunning){
        isLevelOverTimerRunning = true;
        levelOverTimer = 90;
    }
    // Stop timer
    if (levelOverTimer <= 0){
        isLevelOverTimerRunning = false;
        isLevelOverTimerDone = true;
    }
    // Increment timer
    if (isLevelOverTimerRunning){
        levelOverTimer--;
    }

    if (isLevelOverTimerDone){
        if (livesLeft <= 0){
            gameOver = true;
        } else {
            waveCleared = true;
        }
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
        if (livesLeft > 0){
            loadPlayer();
            isPlayerLoading = false;
            loadingScreenActive = false;
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
    loadingScreenActive = false;
    playScreenActive = true;
    drawingLifeBar = true;


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
