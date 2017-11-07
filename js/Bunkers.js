
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
const BUNKER_LAYOUT_WIDTH = 660;
const BUNKER_GAP_WIDTH = Math.floor((BUNKER_LAYOUT_WIDTH - (BUNKER_WIDTH * BUNKER_QUANTITY)) / (BUNKER_QUANTITY - 1));
// for some reason, canvas.width is undifined here
// const BUNKERS_ORIGIN_X = Math.floor((canvas.width - BUNKER_LAYOUT_WIDTH)/2);
var canvasWidth = 960; // Must code this manually when changing screen size --------------------- NOTE ////////////////
const BUNKERS_ORIGIN_X = Math.floor((canvasWidth - BUNKER_LAYOUT_WIDTH)/2);
const BUNKERS_ORIGIN_Y = 546;
const BUNKERS_TOP = BUNKERS_ORIGIN_Y;
const BUNKERS_BOTTOM = BUNKERS_TOP + BUNKER_HEIGHT;
var bunkerDomainBounds = {  top:BUNKERS_ORIGIN_Y,
                            bottom:BUNKERS_ORIGIN_Y + BUNKER_HEIGHT,
                            left:BUNKERS_ORIGIN_X,
                            right:BUNKERS_ORIGIN_X + BUNKER_LAYOUT_WIDTH };

// ============================================================================= end vars

function unloadBunkers(){

    bunkersAll = []; // empty out existing bunkers
    bunkersAllBounds = []; // empty out existing bunker bounds

    bunkersLoaded = false;

} // =========================================================================== end function unloadBunkers

function loadBunkers(whichBunker){

    if (bunkersLoaded){
        unloadBunkers();
    }

    for (var i = 0; i < BUNKER_QUANTITY; i++){
        var bunkerFresh = whichBunker.slice(); // copies all values in whichBunker into bunkerFresh

        bunkersAll.push(bunkerFresh); // adds bunkerFresh array to end of array
        createThisBunkerBounds();
    }

    bunkersLoaded = true;

} // =========================================================================== end function loadBunkers

function createThisBunkerBounds(){
    var bunkerBoundsObject = {top:0, bottom:0, left:0, right:0};

    bunkersAllBounds.push(bunkerBoundsObject); // adds bunkerBoundsObject to end of array
    var i = bunkersAllBounds.length - 1;
    bunkersAllBounds[i].top = bunkerDomainBounds.top;
    bunkersAllBounds[i].bottom = bunkerDomainBounds.bottom;
    bunkersAllBounds[i].left = bunkerDomainBounds.left + (i * (BUNKER_WIDTH + BUNKER_GAP_WIDTH));
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

    // find row
    row = Math.floor((y - bunkerOriginY)/BUNKER_BLOCK_HEIGHT);

    // error correction
    if(col >= BUNKER_COLS){ // correct edge error on right
        col--;
    }
    if(col < 0){ // correct edge error on left
        col++;
    }
    if(row >= BUNKER_ROWS){ // correct edge error on bottom
        row--;
    }
    if(row < 0){ // correct edge error on top
        row++;
    }

    // get index
    blockindex = rowColToArrayIndex(col, row, BUNKER_COLS);

    return blockindex;

} // =========================================================================== end function getBlockIndexHere

function collideFormationWithBunkers(){
    var cellKindHere;
    var alienBounds = {top:0, bottom:0, left:0, right:0};
    var blockBounds = {top:0, bottom:0, left:0, right:0};

    // check if formation bounds overlaps bunker domain
    if (doTheseRectanglesOverlap(formationBounds, bunkerDomainBounds)){

        // loop through formation backwards, (bottom first)
        for (var alienID = alienGrid.length - 1; alienID >= 0; alienID--){

            // what is in this cell
            cellKindHere = alienGrid[alienID];

            // if cell occupied
            if (cellKindHere != ALIEN_NONE && cellKindHere != ALIEN_EXPLOSION && cellKindHere != undefined){

                // get the occupant's bounds
                alienBounds = getAlienBounds(alienID);

                // optimization:  break loop if bounds is above bunker domain
                if (alienBounds.bottom < bunkerDomainBounds.top){
                    alienID = -1; // breaks loop
                } else {

                    // loop through bunkers
                    for (var bunkerID = 0; bunkerID < bunkersAll.length; bunkerID++){

                        // if this alien overlaps this bunker
                        if (doTheseRectanglesOverlap(alienBounds, bunkersAllBounds[bunkerID])){

                            // loop through this bunker's blocks
                            for (var blockID = 0; blockID < BUNKER_ROWS * BUNKER_COLS; blockID++){

                                // get this block bounds
                                blockBounds = getArrayCellBounds(   blockID,                            // cell index
                                                                    bunkersAllBounds[bunkerID].left,    // array origin X
                                                                    bunkersAllBounds[bunkerID].top,     // array origin Y
                                                                    BUNKER_BLOCK_WIDTH,                 // cell width
                                                                    BUNKER_BLOCK_HEIGHT,                // cell height
                                                                    BUNKER_COLS);                       // number of columns

                                // if this alien overlaps this block
                                if (doTheseRectanglesOverlap(alienBounds, blockBounds)){
                                    // destroy block
                                    bunkersAll[bunkerID][blockID] = BUNKER_DAMAGE;
                                } // end if overlap block
                            } // end for blockID
                        } // end if overlap
                    } // end for bunkerID
                } // end if else
            } // end if occupied
        } // end for i (alienGrid index)
    } // end if formation

} // =========================================================================== end function collideFormationWithBunkers
