tiles.setCurrentTilemap(tilemap`level1`)
let myImage = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 8 8 8 8 8 8 8 8 2 . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
myImage = pathing.shearX(10, myImage);
let mySprite = sprites.create(myImage, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
tiles.placeOnRandomTile(mySprite, sprites.dungeon.darkGroundSouthEast1)
