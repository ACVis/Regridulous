import Phaser from "phaser";
import { CST } from "./src/objects/Constants";
// import { Enemies } from "./src/objects/Enemies";
import { Player } from "./src/objects/Player";
import { MapManager } from "./src/objects/Map";
import { EnemyManager } from "./src/objects/Enemies";
import { Utils, Random } from "./src/objects/Utilities";
import images from "./assets/*.png";
import tileset from "./assets/tileset/*.png";

class mainScene {
    preload() {
        this.load.image("player", images.player);
        this.load.image("enemy_basic", images.enemy_basic);
        this.load.image("coin", images.coin);
        this.load.image("overworld-tiles", tileset.OverworldTileset_v03);
    }
    create() {
        //Generate and Create Map
        let MAP = new MapManager(this);
        MAP.generateMap(CST.GRID_WIDTH, CST.GRID_LENGTH);
        const [map, layer] = MAP.createMap("overworld-tiles");
        console.log(MAP.getMap());
        console.log(MAP.getTileArray());

        //Create Enemies
        const ENEMIES = new EnemyManager(this, MAP.getTileArray());
        //This adds enemies as sprites for now
        ENEMIES.addEnemies(MAP.getTileArray());

        //Create Player
        const playerStartX = Math.ceil(CST.GRID_WIDTH / 2) * CST.TILE_SIZE;
        const playerStartY = CST.GRID_LENGTH * CST.TILE_SIZE - CST.TILE_SIZE;
        this.player = this.add.player(playerStartX, playerStartY);

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
// export { mainScene };
new Phaser.Game(Object.assign(CST.CONFIGS.config4, { scene: mainScene }));
