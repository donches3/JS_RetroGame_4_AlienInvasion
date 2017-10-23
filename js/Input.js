
// Arrow key codes
const KEY_UP_ARROW    = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW  = 40;
const KEY_LEFT_ARROW  = 37;

// WASD key codes
// const KEY_W = 87; // up
// const KEY_D = 68; // right
// const KEY_S = 83; // down
// const KEY_A = 65; // left

var mouseX = 0;
var mouseY = 0;
// ============================================================================= end vars

function setupInput() {
        canvas.addEventListener('mousemove', updateMousePos);

        document.addEventListener('keydown', keyPressed);
        document.addEventListener('keyup', keyReleased);

        // I may have deleted a few input setup lines here prematurely.  Copy from Adventure game ////////////////
        
} // =========================================================================== end function setupInput

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top  - root.scrollTop;

    // -------------------------------------------------------- temporary cheat ////////////////
    // warriorX = mouseX;
    // warriorY = mouseY;
    // warriorSpeedX = 4;
    // warriorSpeedY = -4;

} // =========================================================================== end function updateMousePos

function keySet(keyEvent, whichWarrior, setTo) {
    if(keyEvent.keyCode == whichWarrior.controlKeyLeft) { // move left
        whichWarrior.keyHeld_MoveWest = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyRight) { // move right
        whichWarrior.keyHeld_MoveEast = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyUp) { // move up
        whichWarrior.keyHeld_MoveNorth = setTo;
    }
    if(keyEvent.keyCode == whichWarrior.controlKeyDown) { // move down
        whichWarrior.keyHeld_MoveSouth = setTo;
    }

} // =========================================================================== end function keySet

function keyPressed(evt) {
    // console.log("Key pressed: " + evt.keyCode);

    keySet(evt, blueWarrior, true);

    // prevents arrow keys from scrolling screen
    evt.preventDefault();

} // =========================================================================== end function keyPressed

function keyReleased(evt) {
    // console.log("Key released: " + evt.keyCode);

    keySet(evt, blueWarrior, false);
} // =========================================================================== end function keyReleased
