// Does Turn system need to be global or a mixin or both?
//Turn should probably be a global singleton, keeps track of if it's our turn or the enemies and which specific enemy
//When we end turn, it will handle the repercussions and give us who is next
class Turn {
    turnOrder = []; //who's in line

    action(apcost) {} //this would only apply to current player
    endTurn(entity) {
        //ending player turn or enemy X turn
    }
    whose() {} //this could also be current(), as in whose turn is it currently
    whoIsNext(number) {} //maybe we can check who's in line up to X amount
}
const Turns = new Turn(); //create the only instance
export { Turns };

//or make this just an object with functions (that can still use "this")
class ActionsComponent {
    currentAP;
    APcharge; // Action points gained per turn
    MaxAP; //Max amount of Action Points allowed to bank
    constructor() {}
    takeAction() {}
    useActionPoints(quantity) {}
    bank() {
        //add to currentAP
    }
    endTurn() {}
}
const Actions = new Actions();

class Player {
    constructor() {
        Object.assign(this, Actions);
    }
    update() {
        if (true /*we do an action*/) {
            this.takeAction();
        }
    }
}
