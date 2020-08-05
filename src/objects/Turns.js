import Phaser from "phaser";
import { Entity } from "./Entity";
import { CST } from "../objects/Constants";
import { TILE_TYPE } from "./Map";
import { Utils, Random } from "./Utilities";

const template = {};
const basic = {
    sprite: null,
    health: 100,
    attack: 10,
};
// class Tile extends Phaser.GameObjects.Sprite {
//     constructor(scene, x, y, texture, frame, tileType) {
//         super(scene, x, y, texture, frame);
//         scene.add.existing(this);
//         // scene.sys.updateList.add(this);
//         // scene.sys.displayList.add(this);
//     }
// }

class Action {
    constructor({ entity, cost }) {
        this.entity = entity;
        this.cost = cost;
    }
}
class ActionMoveLeft extends Action {
    constructor({ entity, cost }) {
        super({ entity, cost });
    }
    do() {
        this.entity.this.entity.currentAP -= this.cost;
        this.entity.moveByGrid({ col: -1, row: 0 });
    }
}
const action = {
    enabled: false,
    activate: function () {},
};
//Maybe Enemies tracks and manages all the Enemy instances?
class TurnManager {
    constructor(scene, map = [], player, enemies) {
        this.scene = scene;
        this.map = map;
        this.player = player;
        this.enemies = enemies;
    }
    create(type, number, x, y) {
        const enemyType = ENEMY_TYPES[type];
        const enemy = new enemyType();

        this.scene.add.enemy(enemy);
        return enemy;
    }
    //idk if this is the best way
    playerAction({ action, cost, targets = [] }) {
        if (cost <= this.player.currentAP) {
            action();
        } else {
            console.log("Not enough AP");
        }
    }
    playerTurn(map) {
        console.log("THE MAP", map);
        for (let row = 0; row < map.length; row++) {
            if (!this.enemiesArray[row]) {
                this.enemiesArray[row] = [];
            }
            for (let col = 0; col < map[row].length; col++) {
                if (map[row][col] === TILE_TYPE.ground && enemySeed <= 15) {
                }
            }
        }
        this.enemies.forEach((enemy) => {
            console.log(enemy);
            this.scene.add.existing(enemy);
        });
        return map;
    }
}

//Technically, we dont want an image key. we want an "object key" and then set the image key seperately based on enemy type
Phaser.GameObjects.GameObjectFactory.register(
    CST.IMGS.GAME_OBJECTS.ENEMY,
    function (x, y) {
        const enemy = new Enemy(this.scene, x, y);
        //for some reason this.add.existing doesn't work?
        // this.add.existing(enemy);
        this.displayList.add(enemy);
        this.updateList.add(enemy);

        return enemy;
    }
);

export { ENEMY_TYPES, ENEMY_SPRITE, EnemyManager };
