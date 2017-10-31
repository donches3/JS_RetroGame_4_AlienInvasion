
const BLAST_RADIUS = 10;
const BLAST_RADIUS_MINIMUM = 2;

var bulletBlasts = [];
var playerBlasts = [];

// ============================================================================= end vars

function drawTheseBlasts(whichBlasts){

    // draw all blasts in this array
    for (var i = 0; i < whichBlasts.length; i++){ // does not run if array is empty
        drawThisBlast(whichBlasts, i);
    }

} // =========================================================================== end function drawTheseBlasts

function drawThisBlast(whichBlasts, index){
    colorCircle(whichBlasts[index].positionX, whichBlasts[index].positionY, whichBlasts[index].radius, 'white');
} // =========================================================================== end function drawThisBlast

function createBlast(whichBlasts, blastPosX, blastPosY){
    var initialBlast = {positionX: 0, positionY: 0, radius: 0};

    whichBlasts.push(initialBlast); // adds blast object to end of array
    whichBlasts[whichBlasts.length - 1].positionX = blastPosX;
    whichBlasts[whichBlasts.length - 1].positionY = blastPosY;
    whichBlasts[whichBlasts.length - 1].radius = BLAST_RADIUS;

} // =========================================================================== end function createBlast

function incrementTheseBlasts(whichBlasts){

    // increment (shrink) all blasts and destroy the ones with minimum radius

    // this loop must start at the end and increment backwards
    // because the length of the array is changing while this loop is running
    for (var i = whichBlasts.length - 1; i >= 0; i--){
        whichBlasts[i].radius -= 1;
        if (whichBlasts[i].radius <= BLAST_RADIUS_MINIMUM){
            // destroy this blast without leaving gap in array
            destroyElementOfArray(whichBlasts, i);
        }
    }

} // =========================================================================== end function incrementTheseBlasts
