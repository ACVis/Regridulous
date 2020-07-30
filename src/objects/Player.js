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
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureName = CST.IMGS.KEYS.PLAYER, frame) {
        // var x = scene.player.x;
        // var y = scene.player.y - 16;
        super(scene, x, y, textureName);

        // this.player.width = CST.TILE_SIZE;
        // this.player.setOrigin(0, 0);
        this.width = CST.TILE_SIZE;
        this.setOrigin(0, 0);
        // scene.physics.world.enableBody(this);
        // this.body.velocity.y = -250;
        // 4.2 add the beam to the projectiles group
        // scene.projectiles.add(this);
    }
    //we would have to call this create() function if we didnt add Player to the Factory
    create() {
        // 3.2 add to scene
        // scene.add.existing(this);
    }
    update() {
        //take turn
    }
    // spawn(){}
    // despawn(){} //destroy the enemy or deactivate
}
//Normally, in the main scene, you would have to write:
// const player = new Player(this, whateverX, whateverY)
// this.add.existing(player)
//Since we're adding this to the Factory all we have to do is the below:
// const player = this.add.player(whateverX, whateverY);
Phaser.GameObjects.GameObjectFactory.register(CST.IMGS.KEYS.PLAYER, function (
    x,
    y
) {
    const player = new Player(this.scene, x, y);
    //for some reason this.add.existing doesn't work?
    // this.add.existing(player);
    this.displayList.add(player);
    this.updateList.add(player);

    return player;
});
