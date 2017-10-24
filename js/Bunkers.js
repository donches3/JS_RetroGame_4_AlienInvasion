
const BUNKER_WIDTH = 88;
const BUNKER_HEIGHT = 44; // image height is actually 42
const BUNKER_ROWS = 4;
const BUNKER_COLS = 8;
const BUNKER_BLOCK_WIDTH  = 11
const BUNKER_BLOCK_HEIGHT = 11
const BUNKER_DAMAGE_RADIUS = 8;

var bunkerNew =    [0,1,1,1,1,1,1,0,
                    1,1,1,1,1,1,1,1,
                    1,1,1,1,1,1,1,1,
                    1,1,0,0,0,0,1,1];

var bunkerTest1 =  [0,1,2,2,2,1,2,0,
                    2,1,1,2,2,1,1,1,
                    1,1,1,2,2,2,1,1,
                    2,1,0,0,0,0,2,1];

const BUNKER_NONE   = 0;
const BUNKER_BLOCK  = 1;
const BUNKER_DAMAGE = 2;

// bunkersAll is an array of bunkers.  Each bunker is an array of blocks.
// so bunkersAll is an array of arrays, or a two dimensional array.
var bunkersAll = [];
var bunkersAllBounds = [];

const BUNKER_QUANTITY = 4;
const BUNKER_LAYOUT_WIDTH = 640;
const BUNKER_GAP_WIDTH = Math.floor((BUNKER_LAYOUT_WIDTH - (BUNKER_WIDTH * BUNKER_QUANTITY)) / (BUNKER_QUANTITY - 1));
// for some reason, canvas.width is undifined here
// const BUNKERS_ORIGIN_X = Math.floor((canvas.width - BUNKER_LAYOUT_WIDTH)/2);
var canvasWidth = 900;
const BUNKERS_ORIGIN_X = Math.floor((canvasWidth - BUNKER_LAYOUT_WIDTH)/2);
const BUNKERS_ORIGIN_Y = 500;
const BUNKERS_TOP = BUNKERS_ORIGIN_Y;
const BUNKERS_BOTTOM = BUNKERS_TOP + BUNKER_HEIGHT;

// ============================================================================= end vars


function loadBunkers(whichBunker){

    for (var i = 0; i < BUNKER_QUANTITY; i++){
        var bunkerFresh = whichBunker.slice(); // copies all values in bunkerTest1 into bunkerFresh

        bunkersAll.push(bunkerFresh); // adds bunkerFresh array to end of array
        createThisBunkerBounds();
    }

} // =========================================================================== end function loadBunkers

function createThisBunkerBounds(){
    var bunkerBoundsObject = {top:0, bottom:0, left:0, right:0};

    bunkersAllBounds.push(bunkerBoundsObject); // adds bunkerBoundsObject array to end of array
    var i = bunkersAllBounds.length - 1;
    bunkersAllBounds[i].top = BUNKERS_TOP;
    bunkersAllBounds[i].bottom = BUNKERS_BOTTOM;
    bunkersAllBounds[i].left = BUNKERS_ORIGIN_X + (i * (BUNKER_WIDTH + BUNKER_GAP_WIDTH));
    bunkersAllBounds[i].right = bunkersAllBounds[i].left + BUNKER_WIDTH;

} // =========================================================================== end function createThisBunkerBounds

function drawBunkers(){

    for (var i = 0; i < BUNKER_QUANTITY; i++){
        drawBunkerImage(i);
        drawBunkerDamage(i);
    }

} // =========================================================================== end function drawBunkers

function drawBunkerImage(bunkerID){
    drawBitmap(bunkerPic, bunkersAllBounds[bunkerID].left, bunkersAllBounds[bunkerID].top);
} // =========================================================================== end function drawBunkerImage

function drawBunkerDamage(bunkerID){
    var bunkerOriginX = bunkersAllBounds[bunkerID].left;
    var bunkerOriginY = bunkersAllBounds[bunkerID].top;
    var centerOffsetX = Math.floor(BUNKER_BLOCK_WIDTH/2);
    var centerOffsetY = Math.floor(BUNKER_BLOCK_HEIGHT/2);
    var drawX;
    var drawY;
    var row;
    var col;

    for (var blockIndex = 0; blockIndex < BUNKER_ROWS * BUNKER_COLS; blockIndex++){
        if (bunkersAll[bunkerID][blockIndex] == BUNKER_DAMAGE){ // if damaged block
            var rowCol = arrayIndexToRowCol(blockIndex, BUNKER_COLS);
            row = rowCol.row;
            col = rowCol.col;
            drawX = bunkerOriginX + (BUNKER_BLOCK_WIDTH  * col) + centerOffsetX;
            drawY = bunkerOriginY + (BUNKER_BLOCK_HEIGHT * row) + centerOffsetY;
            colorCircle(drawX, drawY, BUNKER_DAMAGE_RADIUS, 'black');
        }
    }

} // =========================================================================== end function drawBunkerDamage

function getBlockIndexHere(bunkerID, x, y){
    var blockindex;
    var bunkerOriginX = bunkersAllBounds[bunkerID].left;
    var bunkerOriginY = bunkersAllBounds[bunkerID].top;
    var row;
    var col;


    // find column
    col = Math.floor((x - bunkerOriginX)/BUNKER_BLOCK_WIDTH);

    if(col >= BUNKER_COLS){ // correct edge error
        col--;
    }
    if(col < 0){
        col++;
    }

    // find row
    row = Math.floor((y - bunkerOriginY)/BUNKER_BLOCK_HEIGHT);

    if(row >= BUNKER_ROWS){ // correct edge error
        row--;
    }
    if(row < 0){
        row++;
    }

    // get index
    blockindex = rowColToArrayIndex(col, row, BUNKER_COLS);

    return blockindex;

} // =========================================================================== end function getBlockIndexHere