import Phaser from "phaser";
import { Random } from "../objects/Utilities";
import { CST } from "../objects/Constants";
import { isEmpty } from "lodash-es";
// class Tile extends Phaser.GameObjects.Sprite {
//     constructor(scene, x, y, texture, frame, tileType) {
//         super(scene, x, y, texture, frame);
//         scene.add.existing(this);
//         // scene.sys.updateList.add(this);
//         // scene.sys.displayList.add(this);
//     }
// }
// class Enemy extends Phaser.GameObjects.Sprite {
//     constructor(scene, x, y, textureName) {
//         super(scene, x, y, textureName);
//     }
//     create() {
//     }
//     update() {
//     }
// }

/**
 * @classdesc
 * A Tile is a representation of a single tile within the Tilemap. This is a lightweight data
 * representation, so its position information is stored without factoring in scroll, layer
 * scale or layer position.
 *
 * @class Tile
 * @memberof Phaser.Tilemaps
 * @constructor
 * @since 3.0.0
 *
 * @extends Phaser.Tilemaps.Tile
 *
 * @param {Phaser.Tilemaps.LayerData} layer - The LayerData object in the Tilemap that this tile belongs to.
 * @param {integer} index - The unique index of this tile within the map (image index)
 * @param {integer} x - The x coordinate of this tile in tile coordinates.
 * @param {integer} y - The y coordinate of this tile in tile coordinates.
 * @param {integer} width - Width of the tile in pixels.
 * @param {integer} height - Height of the tile in pixels.
 * @param {integer} baseWidth - The base width a tile in the map (in pixels). Tiled maps support
 * multiple tileset sizes within one map, but they are still placed at intervals of the base
 * tile width.
 * @param {integer} baseHeight - The base height of the tile in pixels (in pixels). Tiled maps
 * support multiple tileset sizes within one map, but they are still placed at intervals of the
 * base tile height.
 */
class CustomTile extends Phaser.Tilemaps.Tile {
    constructor(layer, index, x, y, width, height, tileConfig) {
        super(layer, index, x, y, width, height);
        Object.assign(this, tileConfig); //add things like tile.properties
    }
}
//EXAMPLE
// class WallTile extends Phaser.Tilemaps.Tile {
//     constructor(layer, x, y, width, height, tileconfig) {
//         const wallTileImgIndex = "PROBABLY A CONSTANT OR ENUM";
//         super(layer, wallTileImgIndex, x, y, width, height, tileconfig);
//         this.properties.collides = true;
//     }
// }
// EXAMPLE
// class LavaTile extends Phaser.Tilemaps.Tile {
//     constructor(layer, x, y, width, height, tileconfig) {
//         const lavaTileImgIndex = "PROBABLY A CONSTANT OR ENUM";
//         super(layer, lavaTileImgIndex, x, y, width, height, tileconfig);
//         this.properties.collides = true;
//         this.properties.dmg = 10;
//         this.properties.dmgType = "fire";
//     }
//     probablySomeMethods(){}
// }
const TILE_TYPE = {
    wall: 0,
    ground: 19,
    getRandom: () => Random.integer(1, 64),
};
Object.freeze(TILE_TYPE);

class MapManager {
    constructor(scene, mapWidth = null, mapLength = null, tileSet = null) {
        // super(scene, x, y, textureName);
        // this.mapWidth = mapWidth;
        // this.mapLength = mapLength;
        // this.tileSet = tileSet;
        this.tileMap = [];
        this.scene = scene;
    }
    generateMap_orig(mapWidth = CST.GRID_WIDTH, mapLength = CST.GRID_LENGTH) {
        let map = [];
        for (let row = 0; row < mapLength; row++) {
            map.push([]);
            for (let col = 0; col < mapWidth; col++) {
                // const tileSeed = Math.floor(Math.random() * 100);
                const tileSeed = Random.integer(1, 100);
                const tileType = null;

                if (tileSeed <= 30) {
                    tileType = "wall";
                } else if (tileSeed > 30) {
                    tileType = "ground";
                } else {
                    tileType = "ground";
                }
                let tileNum = 0;
                switch (tileType) {
                    case "ground":
                        break;
                    case "wall":
                        break;
                }
                if (tileType === "ground") {
                    tileNum = 19;
                } else {
                    //could probably simplify this to use Random.integer
                    tileNum = Math.floor((Random.real(0, 1) % 0.64) * 100);
                }
                map[row].push(tileNum);
            }
        }
        this.tileMap = map;
        return this.tileMap;
    }
    genTileType(/* maybe feed the row in? */) {
        // const tileSeed = Math.floor(Math.random() * 100);
        const tileSeed = Random.integer(1, 100);

        if (tileSeed > 75) {
            return TILE_TYPE.wall;
        } else if (tileSeed > 20) {
            return TILE_TYPE.ground;
        } else {
            return TILE_TYPE.getRandom();
        }
    }
    generateMap(mapWidth = CST.GRID_WIDTH, mapLength = CST.GRID_LENGTH) {
        let map = [];

        for (let row = 0; row < mapLength; row++) {
            map.push([]);
            for (let col = 0; col < mapWidth; col++) {
                let tileNum = this.genTileType();

                switch (tileNum) {
                    case TILE_TYPE.ground:
                        break;
                    case TILE_TYPE.wall:
                        break;
                }
                // may want to replace this by using a TileEntity class
                const tileEntity = { col, row, index: tileNum };
                map[row].push(tileEntity);
            }
        }
        this.tileMap = map;
        return this.tileMap;
    }
    generateMapv2(
        mapWidth = CST.GRID_WIDTH,
        mapLength = CST.GRID_LENGTH,
        tileWidth = CST.TILE_SIZE,
        tileHeight = CST.TILE_SIZE,
        layer = null
    ) {
        let map = [];

        for (let row = 0; row < mapLength; row++) {
            map.push([]);
            for (let col = 0; col < mapWidth; col++) {
                let tileNum = this.genTileType();
                const tileConfig = {};
                tileConfig.properties = {};

                switch (tileNum) {
                    case TILE_TYPE.ground:
                        tileConfig.properties.collides = false;
                        break;
                    case TILE_TYPE.wall:
                        tileConfig.properties.collides = true;
                        break;
                }

                // may want to replace this by using a TileEntity class
                // const tileEntity = { col, row, index: tileNum };

                //if we don't add layer here, we need to add it later
                const tileEntity = new CustomTile(
                    layer,
                    tileNum,
                    col,
                    row,
                    tileWidth,
                    tileHeight,
                    tileConfig
                );
                map[row].push(tileEntity);
            }
        }
        //NOTE: may want to add a paramter toggle for this func(setInternalTileMap = true)
        //if(setIntTileMap) {
        this.tileMap = map;
        return this.tileMap;
    }
    getTileArray() {
        let output = [];
        this.tileMap.forEach((row) => {
            const mappedRow = row.map((tile) => tile.index);
            output.push(mappedRow);
        });
        return output;
    }
    createMap(
        tileSet,
        tileMap = [],
        tileWidth = CST.TILE_SIZE,
        tileHeight = CST.TILE_SIZE
    ) {
        const internalMap = this.getTileArray();
        //If no tilemap passed and none on object, throw error
        if (isEmpty(tileMap) && isEmpty(internalMap)) {
            throw new Error("No Tilemap Set");
        }
        //if passed tileMap empty and on-object is not, take the on-object version
        else if (isEmpty(tileMap) && !isEmpty(internalMap)) {
            tileMap = internalMap;
        } else {
            //
        }
        const map = this.scene.make.tilemap({
            data: tileMap,
            tileWidth: CST.TILE_SIZE,
            tileHeight: CST.TILE_SIZE,
        });
        const tiles = map.addTilesetImage(tileSet);

        const layer = map.createDynamicLayer(0, tiles, 0, 0);
        // this.mapLayer = layer;
        return [map, layer];
    }
    getMap() {
        return this.tileMap;
    }
    // getMapCopy() {
    //
    // }
    createMapv2(
        layerName,
        tileSet,
        tileWidth = CST.TILE_SIZE,
        tileHeight = CST.TILE_SIZE,
        mapWidth = CST.GRID_WIDTH,
        mapLength = CST.GRID_LENGTH,
        tileMap
    ) {
        //setup tilemap
        const map = this.scene.make.tilemap({
            tileWidth: CST.TILE_SIZE,
            tileHeight: CST.TILE_SIZE,
        });
        const layer = map.createBlankDynamicLayer(layerName, tileSet);
        //add tiles
        if (isEmpty(tileMap) && !isEmpty(this.tileMap)) {
            tileMap = this.tileMap;
        } else if (isEmpty(tileMap) && isEmpty(this.tileMap)) {
            throw new Error("No tileMap passed");
        }
        tileMap.flat().forEach((tile) => {
            tile.layer = layerName;
            map.putTileAt(tile, tile.x, tile.y);
        });
        return [map, layer];
    }
    toString() {
        return this.tileMap;
    }
}

export { MapManager, TILE_TYPE, CustomTile };
