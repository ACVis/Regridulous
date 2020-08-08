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

        //Set default state for controls
        this.controlState = "STATE_DEFAULT";

        //Temp turn variables
        let actionsTillTurn = 2;
        let isTurn = false;

        //Create UI

        this.add.text(
            CST.WINDOW_WIDTH / 2 + CST.TILE_SIZE * 2.5,
            CST.TILE_SIZE,
            "UI OVER HERE"
        );

        //NOTE:
        /*
        Do statemachine for controls
        Default: can move, can do spells, etc
        Aiming (spells): can attempt to use spell (click on a square) or can cancel 
        Inventory: managing shit
        Menu: of any kind. select shit or exit menu. cant move, etc.
        */

        this.arrow = this.input.keyboard.createCursorKeys();
        console.log("Map Width: ", map.widthInPixels);
        console.log("Player X Y: ", this.player.x, this.player.y);
        console.log("Player col row: ", this.player.col, this.player.row);

        //Setup cameras
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
        // if the functions are creating the .on() type, then you're creating a new listener on every uipdate cycle
        switch (this.controlState) {
            case "STATE_DEFAULT":
                this.defaultState();
                break;

            case "STATE_AIMING":
                if (input == PRESS_DOWN) {
                    state_ = STATE_DIVING;
                    setGraphics(IMAGE_DIVE);
                }
                break;

            case "STATE_MENU":
                if (input == RELEASE_DOWN) {
                    state_ = STATE_STANDING;
                    setGraphics(IMAGE_STAND);
                }
                break;
            default:
                console.log("DEFAULT?");
        }

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
    defaultState() {
        // this.input.keyboard.on("keyup-RIGHT", (event) => {
        //     // this.takeTurn();
        //     this.player.x += CST.TILE_SIZE;
        //     console.log(this.player.width, this.player.displayWidth);

        //     console.log("right up!");
        // });
        // this.input.keyboard.on("keyup-DOWN", (event) => {
        //     // this.takeTurn();
        //     this.player.y += CST.TILE_SIZE;

        //     console.log("down up!");
        // });
        // this.input.keyboard.on("keyup-LEFT", (event) => {
        //     // this.takeTurn();
        //     this.player.x -= CST.TILE_SIZE;
        //     console.log("right up!");
        // });
        // this.input.keyboard.on("keyup-UP", (event) => {
        //     // this.takeTurn();
        //     this.player.y -= CST.TILE_SIZE;

        //     console.log("down up!");
        // });
        if (this.arrow.up.isDown) {
            // this.takeTurn();
            this.player.x += CST.TILE_SIZE;
            console.log(this.player.width, this.player.displayWidth);

            console.log("right up!");
        } else if (this.arrow.down.isDown) {
            // this.takeTurn();
            this.player.y += CST.TILE_SIZE;

            console.log("down up!");
        } else if (this.arrow.left.isDown) {
            // this.takeTurn();
            this.player.x -= CST.TILE_SIZE;
            console.log("right up!");
        } else if (this.arrow.up.isDown) {
            // this.takeTurn();
            this.player.y -= CST.TILE_SIZE;

            console.log("down up!");
        }

        this.input.mouse.disableContextMenu();

        // this.input.on("pointerup", function (pointer) {
        //     if (pointer.leftButtonReleased()) {
        //         console.log("Left Button was released");
        //     } else if (pointer.rightButtonReleased()) {
        //         console.log("Right Button was released");
        //     } else if (pointer.middleButtonReleased()) {
        //         console.log("Middle Button was released");
        //     } else if (pointer.backButtonReleased()) {
        //         console.log("Back Button was released");
        //     } else if (pointer.forwardButtonReleased()) {
        //         console.log("Forward Button was released");
        //     }
        // });
    }
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
    takeTurn() {
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
}

// export { mainScene };
new Phaser.Game(Object.assign(CST.CONFIGS.config4, { scene: mainScene }));
