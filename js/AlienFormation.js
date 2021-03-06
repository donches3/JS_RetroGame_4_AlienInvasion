const ALIEN_CELL_WIDTH  = 64;
const ALIEN_CELL_HEIGHT = 48;
const ALIEN_GRID_COLS = 11;
const ALIEN_GRID_ROWS = 5;

const FORMATION_START_X = 128;
const FORMATION_START_Y = 163;
const FORMATION_INCREMENT_X = 8;
const FORMATION_INCREMENT_Y = 24;
const FORMATION_EDGE_LIMIT = 40;
const FORMATION_LANDING_GOAL = 620; // --------------------------------------------- ////////////////

var formationOriginX = FORMATION_START_X;
var formationOriginY = FORMATION_START_Y;

var formationBounds = {top:0, bottom:0, left:0, right:0};
var fullFormationBounds = {top:0, bottom:0, left:0, right:0};

var formationOne = [3,3,3,3,3,3,3,3,3,3,3,
                    2,2,2,2,2,2,2,2,2,2,2,
                    2,2,2,2,2,2,2,2,2,2,2,
                    1,1,1,1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,1,1,1];


var formationTest= [0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,1,0,0,0,0,0,
                    0,0,2,0,0,4,0,0,2,5,0,
                    0,0,0,0,0,3,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0];

// var formationTest= [0,0,0,0,0,1,0,0,0,0,0,
//                     0,0,0,0,0,0,0,0,0,0,0,
//                     0,0,0,0,0,0,0,0,0,0,0,
//                     0,0,0,0,0,0,0,0,0,0,0,
//                     0,0,0,0,0,0,0,0,0,0,0];

var alienGrid = [];

const ALIEN_NONE      = 0;
const ALIEN_LARGE     = 1;
const ALIEN_MEDIUM    = 2;
const ALIEN_SMALL     = 3;
const ALIEN_SLIDER    = 4;
const ALIEN_EXPLOSION = 5;

const ANIMATED_TYPES = [1, 2, 3];

// image array indexes for frame B of the two-frame aliens
var frameToggleOffset = 5;
var frameToggle = false;
const ALIEN_LARGE_B  = ALIEN_LARGE  + frameToggleOffset;
const ALIEN_MEDIUM_B = ALIEN_MEDIUM + frameToggleOffset;
const ALIEN_SMALL_B  = ALIEN_SMALL  + frameToggleOffset;

var alienCounter = ALIEN_GRID_COLS * ALIEN_GRID_ROWS; // this value gets updated dynamically

// number of frames between formation increments
// Hold counter is based on alien count.  fewer aliens means faster increments.
var formationHoldCounter = Math.floor(alienCounter/2); // this value gets updated dynamically
var formationHoldShield = false; // prevents hold counter from being reset too often.
const FORMATION_HIT_PAUSE = 15;

var isMovingRight = true;

var revealFormationCounter = 1;
var revealFormationCounterRunning = false;

// ============================================================================= end vars

function unloadFormation(){

    // reset to initial values
    alienGrid = []; // empties out existing formation
    alienCounter = 0;
    isMovingRight = true;
    frameToggle = false;
    formationOriginX = FORMATION_START_X;
    formationOriginY = FORMATION_START_Y;

    revealFormationCounter = 1;
    revealFormationCounterRunning = false;
    formationRevealed = false;

    formationLoaded = false;

} // =========================================================================== end function unloadFormation

function loadFormation(whichFormation) {

    if (formationLoaded){
        unloadFormation();
    }

    alienGrid = whichFormation.slice(); // copies all values in whichFormation into alienGrid
    UpdateFormationBounds();
    alienCounter = countFormationAliens();
    formationHoldCounter = Math.floor(alienCounter/2);

    formationLoaded = true;

} // =========================================================================== end function loadFormation

function moveFormation(){

    // the formation only moves once the hold counter gets to zero
    if (formationHoldCounter <= 0){

        incrementFormation();
        UpdateFormationBounds();
        removeFormationExplosions();
        collideFormationWithBunkers();
        formationHoldCounter = Math.floor(alienCounter/2); // reset hold counter
        formationHoldShield = false;
        frameToggle = !frameToggle; // switch frame for two-frame aliens

        // detect landing
        if (formationBounds.bottom >= FORMATION_LANDING_GOAL && alienCounter > 0){
            if (playerLoaded){
                destroyPlayer();
            }
            gamePaused = true;
            invadersLanded = true; // ----------------------------------------- NOTE end level condition
        }

    }

    formationHoldCounter--;
} // =========================================================================== end function moveFormation

function drawFormation() {

    var drawCellCenterX;
    var drawCellCenterY;
    var rowCol = {row:0, col:0};
    var cellKindHere;
    var isAnimated;

    for (var i = 0; i < alienGrid.length; i++){

        cellKindHere = alienGrid[i];
        rowCol = arrayIndexToRowCol(i, ALIEN_GRID_COLS);
        drawCellCenterX = formationOriginX + (rowCol.col * ALIEN_CELL_WIDTH)  + Math.floor(ALIEN_CELL_WIDTH/2);
        drawCellCenterY = formationOriginY + (rowCol.row * ALIEN_CELL_HEIGHT) + Math.floor(ALIEN_CELL_HEIGHT/2);
        isAnimated = false;

        // check if current type is one of the animated types
        for (var j = 0; j < ANIMATED_TYPES.length; j++){
            if (cellKindHere == ANIMATED_TYPES[j]){
                isAnimated = true;
            }
        }

        // draw current cell
        if (frameToggle && isAnimated){ // draw frame 2
            drawBitmapCentered(alienPics[cellKindHere + frameToggleOffset], drawCellCenterX, drawCellCenterY);
        } else if (alienPics[cellKindHere] != 0){ // if not empty draw frame 1
            drawBitmapCentered(alienPics[cellKindHere], drawCellCenterX, drawCellCenterY);
        }

    } // end for i

} // =========================================================================== end function drawFormation

function drawPartialFormation(howManyToDraw){
    var drawCellCenterX;
    var drawCellCenterY;
    var rowCol = {row:0, col:0};
    var cellKindHere;

    if (howManyToDraw > alienGrid.length){ // error correction
        howManyToDraw = alienGrid.length;
    }

    for (var i = 0; i < howManyToDraw; i++){
        cellKindHere = alienGrid[i];
        rowCol = arrayIndexToRowCol(i, ALIEN_GRID_COLS);
        drawCellCenterX = formationOriginX + (rowCol.col * ALIEN_CELL_WIDTH)  + Math.floor(ALIEN_CELL_WIDTH/2);
        drawCellCenterY = formationOriginY + (rowCol.row * ALIEN_CELL_HEIGHT) + Math.floor(ALIEN_CELL_HEIGHT/2);
        drawBitmapCentered(alienPics[cellKindHere], drawCellCenterX, drawCellCenterY);
    } // end for i

} // =========================================================================== end function drawPartialFormation

function revealFormation(){

    // Start Reveal counter
    if (!formationRevealed && !revealFormationCounterRunning && !formationRevealed){
        revealFormationCounterRunning = true;
        revealFormationCounter = 1;
    }

    drawPartialFormation(revealFormationCounter);

    // Stop counter
    if (revealFormationCounter >= alienGrid.length && revealFormationCounterRunning){
        formationRevealed = true; // marks counter as done and prevents counter from restarting
        revealFormationCounterRunning = false; // reset to initial value and stops timer
        revealFormationCounter = 1; // reset to initial value
    }

    // Increment counter
    if (revealFormationCounterRunning){
        revealFormationCounter++;
    }

} // =========================================================================== end function revealFormation

function getFormationTop(){

    // start at top row
    for(var eachRow = 0; eachRow < ALIEN_GRID_ROWS; eachRow++) {

        // start at left column
        for(var eachCol = 0; eachCol < ALIEN_GRID_COLS; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow, ALIEN_GRID_COLS);
            var cellKindHere = alienGrid[arrayIndex];

            if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION){
                return formationOriginY + (eachRow * ALIEN_CELL_HEIGHT);
            }

        } // end for eachCol
    } // end for eachRow

    // fallback value if array is empty or something is wrong
    return formationOriginY;  //  origin

} // =========================================================================== end function getFormationTop

function getFormationLeft(){

    // start at left column
    for(var eachCol = 0; eachCol < ALIEN_GRID_COLS; eachCol++) {

        // start at top row
        for(var eachRow = 0; eachRow < ALIEN_GRID_ROWS; eachRow++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow, ALIEN_GRID_COLS);
            var cellKindHere = alienGrid[arrayIndex];

            if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION){
                return formationOriginX + (eachCol * ALIEN_CELL_WIDTH);
            }

        } // end for eachRow
    } // end for eachCol

    // fallback value if array is empty or something is wrong
    return formationOriginX;  //  origin

} // =========================================================================== end function getFormationLeft

function getFormationBottom(){

    // start at bottom row
    for(var eachRow = ALIEN_GRID_ROWS - 1; eachRow >= 0; eachRow--) {

        // start at left column
        for(var eachCol = 0; eachCol < ALIEN_GRID_COLS; eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow, ALIEN_GRID_COLS);
            var cellKindHere = alienGrid[arrayIndex];

            if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION){
                return formationOriginY + ((eachRow + 1) * ALIEN_CELL_HEIGHT);
            }

        } // end for eachCol
    } // end for eachRow

    // fallback value if array is empty or something is wrong
    return formationOriginY;  //  origin

} // =========================================================================== end function getFormationBottom

function getFormationRight(){

    // start at right column
    for(var eachCol = ALIEN_GRID_COLS - 1; eachCol >= 0; eachCol--) {

        // start at top row
        for(var eachRow = 0; eachRow < ALIEN_GRID_ROWS; eachRow++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow, ALIEN_GRID_COLS);
            var cellKindHere = alienGrid[arrayIndex];

            if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION){
                return formationOriginX + ((eachCol + 1) * ALIEN_CELL_WIDTH);
            }

        } // end for eachRow
    } // end for eachCol

    // fallback value if array is empty or something is wrong
    return formationOriginX;  //  origin

} // =========================================================================== end function getFormationRight

function UpdateFormationBounds(){

    // full bounds don't account for empty cells.  I may delete these later
    fullFormationBounds.top    = formationOriginY;  //  TOP
    fullFormationBounds.left   = formationOriginX;  //  LEFT
    fullFormationBounds.bottom = formationOriginY + (ALIEN_CELL_HEIGHT * ALIEN_GRID_ROWS);  //  BOTTOM
    fullFormationBounds.right  = formationOriginX + (ALIEN_CELL_WIDTH * ALIEN_GRID_COLS);  //  RIGHT

    // these bounds account for empty cells (except when the formation is empty)
    formationBounds.top    = getFormationTop();
    formationBounds.left   = getFormationLeft();
    formationBounds.bottom = getFormationBottom();
    formationBounds.right  = getFormationRight();

} // =========================================================================== end function UpdateFormationBounds

function incrementFormation(){

    if (isMovingRight && formationBounds.right <= canvas.width - FORMATION_EDGE_LIMIT){ // movine right and not at right edge
        // increment right
        formationOriginX+= FORMATION_INCREMENT_X;
    } else if (!isMovingRight && formationBounds.left >= FORMATION_EDGE_LIMIT){ // moving left and not at left edge
        // increment left
        formationOriginX-= FORMATION_INCREMENT_X;
    } else { // at left or right edge
        // increment down and flip direction
        formationOriginY+= FORMATION_INCREMENT_Y;
        isMovingRight = !isMovingRight;
    }

} // =========================================================================== end function incrementFormation

function removeFormationExplosions(){
    for (var i = 0; i < alienGrid.length; i++){
        if (alienGrid[i] == ALIEN_EXPLOSION){
            alienGrid[i] = ALIEN_NONE;
        }
    }
} // =========================================================================== end function removeFormationExplosions

function getFormationIndexHere(x, y){
    var index;
    var row;
    var col;

    // find column
    col = Math.floor((x - formationOriginX)/ALIEN_CELL_WIDTH);
    // find row
    row = Math.floor((y - formationOriginY)/ALIEN_CELL_HEIGHT);

    // edge error correction
    if(col >= ALIEN_GRID_COLS){ // correct edge error right side
        col--;
    }
    if(col < 0){ // correct edge error left side
        col++;
    }
    if(row >= ALIEN_GRID_ROWS){ // correct edge error bottom
        row--;
    }
    if(row < 0){ // correct edge error top
        row++;
    }

    // get index
    index = rowColToArrayIndex(col, row, ALIEN_GRID_COLS);

    return index;

} // =========================================================================== end function getFormationIndexHere

function countFormationAliens(){
    var count = 0;

    // count aliens in formation
    for (var i = 0; i < alienGrid.length; i++){
        if (alienGrid[i] != ALIEN_NONE && alienGrid[i] != ALIEN_EXPLOSION && alienGrid[i] != undefined){
            count++;
        }
    }

    return count;
} // =========================================================================== end function countFormationAliens

function getAlienBounds(formationIndex){
    var alienTypeHere = alienGrid[formationIndex];
    var alienWidth  = alienPics[alienTypeHere].width;
    var alienHeight = alienPics[alienTypeHere].height;
    var row = Math.floor(formationIndex/ALIEN_GRID_COLS);
    var col = formationIndex - (row * ALIEN_GRID_COLS);
    var cellCenterX = formationOriginX + (col * ALIEN_CELL_WIDTH)  + Math.floor(ALIEN_CELL_WIDTH/2);
    var cellCenterY = formationOriginY + (row * ALIEN_CELL_HEIGHT) + Math.floor(ALIEN_CELL_HEIGHT/2);
    var bounds = {top:0, bottom:0, left:0, right:0};

    bounds.top    = cellCenterY - Math.floor(alienHeight/2);
    bounds.bottom = cellCenterY + Math.floor(alienHeight/2);
    bounds.left   = cellCenterX - Math.floor(alienWidth/2);
    bounds.right  = cellCenterX + Math.floor(alienWidth/2);

    return bounds;

} // =========================================================================== end function getAlienTop
