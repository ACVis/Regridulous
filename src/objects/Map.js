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
    getTileArray({test = false} = {}) {
        let output = [];
        if(test) {
            output = [
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [19,19,19,19,19,19,19,19,19,19,19,19,19],
                [0,2,0,0,0,0,19,0,0,0,0,0,0]
            ];
        } else {
        this.tileMap.forEach((row) => {
            const mappedRow = row.map((tile) => tile.index);
            output.push(mappedRow);
        });
        }

        
        return output;
    }
    getMap() {
        return this.tileMap;
    }
    // getMapCopy() {
    //
    // }
    createMap(
        tileSet,
        tileMap = [],
        tileWidth = CST.TILE_SIZE,
        tileHeight = CST.TILE_SIZE
    ) {
        const internalMap = this.getTileArray({test: true});
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
        // map.setRenderOrder(3); //render from bottom left-up
        const tiles = map.addTilesetImage(tileSet);

        const layer = map.createDynamicLayer(0, tiles, 0, 0);
        // this.mapLayer = layer;
        return [map, layer];
    }
    toString() {
        return this.tileMap;
    }
}

export { MapManager, TILE_TYPE };
