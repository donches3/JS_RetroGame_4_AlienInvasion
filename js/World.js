

const GROUND_LEVEL = 52;
const GROUND_THICKNESS = 3;
const TOP_OF_WORLD = 114; // for bullet impacts

// ============================================================================= end vars

function drawWorld() {
    // background
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // ground line
    colorRect(0, canvas.height - GROUND_LEVEL, canvas.width, GROUND_THICKNESS, 'white');

} // =========================================================================== end function drawWorld
