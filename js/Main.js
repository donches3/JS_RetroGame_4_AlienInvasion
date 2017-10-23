
var canvas, canvasContext;

var gameScore = 0;

var gameOver = false;
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

    colorText("Game Started", canvas.width/2, canvas.height/2 + 40, 'white');  //  ////////////////

    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();

    loadFormation(formationOne); // change back to formation One ------------- NOTE ////////////////
    loadBunkers();

} // =========================================================================== end function imageLoadingDoneSoStartGame

function loadFormation(whichFormation) {
    alienGrid = whichFormation.slice(); // copies all values in whichFormation into alienGrid
    UpdateFormationBounds();
    alienCounter = countAliens();
    formationHoldCounter = Math.floor(alienCounter/2);
} // =========================================================================== end function loadLevel

function updateAll() {
    if (!gameOver){
        moveAll();
    }
    drawAll();
} // =========================================================================== end function updateAll

function moveAll() {
    // blueWarrior.move(); //  no longer needed --------------------------------////////////////
    moveFormation();
    manageSliders();

    moveBullets(); // bullets should be the last thing moved
} // =========================================================================== end function moveAll

function drawAll() {
    drawWorld();
    drawBunkers();
    drawFormation();
    drawSliders();
    drawBullets();
    // blueWarrior.draw(); //  no longer needed --------------------------------////////////////
    drawGUI();
} // =========================================================================== end function drawAll
