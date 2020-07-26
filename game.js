import Phaser from "phaser";
import images from "./assets/*.png";
import tileset from "./assets/tileset/*.png";

class mainScene {
    preload() {
        this.load.image("player", images.player);
        this.load.image("coin", images.coin);
        this.load.image("overworld-tiles", tileset.OverworldTileset_v03);
    }

    create() {
        const TILE_SIZE = 16;
        const GRID_WIDTH = 13;
        const GRID_LENGTH = GRID_WIDTH * 2;
        let LEVEL = [];

        const playerStartX = Math.ceil(GRID_WIDTH / 2) * TILE_SIZE;
        const playerStartY = GRID_LENGTH * TILE_SIZE - TILE_SIZE;

        for (let row = 0; row < GRID_LENGTH; row++) {
            LEVEL.push([]);
            for (let col = 0; col < GRID_WIDTH; col++) {
                const isWall = Math.random() <= 0.75;
                let tileNum = 0;
                if (isWall) {
                    tileNum = 19;
                } else {
                    tileNum = Math.floor((Math.random() % 0.64) * 100);
                }
                LEVEL[row].push(tileNum);
            }
        }
        console.log(LEVEL);
        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({
            data: LEVEL,
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
        });
        const tiles = map.addTilesetImage("overworld-tiles");
        const layer = map.createDynamicLayer(0, tiles, 0, 0);

        this.player = this.physics.add.sprite(
            playerStartX,
            playerStartY,
            "player"
        );
        this.player.width = TILE_SIZE;
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
            this.player.x += TILE_SIZE;
            console.log(this.player.width, this.player.displayWidth);

            console.log("right up!");
        });
        this.input.keyboard.on("keyup-DOWN", (event) => {
            takeTurn();
            this.player.y += TILE_SIZE;

            console.log("down up!");
        });
        this.input.keyboard.on("keyup-LEFT", (event) => {
            takeTurn();
            this.player.x -= TILE_SIZE;
            console.log("right up!");
        });
        this.input.keyboard.on("keyup-UP", (event) => {
            takeTurn();
            this.player.y -= TILE_SIZE;

            console.log("down up!");
        });

        this.coin = this.physics.add.sprite(300, 200, "coin");

        this.score = 0;
        let style = { font: "20px Arial", fill: "#fff" };
        this.scoreText = this.add.text(20, 20, "score: " + this.score, style);

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

    hit() {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 200);

        this.score += 10;
        this.scoreText.setText("score: " + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
        });
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
        min: {
            width: 740,
            height: 360,
        },
        max: {
            width: 1280,
            height: 800,
        },
    },
    // …
};
new Phaser.Game(config4);
