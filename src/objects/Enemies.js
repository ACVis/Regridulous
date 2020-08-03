import Phaser from "phaser";
import { CST } from "../objects/Constants";
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
    constructor(scene, x, y, textureName) {
        super(scene, x, y, textureName);
    }
}
const enemyTypes = Object.freeze({
    basic: BasicEnemy,
});

//Maybe Enemies tracks and manages all the Enemy instances?
class EnemyManager {
    constructor(scene, map = []) {
        this.scene = scene;
        this.map = map;
    }
    create(type, number, x, y) {
        const enemyType = enemyTypes[type];
        const enemy = new enemyType();

        this.scene.add.enemy(enemy);
        return enemy;
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

export { enemyTypes, EnemyManager };
