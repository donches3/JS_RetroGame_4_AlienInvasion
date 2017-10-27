
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

    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();

    loadFormation(formationOne); // change back to formationOne ------------- NOTE ////////////////
    loadBunkers(bunkerNew);      // change back to bunkerNew ---------------- NOTE ////////////////
    loadPlayer();

} // =========================================================================== end function imageLoadingDoneSoStartGame

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
    managePlayer();
    incrementBlasts();

    manageBullets(); // bullets should be the last thing moved
} // =========================================================================== end function moveAll

function drawAll() {
    drawWorld();
    drawBunkers();
    drawFormation();
    drawSliders();
    drawPlayer();
    drawBullets();
    drawBlasts();
    // blueWarrior.draw(); //  no longer needed --------------------------------////////////////
    drawGUI();
} // =========================================================================== end function drawAll
