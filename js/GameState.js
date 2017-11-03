
var gameOver = false;
var levelOverCondition = false;
var gamePaused = false;

var livesOnDeck = 3;
var gameScore = 0;
var hiScore = 0;

var welcomeScreenActive = true;
var loadingScreenActive = false;
var playScreenActive = true;

var bunkersLoaded = false;
var formationLoaded = false;
var playerLoaded = false;
var levelLoaded = false;

var playerActive = true;

var revealFormationCounter = 1;
var revealFormationCounterRunning = false;
var formationRevealed = false;

var isLevelOverTimerRunning = false;
var isLevelOverTimerDone = false;
var levelOverTimer = 90;
var waveCleared = false;

var isLoadPlayerTimerRunning = false;
var isLoadPlayerTimerDone = false;
var loadPlayerCounter = 0;

// ============================================================================= end vars

function managePlayScreen(){

    if (!gameOver && !waveCleared){
        moveAllGameObjects();
    }

    // player destruction and reloading timed sequence
    if (!playerLoaded && !levelOverCondition){
        loadPlayerTimer();
    }

    // detect no aliens left                                                NOTE changes game state
    if (alienCounter == 0 && sliders.length == 0){
        levelOverCondition = true;
    }
    if (levelOverCondition){
        // changes game state to Game Over or Wave Cleared after timer finishes
        levelEndTimer();
    }

    drawAllGameObjects();

} // =========================================================================== end function managePlayScreen


function loadPlayerTimer(){
    // Start load player timer
    if (!playerLoaded && !isLoadPlayerTimerRunning){
        isLoadPlayerTimerRunning = true;
        loadPlayerCounter = 90;
    }
    // Stop timer
    if (loadPlayerCounter <= 0 && isLoadPlayerTimerRunning){
        isLoadPlayerTimerDone = true;
        isLoadPlayerTimerRunning = false; // reset to initial value and stops timer
        loadPlayerCounter = 90; // reset to initial value
    }
    // Increment timer
    if (isLoadPlayerTimerRunning){
        loadPlayerCounter--;
    }

    if (isLoadPlayerTimerDone){ // only loads player after timer has finished

        if (livesOnDeck > 0){
            loadPlayer();
            playerActive = true;
            loadingScreenActive = false;
            gamePaused = false;
            playScreenActive = true;
        } else {
            gameOver = true;
        }

    }

} // =========================================================================== end function loadPlayerTimer

function levelEndTimer(){

    // Start Level Over timer
    if (levelOverCondition && !isLevelOverTimerRunning){
        isLevelOverTimerRunning = true;
        levelOverTimer = 90;
    }
    // Stop timer
    if (levelOverTimer <= 0 && isLevelOverTimerRunning){
        isLevelOverTimerDone = true;
        isLevelOverTimerRunning = false; // reset to initial value and stops timer
        levelOverCondition = false; // reset to initial value
        levelOverTimer = 90; // reset to initial value
    }
    // Increment timer
    if (isLevelOverTimerRunning){
        levelOverTimer--;
    }

    if (isLevelOverTimerDone){ // only changes game state after timer has finished
        if (livesOnDeck <= 0 && !playerLoaded){
            gameOver = true; //                                                 NOTE changes game state
        } else {
            waveCleared = true; //                                              NOTE changes game state
        }
    }

} // =========================================================================== end function levelEndTimer

function moveAllGameObjects() {

    if (!gamePaused){
        moveFormation();
        managePlayer();
    }
    manageSliders();
    incrementTheseBlasts(bulletBlasts);
    incrementTheseBlasts(playerBlasts);
    if (playerExplosionActive){
        addToPlayerExplosion()
    }
    manageBullets(); // bullets should be the last thing moved

} // =========================================================================== end function moveAllGameObjects

function drawAllGameObjects() {

    drawWorld();
    drawBunkers();
    drawFormation();
    drawSliders();
    if (playerLoaded){
        drawPlayer();
    }
    drawBullets();
    drawTheseBlasts(bulletBlasts);
    drawTheseBlasts(playerBlasts);

} // =========================================================================== end function drawAllGameObjects

function unloadLevel(){

    unloadFormation();
    unloadBunkers();
    unloadSliders();
    unloadBullets();
    unloadBlasts();
    resetPlayer(); // this does not unload the player
    if (!playerLoaded){
        drawingLifeBar = false;
    }

    waveCleared = false;
    levelLoaded = false;

} // =========================================================================== end function unloadLevel

function loadLevelSequence(){

    // STEP 1:  Unload level if needed
    if (levelLoaded){
        unloadLevel();
    }

    // STEP 2:  Draw world (active during entire load process)
    drawWorld();

    // STEP 3:  BUNKERS:  Load then draw
    if (!bunkersLoaded){
        loadBunkers(bunkerNew);      // change back to bunkerNew -------------- NOTE ////////////////
    }
    if (bunkersLoaded){
        drawBunkers();
    }

    // STEP 4:  FORMATION:  Load then reveal then draw
    if (bunkersLoaded && !formationLoaded){
        loadFormation(formationOne); // change back to formationOne ----------- NOTE ////////////////
    }
    if (formationLoaded && !formationRevealed){
        revealFormation(); // function not created yet ------------------------ ////////////////
    }
    if (formationRevealed){
        drawFormation();
    }

    // STEP 5:  PLAYER:  Load (does not draw player)
    if (formationRevealed){
        drawingLifeBar = true;
        loadPlayerTimer();
    }

    // STEP 6:  PLAY:  Leave loading screen and activate play screen
    if (playerLoaded && !levelLoaded){

        playerActive = true;
        waveCleared = false;
        levelLoaded = true;

        loadingScreenActive = false;
        playScreenActive = true;

    }

} // =========================================================================== end function loadLevelSequence
