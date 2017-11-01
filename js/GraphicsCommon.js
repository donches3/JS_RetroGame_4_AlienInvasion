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

function colorTextCentered(showWords, centerX, atY, charWidth, fillColor){
    var numChars = showWords.length
    var atX = centerX - Math.floor((numChars * charWidth)/2);

    canvasContext.font="bold 21px courier";
    // canvasContext.font="bold 21px arial";
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, atX, atY);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// common functions

function rowColToArrayIndex(col, row, numCols) {
    return (row * numCols) + col;
} // =========================================================================== end function rowColToArrayIndex

function arrayIndexToRowCol(index, numCols){
    var rowCol = {row:0, col:0};

    rowCol.row = Math.floor(index/numCols);
    rowCol.col = index - (rowCol.row * numCols);

    return rowCol;
} // =========================================================================== end function arrayIndexToRowCol

function getArrayCellBounds(index, arrayOriginX, arrayOriginY, cellWidth, cellHeight, numCols){
    var bounds = {top:0, bottom:0, left:0, right:0};
    var rowCol = {row:0, col:0};

    rowCol = arrayIndexToRowCol(index, numCols);

    bounds.top = arrayOriginY + (rowCol.row * cellHeight);
    bounds.bottom = bounds.top + cellHeight;
    bounds.left = arrayOriginX + (rowCol.col * cellWidth);
    bounds.right = bounds.left + cellWidth;

    return bounds;

} // =========================================================================== end function getBlockBounds

function destroyElementOfArray(whichArray, index){
    // destroy this element without leaving gap in array
    whichArray.splice(index, 1);
} // =========================================================================== end function destroyElementOfArray

function doTheseRectanglesOverlap(rect1Bounds, rect2Bounds){

    // first, check that recangles aren't invalid or zero size
    if (rect1Bounds.right  < rect1Bounds.left ||
        rect1Bounds.bottom < rect1Bounds.top  ||
        rect2Bounds.right  < rect2Bounds.left ||
        rect2Bounds.bottom < rect2Bounds.top  ){

        console.log('invalid rectangle in doTheseRectanglesOverlap');
        return false;
    }

    // check non-point (plus-shaped) overlap where rect1 is "vertical"
    if (rect1Bounds.left   > rect2Bounds.left   &&
        rect1Bounds.right  < rect2Bounds.right  &&
        rect1Bounds.top    < rect2Bounds.top    &&
        rect1Bounds.bottom > rect2Bounds.bottom ){

        return true;
    }

    // check non-point (plus-shaped) overlap where rect2 is "vertical"
    if (rect2Bounds.left   > rect1Bounds.left   &&
        rect2Bounds.right  < rect1Bounds.right  &&
        rect2Bounds.top    < rect1Bounds.top    &&
        rect2Bounds.bottom > rect1Bounds.bottom ){

        return true;
    }

    // check corner overlaps.  Corners of rect1 against bounds of rect2
    if (isPointInsideRectangle(rect1Bounds.left,  rect1Bounds.top,    rect2Bounds) ||
        isPointInsideRectangle(rect1Bounds.left,  rect1Bounds.bottom, rect2Bounds) ||
        isPointInsideRectangle(rect1Bounds.right, rect1Bounds.top,    rect2Bounds) ||
        isPointInsideRectangle(rect1Bounds.right, rect1Bounds.bottom, rect2Bounds) ){

        return true;
    }

    // check corner overlaps.  Corners of rect2 against bounds of rect1
    if (isPointInsideRectangle(rect2Bounds.left,  rect2Bounds.top,    rect1Bounds) ||
        isPointInsideRectangle(rect2Bounds.left,  rect2Bounds.bottom, rect1Bounds) ||
        isPointInsideRectangle(rect2Bounds.right, rect2Bounds.top,    rect1Bounds) ||
        isPointInsideRectangle(rect2Bounds.right, rect2Bounds.bottom, rect1Bounds) ){

        return true;
    }

    // no overlaps found
    return false;

} // =========================================================================== end function doTheseRectanglesOverlap

function isPointInsideRectangle(pointX, pointY, rectBounds){

    // first, check that recangle isn't invalid or zero size
    if (rectBounds.right  < rectBounds.left ||
        rectBounds.bottom < rectBounds.top  ){

        console.log('invalid rectangle in isPointInsideRectangle');
        return false;
    }

    // check point against rectangle
    if (pointX > rectBounds.left   &&
        pointX < rectBounds.right  &&
        pointY > rectBounds.top    &&
        pointY < rectBounds.bottom ){

        return true;
    }

    // no overlap found
    return false;

} // =========================================================================== end function isPointInsideRectangle
