import { mainScene } from "../../game";
const TILE_SIZE = 16;
const GRID_WIDTH = 13;
const GRID_LENGTH = GRID_WIDTH * 2;

const GRID_PIXEL_WIDTH = GRID_WIDTH * TILE_SIZE;
const GRID_PIXEL_LENGTH = GRID_LENGTH * TILE_SIZE;

const CST = Object.freeze({
    TILE_SIZE,
    GRID_WIDTH,
    GRID_LENGTH,
    GRID_PIXEL_WIDTH,
    GRID_PIXEL_LENGTH,
    WINDOW_WIDTH: (GRID_WIDTH + 0) * TILE_SIZE * 2,
    WINDOW_HEIGHT: (GRID_LENGTH + 0) * TILE_SIZE,
    /* Could do either, or both of these:
    IMGS.KEYS.PLAYER
    or
    KEYS.IMGS.PLAYER
    */
    IMGS: {
        KEYS: {
            PLAYER: "player",
            ENEMY_BASIC: "enemy_basic",
        },
        GAME_OBJECTS: {
            ENEMY: "enemy",
        },
    },
    //Game configs
    CONFIGS: {
        config1: {
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
        },
        config2: {
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
        },
        //zoom/scaling info: https://phaser.discourse.group/t/help-with-scaling-for-pixel-art/4782/2
        //use scale manager zoom
        config3: {
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
        },
        //use camera zoom
        config4: {
            backgroundColor: "#3498db",
            scene: mainScene,
            physics: { default: "arcade" },
            parent: "game",
            pixelArt: true,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: (GRID_WIDTH + 0) * TILE_SIZE * 2,
                height: (GRID_LENGTH + 0) * TILE_SIZE,
                // width: 1024,
                // height: 768,
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
        },
    },
});

export { CST };
