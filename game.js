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

class State {
    name = "DefaultState";
    constructor({ debug = false } = {}) {
        this.debug = debug;
    }

    handleInput(subject, input) {}

    update(subject) {}

    enter(subject) {
        if (this.debug) {
            console.log("Entered " + this.name ? this.name : "Unnamed State");
        }
    }
    exit() {}
}

class DefaultState extends State {
    handleInput(keyevent) {
        this.player.handleInput(keyevent);
        // console.log("this in handleInput", this);
        // const { code } = keyevent;

        // if (code === "ArrowRight") {
        //     // this.takeTurn();
        //     this.player.x += CST.TILE_SIZE;
        //     console.log(this.player.width, this.player.displayWidth);

        //     console.log("right up!");
        // } else if (code === "ArrowDown") {
        //     // this.takeTurn();
        //     this.player.y += CST.TILE_SIZE;

        //     console.log("down up!");
        // } else if (code === "ArrowLeft") {
        //     // this.takeTurn();
        //     this.player.x -= CST.TILE_SIZE;
        //     console.log("right up!");
        // } else if (code === "ArrowUp") {
        //     // this.takeTurn();
        //     this.player.y -= CST.TILE_SIZE;

        //     console.log("down up!");
        // }
    }
}
class mainScene {
    constructor() {
        this.state = new DefaultState();
    }
    handleInput(input) {
        const state = this.state.handleInput(input);

        if (state != null) {
            this.state = state;
            this.state.enter(this);
        }

        this.state.handleInput(input);
        // this.equipment.handleInput(input);
    }
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
        const ENEMIES = new EnemyManager(this, MAP.getTileArray());
        //This adds enemies as sprites for now
        ENEMIES.addEnemies(MAP.getTileArray());

        //Create Player
        const gridHalf = Math.floor(CST.GRID_WIDTH / 2);
        const playerStartX = gridHalf * CST.TILE_SIZE;
        const playerStartY = CST.GRID_LENGTH * CST.TILE_SIZE - CST.TILE_SIZE;
        this.player = this.add.player(playerStartX, playerStartY);
        //Set Player debug mode
        this.player.debug = true;

        //Set default state for controls
        this.controlState = "STATE_DEFAULT";

        this.input.keyboard.on("keyup", (event) => {
            console.dir(event);
            this.handleInput(event);
        });

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
        this.state.update(this);
        // if the functions are creating the .on() type, then you're creating a new listener on every uipdate cycle
        // switch (this.controlState) {
        //     case "STATE_DEFAULT":
        //         this.defaultState();
        //         break;
        //     case "STATE_AIMING":
        //         if (input == PRESS_DOWN) {
        //             state_ = STATE_DIVING;
        //             setGraphics(IMAGE_DIVE);
        //         }
        //         break;
        //     case "STATE_MENU":
        //         if (input == RELEASE_DOWN) {
        //             state_ = STATE_STANDING;
        //             setGraphics(IMAGE_STAND);
        //         }
        //         break;
        //     default:
        //         console.log("DEFAULT?");
        // }
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
}

// export { mainScene };
new Phaser.Game(Object.assign(CST.CONFIGS.config4, { scene: mainScene }));
