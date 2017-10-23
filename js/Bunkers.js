
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
var BunkersAllBounds = [];

const BUNKER_QUANTITY = 4;
const BUNKER_LAYOUT_WIDTH = 640;
const BUNKER_GAP_WIDTH = Math.floor((BUNKER_LAYOUT_WIDTH - (BUNKER_WIDTH * BUNKER_QUANTITY)) / (BUNKER_QUANTITY - 1));
// for some reason, canvas.width is undifined here
// const BUNKERS_ORIGIN_X = Math.floor((canvas.width - BUNKER_LAYOUT_WIDTH)/2);
const BUNKERS_ORIGIN_X = Math.floor((900 - BUNKER_LAYOUT_WIDTH)/2);
const BUNKERS_ORIGIN_Y = 600;
const BUNKERS_TOP = BUNKERS_ORIGIN_Y;
const BUNKERS_BOTTOM = BUNKERS_TOP + BUNKER_HEIGHT;

// ============================================================================= end vars


function loadBunkers(){
    var bunkerFresh = bunkerTest1.slice(); // copies all values in bunkerTest1 into bunkerFresh

    for (var i = 0; i < BUNKER_QUANTITY; i++){
        bunkersAll.push(bunkerFresh); // adds bunkerFresh array to end of array
        createThisBunkerBounds();
    }

} // =========================================================================== end function loadBunkers

function createThisBunkerBounds(){
    var bunkerBoundsObject = {top:0, bottom:0, left:0, right:0};

    BunkersAllBounds.push(bunkerBoundsObject); // adds bunkerBoundsObject array to end of array
    var i = BunkersAllBounds.length - 1;
    BunkersAllBounds[i].top = BUNKERS_TOP;
    BunkersAllBounds[i].bottom = BUNKERS_BOTTOM;
    BunkersAllBounds[i].left = BUNKERS_ORIGIN_X + (i * (BUNKER_WIDTH + BUNKER_GAP_WIDTH));
    BunkersAllBounds[i].right = BunkersAllBounds[i].left + BUNKER_WIDTH;

} // =========================================================================== end function createThisBunkerBounds

function drawBunkers(){

    for (var i = 0; i < BUNKER_QUANTITY; i++){
        drawBunkerImage(i);
        // drawBunkerDamage(i);
    }

} // =========================================================================== end function drawBunkers

function drawBunkerImage(bunkerID){
    drawBitmap(bunkerPic, BunkersAllBounds[bunkerID].left, BunkersAllBounds[bunkerID].top);
} // =========================================================================== end function drawBunkerImage

function drawBunkerDamage(bunkerID){

} // =========================================================================== end function drawBunkerDamage
