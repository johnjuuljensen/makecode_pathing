tiles.setCurrentTilemap(tilemap`level2`)



let myImage = assets.image`box`

let mySprite = sprites.create(myImage, SpriteKind.Player)
mySprite.setFlag(SpriteFlag.Ghost, true);
tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 4));

controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)

let start = tiles.getTileLocation(1, 7);
let goal = tiles.getTileLocation(14, 7);

let path: tiles.Location[] = null;
let startTime = 0;
// milliseconds per tile
const speed = 100;

game.onUpdate(() => {
    if (!path) return;

    const dtime = (game.runtime() - startTime) / speed;
    const i = Math.floor(dtime);
    const f = dtime - i;

    if (i + 1 >= path.length) {
        const last = path.pop();
        mySprite.setPosition(last.x, last.y);
        path = null;
        return;
    }

    const x = path[i].x + (path[i + 1].x - path[i].x) * f;
    const y = path[i].y + (path[i + 1].y - path[i].y) * f;
    mySprite.setPosition(x, y);
});


controller.A.onEvent(ControllerButtonEvent.Released, () => { 
    path = pathing.AStar_findPath(mySprite.tilemapLocation(), goal);
    startTime = game.runtime();
});

// let state = pathing.initialize_AStar(start, goal, pathing.DistanceMetric.Manhattan | pathing.DistanceMetric.Euclidean);
// tiles.setTileAt(start, myTiles.tile2);
// tiles.setTileAt(goal, myTiles.tile3);

// controller.A.onEvent(ControllerButtonEvent.Released, () => {
//     if (!state) return;

//     const res = pathing.AStar_pathStep(state);
//     if (res.nodeVisited) {
//         const [f, cur, dir] = res.nodeVisited; 
//         tiles.setTileAt(cur, [myTiles.tile4, myTiles.tile5, myTiles.tile6, myTiles.tile7][dir]);
//     }

//     if (res.result === pathing.PathStepResult.Continue) {
//         for (let x of res.newNodeCandidates) {
//             let [f, n, dir] = x;
//             tiles.setTileAt(n, myTiles.tile1);
//         }
//     } else {
//         state = null;
//     }
// });
