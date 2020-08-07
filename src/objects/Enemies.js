import Phaser from "phaser";
import { CST } from "../objects/Constants";
import { TILE_TYPE } from "./Map";
import { Utils, Random } from "./Utilities";
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
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureName = CST.IMGS.KEYS.ENEMY_BASIC, frame) {
        // var x = scene.player.x;
        // var y = scene.player.y - 16;

        super(scene, x, y, textureName);
        this.width = CST.TILE_SIZE;
        this.setOrigin(0, 0);
        // scene.physics.world.enableBody(this);
        // this.body.velocity.y = -250;

        // 4.2 add the beam to the projectiles group
        // scene.projectiles.add(this);
    }
    create() {
        // 3.2 add to scene
        scene.add.existing(this);
    }
    update() {
        //take turn
    }
    // spawn(){}
    // despawn(){} //destroy the enemy or deactivate
}
// Base enemy class would contain common methods and fields, variations would contain different stats, textures/animations and logic
class BasicEnemy extends Enemy {
    health = 100;
    attack = 10;
    sprite = "enemy_basic";
    constructor(scene, col, row, textureName = this.sprite, x, y) {
        x = x ? x : Utils.ColToX(col);
        y = y ? y : Utils.RowToY(row);
        super(scene, x, y, textureName);
        this.col = col;
        this.row = row;
        // console.log("col, row, x, y", col, row, x, y);
    }
}
const ENEMY_TYPES = Object.freeze({
    basic: BasicEnemy,
});
const ENEMY_SPRITE = Object.freeze({
    basic: "enemy_basic",
});

//Maybe Enemies tracks and manages all the Enemy instances?
class EnemyManager {
    constructor(scene, map = []) {
        this.scene = scene;
        this.map = map;
        this.enemiesArray = [];
        this.enemiesGroup = this.scene.add.group();
        this.enemies = [];
    }
    create(type, number, x, y) {
        const enemyType = ENEMY_TYPES[type];
        const enemy = new enemyType();

        this.scene.add.enemy(enemy);
        return enemy;
    }
    addEnemies(map) {
        if (this.debug) console.log("THE MAP", map);

        for (let row = 0; row < map.length; row++) {
            if (!this.enemiesArray[row]) {
                this.enemiesArray[row] = [];
            }
            for (let col = 0; col < map[row].length; col++) {
                // const enemySeed = Math.floor(Math.random() * 100);
                if (this.debug) console.log("Tile x,y", row, col);
                const enemySeed = Random.integer(1, 100);
                let isEnemy = false;
                let enemyType = null;

                if (map[row][col] === TILE_TYPE.ground && enemySeed <= 15) {
                    const x = Utils.ColToX(col);
                    const y = Utils.RowToY(row);
                    const enemyObject = {
                        col,
                        row,
                        sprite: ENEMY_SPRITE.basic,
                    };
                    const enemy = new BasicEnemy(
                        this.scene,
                        col,
                        row,
                        ENEMY_SPRITE.basic
                    );
                    // this.enemies.push(enemyObject);
                    // this.enemiesArray[row].push(enemyObject);
                    this.enemies.push(enemy);
                    this.enemiesArray[row].push(enemy);

                    // let newEnemy = this.enemies.create(
                    //     Utils.ColToX(col),
                    //     Utils.RowToY(row),
                    //     ENEMY_SPRITE.basic
                    // );
                    // newEnemy.setOrigin(0, 0);
                    // isEnemy = true;
                    // enemyType = "template";
                }
            }
        }
        this.enemies.forEach((enemy) => {
            if (this.debug) console.log(enemy);
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
