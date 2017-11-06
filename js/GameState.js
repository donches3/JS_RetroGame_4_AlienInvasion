

// statistics
var livesOnDeck = 3;
var gameScore = 0;
var hiScore = 0;

// active screens
var welcomeScreenActive = true;
var loadingScreenActive = false;
var playScreenActive = false;
var levelEndScreenActive = false;

// level parts loaded
var bunkersLoaded = false;
var formationLoaded = false;
var formationRevealed = false;
var playerLoaded = false;
var levelLoaded = false;

var playerCarryOver = false;

// play states
var playerActive = true;
var gamePaused = false;

// level end conditions
var waveCleared = false;
var invadersLanded = false;
var livesGone = false;

// level end game states
var levelWin = false;
var levelLose = false;
var gameOver = false;

// end condition timer
var endConditionDetected = false;
var endConditionTimerRunning = false;
var endConditionTimerDone = false;
var endConditionTimer = 90;

// end screen timer
var endScreenTimerRunning = false;
var endScreenTimerDone = false;
var endScreenCounter = 90;

// ============================================================================= end vars

function resetGame(){
    welcomeScreenActive = true;
    loadingScreenActive = false;
    playScreenActive = false;
    levelEndScreenActive = false;

    welcomeScreenCounter = 0;
    welcomeScreenDone = false;

    drawingLifeBar = false;

    playerCarryOver = false;

    unloadLevel();

    if (gameScore > hiScore){
        hiScore = gameScore;
    }

    gameScore = 0;
    livesOnDeck = 3;
} // =========================================================================== end function resetGame

function unloadLevel(){

    unloadFormation();
    unloadBunkers();
    unloadSliders();
    unloadBullets();
    unloadBlasts();
    unloadPlayer();

    levelLoaded = false;

    // level end conditions
    waveCleared = false;
    invadersLanded = false;
    livesGone = false;

    // level end game states
    levelWin = false;
    levelLose = false;
    gameOver = false;

    // end condition timer
    endConditionDetected = false;
    endConditionTimerRunning = false;
    endConditionTimerDone = false;
    endConditionTimer = 90;

    // end screen timer
    endScreenTimerRunning = false;
    endScreenTimerDone = false;
    endScreenCounter = 90;

} // =========================================================================== end function unloadLevel

function loadLevelSequence(){

    // STEP 1:  Unload level if needed, this only happens once
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
        revealFormation();
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
        gamePaused = false;
        levelLoaded = true;

        loadingScreenActive = false;
        playScreenActive = true;

    }

} // =========================================================================== end function loadLevelSequence

function managePlayScreen(){

    if (!gameOver && !levelWin && !levelLose){
        moveAllGameObjects();
    }

    // player destruction and reloading timed sequence
    if (!playerLoaded && !endConditionDetected){
        loadPlayerTimer();
        //                                                                  NOTE
        // If an end condition is detected while this timer is running,
        // the timer will freeze in place.
        // Timer values will need to be reset when level is reloaded.
    }

    // detect all end conditions and start a timer before activating proper game state
    // changes game state to Game Over, Level Win or Level Lose
    detectEndConditionsTimer(); // --------------------------------------------- NOTE changes game state

    if (gameOver || levelWin || levelLose){
        playScreenActive = false;
        levelEndScreenActive = true;
    }

    drawAllGameObjects();

} // =========================================================================== end function managePlayScreen

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

function detectEndConditionsTimer(){

    // // -------- Detect End Conditions --------
    //
    // detect Wave Cleared condition
    if (alienCounter == 0){
        waveCleared = true;
    }
    // detect Lives Gone condition
    if (livesOnDeck <= 0 && !playerLoaded){
        livesGone = true;
    }
    // detect Invaders Landed condition
    // NOTE Invaders Landed condition is detected elsewhere

    if (waveCleared || invadersLanded || livesGone){
        endConditionDetected = true;
    }


    // // -------- Timer --------
    //
    // Start timer (this only happens once)
    if (endConditionDetected && !endConditionTimerRunning && !endConditionTimerDone){
        endConditionTimerRunning = true;
        endConditionTimer = 90;
    }
    // Stop timer (this only happens once)
    if (endConditionTimer <= 0 && endConditionTimerRunning){
        endConditionTimerDone = true; // marks timer completion, prevents timer from restarting
        endConditionTimerRunning = false; // reset to initial value and stops timer
        endConditionTimer = 90; // reset to initial value
    }
    // Increment timer
    if (endConditionTimerRunning){
        endConditionTimer--;

        // NOTE End Condition Timer (counter) is modified
        // if player is destroyed near end of level
        // to give explosions time to play out
    }


    // // -------- Assign Proper Game State --------
    // (this should only happen once)
    if (endConditionTimerDone){ // only changes game state after timer has finished

        // NOTE multiple End Conditions can be true at the same time.
        // BUT only one End Level Game STATE can be returned as true.
        // They must be tested in this order:  Game Over, Level Lose, Level Win

        if (livesGone){
            gameOver = true;
        } else if (invadersLanded){
            levelLose = true;
        } else { // if Wave Cleared
            levelWin = true;
        }

    }

} // =========================================================================== end function detectEndConditionsTimer

function endScreenTimer(){

    // Start timer (this only happens once)
    if (!endScreenTimerRunning && !endScreenTimerDone){
        endScreenTimerRunning = true;
        endScreenCounter = 90;
    }
    // Stop timer (this only happens once)
    if (endScreenCounter <= 0 && endScreenTimerRunning){
        endScreenTimerDone = true; // marks timer completion, prevents timer from restarting
        endScreenTimerRunning = false; // reset to initial value and stops timer
        endScreenCounter = 90; // reset to initial value
    }
    // Increment timer
    if (endScreenTimerRunning){
        endScreenCounter--;
    }

} // =========================================================================== end function endScreenTimer
