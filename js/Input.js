

const KEY_CODE_RIGHT_ARROW = 39;
const KEY_CODE_LEFT_ARROW  = 37;
const KEY_CODE_SPACE_BAR   = 32;

var controlKey_Fire;
var controlKey_MoveRight;
var controlKey_MoveLeft;

var keyHeld_Fire      = false;
var keyHeld_MoveRight = false;
var keyHeld_MoveLeft  = false;


// ============================================================================= end vars

function setupInput() {

        document.addEventListener('keydown', keyPressed); // calls function keyPressed when triggered
        document.addEventListener('keyup', keyReleased); // calls function keyReleased when triggered

        controlKey_Fire      = KEY_CODE_SPACE_BAR;
        controlKey_MoveRight = KEY_CODE_RIGHT_ARROW;
        controlKey_MoveLeft  = KEY_CODE_LEFT_ARROW;

} // =========================================================================== end function setupInput

function keySet(keyEvent, setTo) {
    if(keyEvent.keyCode == controlKey_Fire) { // move fire
        keyHeld_Fire = setTo;
    }
    if(keyEvent.keyCode == controlKey_MoveRight) { // move right
        keyHeld_MoveRight = setTo;
    }
    if(keyEvent.keyCode == controlKey_MoveLeft) { // move left
        keyHeld_MoveLeft = setTo;
    }

} // =========================================================================== end function keySet

function keyPressed(evt) {
    // console.log("Key pressed: " + evt.keyCode);

    keySet(evt, true);

    // prevents arrow keys from scrolling screen
    evt.preventDefault();

} // =========================================================================== end function keyPressed

function keyReleased(evt) {
    // console.log("Key released: " + evt.keyCode);

    keySet(evt, false);
} // =========================================================================== end function keyReleased
