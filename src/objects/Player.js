import Phaser from "phaser";
import { Entity } from "./Entity";
import { CST } from "./Constants";
// import { action_Move } from "./Actions";
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
// class Tile extends Phaser.GameObjects.Sprite {
//     constructor(scene, x, y, texture, frame, tileType) {
//         super(scene, x, y, texture, frame);
//         scene.add.existing(this);
//         // scene.sys.updateList.add(this);
//         // scene.sys.displayList.add(this);
//     }
// }
class Player extends Entity {
    constructor(scene, x, y, textureName = CST.IMGS.KEYS.PLAYER, frame) {
        super(scene, x, y, textureName);
        // this.addAction(action_Move);
        this.state = new DefaultState();
        // this.equipment = new Gun();
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

    update() {
        this.state.update(this);
    }
    //we would have to call this create() function if we didnt add Player to the Factory
    create() {
        // 3.2 add to scene
        // scene.add.existing(this);
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

class PlayerState {
    constructor() {}

    handleInput(player, input) {
        if (input == PRESS_DOWN) {
            return new DuckingState();
        }

        return null;
    }

    update(player) {}

    static standing = "standing";
    static ducking = "ducking";
    static jumping = "jumping";
    static diving = "diving";
}

class OnGroundState extends PlayerState {
    static handleInput(player, input) {
        if (input == PRESS_B) {
            //jump
        } else if (input == PRESS_DOWN) {
            // duck
        }
    }
}

class DuckingState extends OnGroundState {
    constructor() {
        this.chargeTime = 0;
    }

    handleInput(player, input) {
        if (input == RELEASE_DOWN) {
            return new StandingState();
        } else {
            OnGroundState.handleInput(player, input);
        }
    }

    update(player) {
        this.chargeTime += 1;
        if (this.chargeTime > MAX_CHARGE) {
            player.superBomb();
        }
    }
}

class StandingState extends PlayerState {
    constructor() {}

    handleInput(player, input) {
        if (input == PRESS_B) {
            player.state = PlayerState.jumping;
        }
    }

    update(player) {
        this.velocityY = JUMP_VELOCITY;
    }

    enter(player) {
        player.setGraphics(IMAGE_JUMP);
    }
}
class DefaultState extends PlayerState {
    constructor() {
        super();
    }

    handleInput(player, input) {
        if (input == PRESS_B) {
            player.state = PlayerState.jumping;
        }
    }

    update(player) {
        this.velocityY = JUMP_VELOCITY;
    }

    // enter(player) {
    //     player.setGraphics(IMAGE_JUMP);
    // }
}

class JumpingState {
    constructor(player) {
        // apply initial up velocity to player
    }

    handleInput(player, input) {}

    update(player) {
        if (player.isOnGround()) {
            return new StandingState();
        } else {
            player.applyForce(GRAVITY);
        }
    }
}
