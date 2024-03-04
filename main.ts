let rot = 0
let rotDir = 1
tiles.setCurrentTilemap(tilemap`level1`)
let myImage = assets.image`box`
let rotImage = myImage.clone();
rotImage.flipX();
rotImage.flipY();

tiles.placeOnTile(sprites.create(myImage, SpriteKind.Food), tiles.getTileLocation(1,1));
tiles.placeOnTile(sprites.create(myImage.transposed(), SpriteKind.Food), tiles.getTileLocation(2,1));
tiles.placeOnTile(sprites.create(rotImage, SpriteKind.Food), tiles.getTileLocation(3,1));


let mySprite = sprites.create(myImage, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(2,4));


//controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
//tiles.placeOnRandomTile(mySprite, sprites.dungeon.darkGroundSouthEast1)

function rotate(amount: number) {
    rot += amount
    // if (rot > 180) {
    //     rot = 180;
    // }
    // if (rot < -90) {
    //     rot = -90;
    // }
    mySprite.setImage(imagesExt.rotate(imagesExt.RotationType.ShearRotate, rot, myImage))
    mySprite.sayText(`${rot}`)
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(-1);
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    rotate(-1);
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(1);
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    rotate(1);
})


// game.onUpdateInterval(10, function () {
//     rot += rotDir
//     if (rot > 180) {
//         rot = 180;
//         rotDir = -1 * rotDir;
//     }
//     if (rot < -90) {
//         rot = -90;
//         rotDir = -1 * rotDir;
//     }
//     mySprite.setImage(imagesExt.rotate(imagesExt.RotationType.ShearRotate, rot, myImage))
//     //mySprite.setImage(myImage.rotated(90));
//     mySprite.sayText(`${rot}`)
// })
