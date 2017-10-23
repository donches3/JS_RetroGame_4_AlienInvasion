function drawBitmap(useBitmap, atX, atY) {
    canvasContext.drawImage(useBitmap, atX, atY);
} // =========================================================================== end function drawBitmap

function drawBitmapCentered(useBitmap, atX, atY) {
    canvasContext.drawImage(useBitmap, atX-useBitmap.width/2, atY-useBitmap.height/2);
} // =========================================================================== end function drawBitmapCentered

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
} // =========================================================================== end function drawBitmapCenteredWithRotation

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
} // =========================================================================== end function colorRect

function colorRectCentered(centerX, centerY, boxWidth, boxHeight, fillColor) {
    var topLeftX = centerX - Math.floor(boxWidth/2);
    var topLeftY = centerY - Math.floor(boxHeight/2);
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
} // =========================================================================== end function colorRectCentered

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
} // =========================================================================== end function colorCircle

function colorText(showWords, textX, textY, fillColor) {
    canvasContext.font="bold 21px courier";
    // canvasContext.font="bold 21px arial";
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
} // =========================================================================== end function colorText

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// common functions

function rowColToArrayIndex(col, row, numCols) {
    return (row * numCols) + col;
} // =========================================================================== end function rowColToArrayIndex

function destroyElementOfArray(whichArray, index){
    // destroy this element without leaving gap in array
    whichArray.splice(index, 1);
} // =========================================================================== end function destroyElementOfArray
