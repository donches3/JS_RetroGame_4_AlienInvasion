
const BLAST_RADIUS = 10;
const BLAST_RADIUS_MINIMUM = 2;

var allBlasts = [];

// ============================================================================= end vars

function drawBlasts(){

    // draw all blasts
    for (var i = 0; i < allBlasts.length; i++){ // does not run if array is empty
        drawThisBlast(i);
    }

} // =========================================================================== end function drawBlasts

function drawThisBlast(index){
    colorCircle(allBlasts[index].positionX, allBlasts[index].positionY, allBlasts[index].radius, 'white');
} // =========================================================================== end function drawThisBlast

function createBlast(blastPosX, blastPosY){
    var initialBlast = {positionX: 0, positionY: 0, radius: 0};

    allBlasts.push(initialBlast); // adds blast object to end of array
    allBlasts[allBlasts.length - 1].positionX = blastPosX;
    allBlasts[allBlasts.length - 1].positionY = blastPosY;
    allBlasts[allBlasts.length - 1].radius = BLAST_RADIUS;

} // =========================================================================== end function createBlast

function incrementBlasts(){

    // increment (shrink) all blasts and destroy the ones with minimum radius

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = allBlasts.length - 1; i >= 0; i--){
        allBlasts[i].radius -= 1;
        if (allBlasts[i].radius <= BLAST_RADIUS_MINIMUM){
            // destroy this blast without leaving gap in array
            destroyElementOfArray(allBlasts, i);
        }
    }

} // =========================================================================== end function incrementBlasts
