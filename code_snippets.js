this.enemiesGroup.runChildUpdate = true;

// Probably useful:
// * Creates a Sprite for every object matching the given tile indexes in the layer. You can
// * optionally specify if each tile will be replaced with a new tile after the Sprite has been
// * created. This is useful if you want to lay down special tiles in a level that are converted to
// * Sprites, but want to replace the tile itself with a floor tile or similar once converted.
// *
// * @method Phaser.Tilemaps.Tilemap#createFromTiles

// ZxCidi in Phaser discord
generateGrid() {
    for (var y = 0; y < this.map.height; y++) {
        for (var x = 0; x < this.map.width; x++) {
            // ToDo optimize and refactor
            // In each cell we store the ID of the tile, which corresponds
            // to its index in the tileset of the map ("ID" field in Tiled)
            let tile = this.map.getTileAt(x, y);
            if (tile) {
                if (tile.properties && tile.properties["collide"] && tile.properties["collide"] == true) {
                    this.grid.colliding.push({ x, y });
                }
                // ToDo push more tile properties
            }
        }
        let playerTile: Phaser.Tilemaps.Tile =
            this.map.getTileAt(this.map.worldToTileX(this.gameScene.player.sprite.x),
            this.map.worldToTileY(this.gameScene.player.sprite.y));
        this.player = { x: playerTile.x, y: playerTile.y };
        // console.log(this.player);
    }
}
//MINIMAP
render() {
    // let width = this.map.width * Config.MiniMapConfig.pixelsPerTile;
    // let height = this.map.width * Config.MiniMapConfig.pixelsPerTile;
    this.clear();
    // create minimap base rect with white color and frame
    this.fillStyle(0xFFFFFF);
    this.fillRect(this.x - this.pixels,
        this.y - this.pixels, ((this.map.width + 2) * this.pixels),
        ((this.map.height + 2) * this.pixels));

    // populate minimap with colliding tiles(black color)
    this.fillStyle(0x000000);
    this.grid.colliding.forEach(coord => {
        this.fillRect(this.x + (coord.x * this.pixels), this.y + (coord.y * this.pixels), this.pixels, this.pixels);
    });
    // put player's current position on the minimap(red color)
    this.fillStyle(0xFF0000);
    this.fillRect(
        this.x + (this.player.x * this.pixels),
        this.y + (this.player.y * this.pixels),
        (this.pixels),
        (this.pixels));
}