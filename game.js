import Phaser from "phaser";
import { CST } from "./src/objects/Constants";
// import { Enemies } from "./src/objects/Enemies";
import { Player } from "./src/objects/Player";
import { MapManager } from "./src/objects/Map";
import { EnemyManager } from "./src/objects/Enemies";
import { Utils, Random } from "./src/objects/Utilities";
import images from "./assets/*.png";
import tileset from "./assets/tileset/*.png";
import { TextSprite } from "phaser-ui-tools";

class mainScene {
    preload() {
        this.load.image("player", images.player);
        this.load.image("enemy_basic", images.enemy_basic);
        this.load.image("coin", images.coin);
        this.load.image("overworld-tiles", tileset.OverworldTileset_v03);
    }
    create() {
        //Set Scene debug mode
        this.debug = true;
        if (this.debug) console.log("DEBUG MODE");

        //Generate and Create Map
        let MAP = new MapManager(this);
        MAP.generateMap(CST.GRID_WIDTH, CST.GRID_LENGTH);
        const [map, layer] = MAP.createMap("overworld-tiles");

        if (this.debug) console.log(MAP.getMap());
        if (this.debug) console.log(MAP.getTileArray());

        //Create Enemies
        // const ENEMIES = new EnemyManager(this, MAP.getTileArray());
        //This adds enemies as sprites for now
        // ENEMIES.addEnemies(MAP.getTileArray());

        //Create Player
        const gridHalf = Math.floor(CST.GRID_WIDTH / 2);
        const playerStartX = gridHalf * CST.TILE_SIZE;
        const playerStartY = CST.GRID_LENGTH * CST.TILE_SIZE - CST.TILE_SIZE;
        this.player = this.add.player(playerStartX, playerStartY);
        //Set Player debug mode
        this.player.debug = true;

        let actionsTillTurn = 2;
        let isTurn = false;

        //Create UI

        this.add.text(
            CST.WINDOW_WIDTH / 2 + CST.TILE_SIZE * 2.5,
            CST.TILE_SIZE,
            "UI OVER HERE"
        );
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
        //NOTE:
        /*
        Do statemachine for controls
        Default: can move, can do spells, etc
        Aiming (spells): can attempt to use spell (click on a square) or can cancel 
        Inventory: managing shit
        Menu: of any kind. select shit or exit menu. cant move, etc.
        */
        // const movePlayer = this.player.getAction("move");
        // movePlayer(this.player, { row: 1 });

        this.input.keyboard.on("keyup-RIGHT", (event) => {
            if (this.debug) console.log("right up!");

            // takeTurn();
            // this.player.x += CST.TILE_SIZE;
            // console.log(this.player.width, this.player.displayWidth);
            this.player.moveEnt({ cols: 1 });
        });
        this.input.keyboard.on("keyup-DOWN", (event) => {
            if (this.debug) console.log("down up!");
            // takeTurn();
            // this.player.y += CST.TILE_SIZE;
            this.player.moveEnt({ rows: 1 });
        });
        this.input.keyboard.on("keyup-LEFT", (event) => {
            if (this.debug) console.log("right up!");
            // takeTurn();
            // this.player.x -= CST.TILE_SIZE;
            this.player.moveEnt({ cols: -1 });
        });
        this.input.keyboard.on("keyup-UP", (event) => {
            if (this.debug) console.log("down up!");
            // takeTurn();
            // this.player.y -= CST.TILE_SIZE;
            this.player.moveEnt({ rows: -1 });
        });

        this.arrow = this.input.keyboard.createCursorKeys();
        console.log("Map Width: ", map.widthInPixels);
        console.log("Player X Y: ", this.player.x, this.player.y);
        console.log("Player col row: ", this.player.col, this.player.row);

        const camera = this.cameras.main;
        this.cameras.main
            // .setZoom(1.5)
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
