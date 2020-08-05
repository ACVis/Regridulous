import Phaser from "phaser";
import { CST } from "../objects/Constants";
import { Utils } from "./Utilities";
const statMixin = {
    Health: 100,
    Defense: 10,
    Dodge: 0,
    // Action points gained per turn
    APcharge: 4,
    //Max amount of Action Points allowed to bank
    MaxAP: 16,
    //These are SUBTRACTED from stats upon evaluation/use of player stats
    //A Bebuff Type would extend the Stat type, but add a ap/turn duration
    //these would be added and subtracted, having a action/turn based effect lifetime
    debuffs: [],
    //These are ADDED from stats upon evaluation/use of player stats
    //A Buff Type would extend the Stat type, but add a ap/turn duration
    //these would be added, having a action/turn based effect lifetime
    buffs: [],
    //these are more permanent effects, not based on time, their effects can be both negative and positive in one mod
    //example- Mechanical Arms: give you extra attack damage, but reduce your APrecharge per turn by 1
    mods: [],
};
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
//Maybe add actions to base entity?
/*
const action = {
    enabled: false,
    usesLeft: 0,
    action(entity) {

    }
}
*/
//or do we just have to code the methods onto the class? Or does the action need to be created seperately and added?
class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureName, frame) {
        super(scene, x, y, textureName);

        this.width = CST.TILE_SIZE;
        this.setOrigin(0, 0);

        this.col = Utils.XtoCol(x);
        this.row = Utils.YtoRow(y);
        // scene.physics.world.enableBody(this);
        // this.body.velocity.y = -250;
    }
    moveByGrid({ col, row }) {
        this.col += col;
        this.row += row;
        this.x = Utils.ColToX(this.col);
        this.y = Utils.RowToY(this.row);
    }
    //we would have to call this create() function if we didnt add Player to the Factory
    // create() {
    // 3.2 add to scene
    // scene.add.existing(this);
    // }
    // update() {
    //take turn
    // }
    // spawn(){}
    // despawn(){} //destroy the enemy or deactivate
}

export { Entity };
