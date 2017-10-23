
// const TILE_WIDTH = 50;
// const TILE_HEIGHT = 50;
// const WORLD_COLS = 16;
// const WORLD_ROWS = 12;

// var levelOne  = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
//                  1,0,0,0,0,0,1,0,0,0,5,0,1,1,1,1,
//                  1,0,4,0,4,0,1,0,2,0,1,0,1,4,4,1,
//                  1,0,0,0,0,0,1,0,0,0,1,5,1,5,1,1,
//                  1,1,1,5,1,1,1,0,4,0,1,0,0,0,1,1,
//                  1,0,0,0,0,0,0,0,0,0,1,0,4,0,1,1,
//                  1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,
//                  1,0,1,1,1,1,1,1,1,1,1,0,4,0,1,1,
//                  1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,1,
//                  1,0,5,0,5,0,5,0,3,0,1,1,1,1,1,1,
//                  1,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,
//                  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
//
// var worldGrid = [];

const WORLD_FLOOR = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_KEY = 4;
const WORLD_DOOR = 5;

const GROUND_LEVEL = 52;
const GROUND_THICKNESS = 3;
const TOP_OF_WORLD = 114;

// ============================================================================= end vars

// function returnTileTypeAtColRow(col, row) {
//     // if inside world field ...
//     if (col >= 0 && col < WORLD_COLS &&
//         row >= 0 && row < WORLD_ROWS) {
//             var worldIndexUnderCoord = rowColToArrayIndex(col, row, WORLD_COLS);
//             return worldGrid[worldIndexUnderCoord];
//         } else { // outside world field, so no world
//             return WORLD_WALL;
//         } // end if else
// } // =========================================================================== end function returnTileTypeAtColRow

// function warriorWorldHandling(whichWarrior) {
//     var warriorWorldCol = Math.floor(whichWarrior.x / TILE_WIDTH);
//     var warriorWorldRow = Math.floor(whichWarrior.y / TILE_HEIGHT);
//     var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow, WORLD_COLS);
//
//     // if warrior is within world field ...
//     if (warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
//         warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
//
//         var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow)
//
//         switch (tileHere) {
//             case WORLD_FLOOR:
//                 // nothing goes here, unimpeded movement is handled elsewhere.
//                 break; // end case floor
//             case WORLD_WALL:
//                 // stops player motion
//                 whichWarrior.x -= whichWarrior.incrementX; // these two lines prevent burrowing bug by
//                 whichWarrior.y -= whichWarrior.incrementY; // reverse incrementing warrior position
//                 break; // end case wall
//             case WORLD_GOAL:
//                 console.log(whichWarrior.name + " WINS!")
//                 loadLevel(levelOne);
//                 break; // end case goal
//             case WORLD_KEY:
//                 whichWarrior.keysHeld++; // add key to inventory
//                 worldGrid[worldIndexUnderWarrior] = WORLD_FLOOR; // replace key tile with floor tile
//                 break; // end case key
//             case WORLD_DOOR:
//                 // check keys
//                 if (whichWarrior.keysHeld > 0) {
//                     whichWarrior.keysHeld--; // remove key from inventory
//                     worldGrid[worldIndexUnderWarrior] = WORLD_FLOOR; // replace door tile with floor tile
//                 } else { // nope, door is obstacle
//                     // stops player motion
//                     whichWarrior.x -= whichWarrior.incrementX; // these two lines prevent burrowing bug by
//                     whichWarrior.y -= whichWarrior.incrementY; // reverse incrementing warrior position
//                 } // end else
//                 break; // end case door
//             default:
//                 // nothing goes here, unimpeded movement is handled elsewhere.
//                 break;
//         } // end switch
//
//     } // end if within world field
// } // =========================================================================== end function warriorWorldHandling

// function tileKindHasTransparency(checkTileKind) {
//     // true if tile is key, door or goal
//     return (
//         checkTileKind == WORLD_KEY  ||
//         checkTileKind == WORLD_DOOR ||
//         checkTileKind == WORLD_GOAL
//     );
// } // =========================================================================== end function tileKindHasTransparency

function drawWorld() {
    // background
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // ground line
    colorRect(0, canvas.height - GROUND_LEVEL, canvas.width, GROUND_THICKNESS, 'white');

} // =========================================================================== end function drawWorld
