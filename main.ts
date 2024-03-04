tiles.setCurrentTilemap(tilemap`level1`)
let myImage = assets.image`box`

let mySprite = sprites.create(myImage, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(2,4));

controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
