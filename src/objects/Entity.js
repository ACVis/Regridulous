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

        this.debug = false;

        this.width = CST.TILE_SIZE;
        this.setOrigin(0, 0);

        this.col = Utils.XtoCol(x);
        this.row = Utils.YtoRow(y);
        // this.actionList = [];
        // scene.physics.world.enableBody(this);
        // this.body.velocity.y = -250;
    }
    moveByCR({ cols = 0, rows = 0 }) {
        this.col += cols;
        this.row += rows;
        this.x = Utils.ColToX(this.col);
        this.y = Utils.RowToY(this.row);

        if (this.debug) console.log("moveByCR: ", cols, rows);
    }
    moveByXY({ x = 0, y = 0 }) {
        this.x += x;
        this.y += y;
        this.col += Utils.XtoCol(x);
        this.row += Utils.YtoRow(y);
        if (this.debug) console.log("moveByXY: ", x, y);
    }
    moveEnt({ cols = 0, rows = 0, x = 0, y = 0 }) {
        if (this.debug) console.log("moveByEnt: ", arguments);
        if (this.debug)
            console.log(
                "Before Move x,y,col,row: ",
                this.x,
                this.y,
                this.col,
                this.row
            );
        if (cols || rows) {
            this.moveByCR({ cols, rows });
        } else if (x || y) {
            this.moveByXY({ x, y });
        } else {
            console.log("Warn: No direction passed to move()");
        }
        if (this.debug)
            console.log(
                "After Move x,y,col,row: ",
                this.x,
                this.y,
                this.col,
                this.row
            );
    }
    /// V V V ACTION PROTOTYPING V V V///////////////
    // do(effect, args, entity = this) {
    //     effect(entity, args);
    // }
    // getActionList() {
    //     return this.actionList;
    // }
    // getAction(name) {
    //     return this.actionList.find((item) => item.name === name);
    // }
    // addAction(action) {
    //     //TODO:should probably check if it's already in list. if it is, add more of same?
    //     this.actionList.push(action);
    //     console.log("addAction is UNFINISHED");
    // }
    // removeAction(action) {
    //     //should we be doing this by name or id? otherwise we have to deep-match objects?
    //     console.log("REMOVE ACTION IS NOT IMPLEMENTED");
    // }
    //we would have to call this create() function if we didnt add Player to the Factory
    /// ^^^ ACTION PROTOTYPING ^^^///////////////
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
