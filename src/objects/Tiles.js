import Phaser from "phaser";
const Map = new Map();

export { Tiler };
class Map {
    constructor(scene) {
        tilesGroup = scene.group.add();
        tiles = [];
    }
    createTile() {}
    getTile(col, row) {
        // tiles.forEach((row, rowIndex) => {
        //     row.forEach((col, colIndex) => {

        //         row[colIndex]
        //     })
        // })

        if (tiles[row] && tiles[row][col]) {
            return tiles[row][col];
        }
    }
    setTile(col, row, newTile) {
        // tiles.forEach((row, rowIndex) => {
        //     row.forEach((col, colIndex) => {

        //         row[colIndex]
        //     })
        // })

        if (tiles[row] && tiles[row][col]) {
            tiles[row][col] = newTile;
        }
    }
}

class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, tileType) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        // scene.sys.updateList.add(this);
        // scene.sys.displayList.add(this);
    }
}
