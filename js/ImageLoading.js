var warrior1Pic  = document.createElement("img");
var playerPic  = document.createElement("img");
var bunkerPic  = document.createElement("img");

// var tempFileCounter;  //  ---------------------------------------------------////////////////

var worldPics = [];

var alienPics = [];
alienPics[0] = 0;  // there is no image at index zero

var picsToLoad = 0; // set automatically in function loadImages

// ============================================================================= end vars

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;

    if(picsToLoad == 0) {
        imageLoadingDoneSoStartGame();

        // colorText("All Images Loaded", canvas.width/2, canvas.height/2 + 50, 'white');  //  ////////////////

    }
} // =========================================================================== end function countLoadedImagesAndLaunchIfReady

function beginLoadingImage(imgVar, fileName) {

    // colorText(fileName, canvas.width/2 + 150, tempFileCounter * 20 + 100, 'white');  //  ////////////////

    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
} // =========================================================================== end function beginLoadingImage

// function loadImageForWorldCode(worldCode, fileName) {
//     worldPics[worldCode] = document.createElement("img");
//     beginLoadingImage(worldPics[worldCode], fileName);
// } // =========================================================================== end function loadImageForWorldCode

function loadImageForAlienCode(alienCode, fileName) {
    alienPics[alienCode] = document.createElement("img");
    beginLoadingImage(alienPics[alienCode], fileName);
} // =========================================================================== end function loadImageForAlienCode


function loadImages() {
    var imageList = [
        {varName: warrior1Pic,  theFile: "player1warrior.png"}, // not needed for this game ////////////////
        {varName: playerPic,    theFile: "PlayerTank_52x24.jpg"},
        {varName: bunkerPic,    theFile: "Bunker_88x42.jpg"},
        // {worldType: WORLD_FLOOR,    theFile: "world_floor.png"}, // not needed for this game ////////////////
        // {worldType: WORLD_WALL,     theFile: "world_wall.png"}, // not needed for this game ////////////////
        // {worldType: WORLD_GOAL,     theFile: "world_goal.png"}, // not needed for this game ////////////////
        // {worldType: WORLD_KEY,      theFile: "world_key.png"}, // not needed for this game ////////////////
        // {worldType: WORLD_DOOR,     theFile: "world_door.png"}, // not needed for this game ////////////////
        {alienType: ALIEN_LARGE,        theFile: "AlienShip_1a_48x24.jpg"},
        {alienType: ALIEN_MEDIUM,       theFile: "AlienShip_2a_44x24.jpg"},
        {alienType: ALIEN_SMALL,        theFile: "AlienShip_3a_32x24.jpg"},
        {alienType: ALIEN_SLIDER,       theFile: "AlienShip_4_64x24.jpg"},
        {alienType: ALIEN_EXPLOSION,    theFile: "AlienExplosion_44x27.jpg"},
        {alienType: ALIEN_LARGE_B,      theFile: "AlienShip_1b_48x24.jpg"},
        {alienType: ALIEN_MEDIUM_B,     theFile: "AlienShip_2b_44x24.jpg"},
        {alienType: ALIEN_SMALL_B,      theFile: "AlienShip_3b_32x24.jpg"}
        ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {

        // tempFileCounter = i;  //  -------------------------------------------////////////////

        if(imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName ,imageList[i].theFile )
        // } else if(imageList[i].worldType != undefined)  {
        //     loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
        } else {
            loadImageForAlienCode(imageList[i].alienType, imageList[i].theFile);
        }
    }

} // =========================================================================== end function loadImages
