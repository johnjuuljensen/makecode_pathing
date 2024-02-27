// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1000100001010101010101010101010101010101010202020202020202020202020202010102020202020202020202020202020101020201010101020202020202020201010202010101010202020202020202010102020101010102020202020102020101020201010101020202020101020201010202020202020202020101010202010102020202020202020101010102020101020202020202020101010101020201010202020202020101010101010202010102020202020101010101010102020101020202020101010101010101020201010202020202020202020202020202010102020202020202020202020202020101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . 2 2 2 2 . . . . . . . . 2 
2 . . 2 2 2 2 . . . . . . . . 2 
2 . . 2 2 2 2 . . . . . 2 . . 2 
2 . . 2 2 2 2 . . . . 2 2 . . 2 
2 . . . . . . . . . 2 2 2 . . 2 
2 . . . . . . . . 2 2 2 2 . . 2 
2 . . . . . . . 2 2 2 2 2 . . 2 
2 . . . . . . 2 2 2 2 2 2 . . 2 
2 . . . . . 2 2 2 2 2 2 2 . . 2 
2 . . . . 2 2 2 2 2 2 2 2 . . 2 
2 . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.dungeon.floorLight0,sprites.dungeon.darkGroundSouthEast1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
