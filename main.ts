let rot = 0
tiles.setCurrentTilemap(tilemap`level1`)
let myImage = assets.image`box`
let mySprite = sprites.create(myImage, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.placeOnRandomTile(mySprite, sprites.dungeon.darkGroundSouthEast1)
game.onUpdateInterval(10, function () {
    rot += 2
    if (rot >= 90) {
        rot = 0
    }
    mySprite.setImage(pathing.shearX(Math.tan(Math.PI * (rot / 180)), myImage))
})
