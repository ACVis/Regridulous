import Phaser from "phaser";
import { CST } from "./src/objects/Constants";
// import { Enemies } from "./src/objects/Enemies";
import { Player } from "./src/objects/Player";
import { MapManager } from "./src/objects/Map";
import { EnemyManager } from "./src/objects/Enemies";
import { Utils, Random } from "./src/objects/Utilities";
import { StateMachine, State } from "./src/objects/StateMachine";
import images from "./assets/*.png";
import tileset from "./assets/tileset/*.png";
import { TextSprite } from "phaser-ui-tools";

// class State {
//     name = "DefaultControlState";
//     constructor({ debug = false } = {}) {
//         this.debug = debug;
//     }

//     handleInput(subject, input) {}

//     update(subject) {}

//     enter(subject) {
//         if (this.debug) {
//             console.log("Entered " + this.name ? this.name : "Unnamed State");
//         }
//     }
//     exit() {}
// }

class DefaultControlState extends State {
    constructor(config) {
        super(config);
    }
    handleInput = (keyevent) => {
        this.subject.handleInput(keyevent);

        if ("activates menu somehow") {
            this.transition(STATE_LIST.menu);
        }
    };
    update() {
        this.subject.update();
    }
}
class InventoryControlState extends State {
    handleInput(keyevent) {}
    update() {}
}
class MenuControlState extends State {
    handleInput(keyevent) {}
    update() {}
}
const STATE_LIST = {
    default: DefaultControlState,
    inventory: InventoryControlState,
    menu: MenuControlState,
};

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
        this.map = map;
        this.mapLayer = layer;
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
        this.ControlState = new StateMachine(STATE_LIST.default, STATE_LIST, {
            scene: this,
            subject: this.player,
        });

        //Could probably provide accessor functions, getters on actual player class and contain the statemachine there
        // this.PlayerState = new StateMachine("", {}, [this, this.player]);

        this.input.keyboard.on("keyup", (event) => {
            console.dir(event);
            this.ControlState.handleInput(event);
        });
        this.input.on("pointerup", (pointer) => {
            if (this.debug) console.log("Pointer Event: ", pointer);
            this.ControlState.handleInput(pointer);
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
        });
        // Handle Turns/Actions?

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
        if (this.debug) console.log("Map Width: ", map.widthInPixels);
        if (this.debug)
            console.log("Player X Y: ", this.player.x, this.player.y);
        if (this.debug)
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
        this.ControlState.update();
    }
}

// export { mainScene };
new Phaser.Game(Object.assign(CST.CONFIGS.config4, { scene: mainScene }));
