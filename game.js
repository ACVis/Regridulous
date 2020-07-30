import Phaser from "phaser";
import { CST } from "./src/objects/Constants";
import { enemies } from "./src/objects/Enemies";
import { Utils } from "./src/objects/Utilities";
import { Random } from "random-js";
import images from "./assets/*.png";
import tileset from "./assets/tileset/*.png";

const random = new Random();

function generateMap(mapWidth, mapLength) {
    let map = [];
    for (let row = 0; row < mapLength; row++) {
        map.push([]);
        for (let col = 0; col < mapWidth; col++) {
            // const tileSeed = Math.floor(Math.random() * 100);
            const tileSeed = random.integer(1, 100);
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
                tileNum = Math.floor((Math.random() % 0.64) * 100);
            }
            map[row].push(tileNum);
        }
    }
    return map;
}

class mainScene {
    preload() {
        this.load.image("player", images.player);
        this.load.image("enemy_basic", images.enemy_basic);
        this.load.image("coin", images.coin);
        this.load.image("overworld-tiles", tileset.OverworldTileset_v03);
    }
    addEnemies(map) {
        this.enemies = this.add.group();
        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                // const enemySeed = Math.floor(Math.random() * 100);
                console.log("Tile x,y", row, col);
                const enemySeed = random.integer(1, 100);
                let isEnemy = false;
                let enemyType = null;

                if (map[row][col] === 19 && enemySeed <= 20) {
                    let newEnemy = this.enemies.create(
                        Utils.ColToX(col),
                        Utils.RowToY(row),
                        "enemy_basic"
                    );
                    newEnemy.setOrigin(0, 0);
                    isEnemy = true;
                    enemyType = "template";
                }
                let tileNum = 0;
                switch (enemyType) {
                    case "ground":
                        break;
                    case "wall":
                        break;
                }

                // map[row].push(tileNum);
            }
        }
        return map;
    }
    create() {
        let MAP = generateMap(CST.GRID_WIDTH, CST.GRID_LENGTH);
        console.log("Map:", MAP);

        const playerStartX = Math.ceil(CST.GRID_WIDTH / 2) * CST.TILE_SIZE;
        const playerStartY = CST.GRID_LENGTH * CST.TILE_SIZE - CST.TILE_SIZE;

        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({
            data: MAP,
            tileWidth: CST.TILE_SIZE,
            tileHeight: CST.TILE_SIZE,
        });
        const tiles = map.addTilesetImage("overworld-tiles");
        const mapLayer = map.createDynamicLayer(0, tiles, 0, 0);

        let ENEMIES = this.addEnemies(MAP);
        this.player = this.add.sprite(playerStartX, playerStartY, "player");
        this.player.width = CST.TILE_SIZE;
        this.player.setOrigin(0, 0);

        let actionsTillTurn = 2;
        let isTurn = false;

        /*
            //Stat Type
            {
                Health: 100
                Defense: X
                Dodge: X
                APcharge: 4 // Action points gained per turn
                MaxAP: 16 //Max amount of Action Points allowed to bank
                ...

                debuffs: [
                    //These are SUBTRACTED from stats upon evaluation/use of player stats
                    //A Bebuff Type would extend the Stat type, but add a ap/turn duration
                    //these would be added and subtracted, having a action/turn based effect lifetime
                ]
                buffs: [
                    //These are ADDED from stats upon evaluation/use of player stats
                    //A Buff Type would extend the Stat type, but add a ap/turn duration
                    //these would be added, having a action/turn based effect lifetime
                ]
                mods: [
                    //these are more permanent effects, not based on time, their effects can be both negative and positive in one mod
                    //example- Mechanical Arms: give you extra attack damage, but reduce your APrecharge per turn by 1
                ]

            }
        */

        // How does initiative work
        // Enemy turn order is decided like this:
        // If multiple enemies tie on the number/stat, then they move to the next tie breaker
        // 1. Initiative base stat
        // 2. Distance to player
        // 3. Random roll tie breaker

        // If this doesn't work, consider making it totally random?
        function takeTurn() {
            // player actions
            // enemy actions
            // map moves

            //PLAYER
            //reset/set AP
            //spend AP or bank AP/pass
            // Actions
            //Move
            //Check collision
            //Effect
            //Use item, spell, attack
            // Bank
            // Add remaining AP to bank, no more than max
            //ENEMY

            //is this a turn?

            if (actionsTillTurn <= 0) {
                isTurn = true;
            }

            if (isTurn) {
                //enemies
            }
        }

        this.input.keyboard.on("keyup-RIGHT", (event) => {
            takeTurn();
            this.player.x += CST.TILE_SIZE;
            console.log(this.player.width, this.player.displayWidth);

            console.log("right up!");
        });
        this.input.keyboard.on("keyup-DOWN", (event) => {
            takeTurn();
            this.player.y += CST.TILE_SIZE;

            console.log("down up!");
        });
        this.input.keyboard.on("keyup-LEFT", (event) => {
            takeTurn();
            this.player.x -= CST.TILE_SIZE;
            console.log("right up!");
        });
        this.input.keyboard.on("keyup-UP", (event) => {
            takeTurn();
            this.player.y -= CST.TILE_SIZE;

            console.log("down up!");
        });

        this.arrow = this.input.keyboard.createCursorKeys();
        console.log("Map Width: ", map.widthInPixels);
        console.log("Player X Y: ", this.player.x, this.player.y);

        const camera = this.cameras.main;
        this.cameras.main
            .setZoom(1.5)
            .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
            // .centerOn(this.player.x, this.scale.y);
            .startFollow(this.player);
        // OR
        // .centerToBounds()
    }

    update() {
        // if (this.physics.overlap(this.player, this.coin)) {
        //     this.hit();
        // }
        // if (this.arrow.right.isDown) {
        //     this.player.x += 3;
        //     console.log("DOWN!");
        // } else if (this.arrow.left.isDown) {
        //     this.player.x -= 3;
        // }
        // if (this.arrow.down.isDown) {
        //     this.player.y += 3;
        // } else if (this.arrow.up.isDown) {
        //     this.player.y -= 3;
        // }
    }
}

const config1 = {
    width: 640,
    height: 480,
    backgroundColor: "#3498db",
    scene: mainScene,
    physics: { default: "arcade" },
    parent: "game",
    pixelArt: true,
    scale: {
        zoom: 1.5,
    },
};
const config2 = {
    // type: Phaser.AUTO,
    backgroundColor: "#3498db",
    pixelArt: true,
    physics: { default: "arcade" },
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game",
        width: 1280,
        height: 720,
        // zoom: Phaser.Scale.FIT,
    },
    scene: mainScene,
};
//zoom/scaling info: https://phaser.discourse.group/t/help-with-scaling-for-pixel-art/4782/2
//use scale manager zoom
let config3 = {
    // width: 1280,
    // height: 720,
    backgroundColor: "#3498db",
    scene: mainScene,
    physics: { default: "arcade" },
    parent: "game",
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 256,
        height: 192,
        zoom: 2,
        min: {
            width: 185,
            height: 90,
        },
        max: {
            width: 320,
            height: 200,
        },
    },
    // …
};
//use camera zoom
let config4 = {
    backgroundColor: "#3498db",
    scene: mainScene,
    physics: { default: "arcade" },
    parent: "game",
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 768,
        // min: {
        //     width: 740,
        //     height: 360,
        // },
        // max: {
        //     width: 1280,
        //     height: 800,
        // },
    },
    // …
};
new Phaser.Game(config4);
