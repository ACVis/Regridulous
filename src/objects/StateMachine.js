class StateMachinev1 {
    constructor(initialState, possibleStates, stateArgs = []) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;
        // State instances get access to the state machine via this.stateMachine.
        for (const state of Object.values(this.possibleStates)) {
            state.stateMachine = this;
        }
    }
    //handleInput can optionally return a state to switch to
    handleInput(input) {
        console.log("StateMachine handle input placeholder, passing: ", input);
        const state = this.possibleStates[this.state].handleInput(
            ...this.stateArgs,
            input
        );
        //Does StateMachine have a currentState?
        if (this.state === null) {
            this.state = this.initialState;
            this.possibleStates[this.state].enter(...this.stateArgs);
        }
        //If running handleInput returned a state
        if (state != null) {
            this.state = state;
            this.possibleStates[this.state].enter(...this.stateArgs);
        }

        this.possibleStates[this.state].handleInput(...this.stateArgs, input);
        // this.state.handleInput(input);
        // this.equipment.handleInput(input);
    }
    update() {
        // On the first step, the state is null and we need to initialize the first state.
        if (this.state === null) {
            this.state = this.initialState;
            this.possibleStates[this.state].enter(...this.stateArgs);
        }

        // Run the current state's execute
        this.possibleStates[this.state].update(...this.stateArgs);
    }

    transition(newState, ...enterArgs) {
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
    }
}

class StateMachine {
    constructor(initialState, stateList, { scene, subject } = {}) {
        this.scene = scene;
        this.subject = subject;
        this.state = this.newState(initialState);
        // this.stateArgs = stateArgs;

        // for (const state of Object.values(stateList)) {
        //     state.scene = scene;
        //     state.subject = subject;
        //     // State instances get access to the state machine via this.stateMachine.
        //     state.stateMachine = this;
        // }
    }
    newState(stateClass, optional = null) {
        const { scene, subject } = this;
        const state = new stateClass({
            scene,
            subject,
            stateMachine: this,
            optional,
        });
        return state;
    }
    handleInput(input) {
        console.log(
            "StateMachine handle input. Class: ",
            Object.getPrototypeOf(this.state).constructor.name,
            " Input: ",
            input
        );
        const state = this.state.handleInput(input);

        //handleInput can optionally return a state to switch to
        if (state != null) {
            this.state = state;
            this.state.enter(input);
        }

        // this.state.handleInput(input);
        // this.equipment.handleInput(input);
    }
    update() {
        // On the first step, the state is null and we need to initialize the first state.
        if (this.state === null) {
            this.state = this.newState(this.initialState);
            this.state.enter();
        }

        // Run the current state's execute
        this.state.update();
    }
    // I think transition is replaced by just passing instantiated States from some CONST list
    // transition(newState, ...enterArgs) {
    //     this.state = newState;
    //     this.state.enter(...this.stateArgs, ...enterArgs);
    // }
}

class State {
    //Put this constructor only the child classes?
    constructor({ scene, subject, stateMachine, optional }) {
        this.scene = scene;
        this.subject = subject;
        this.stateMachine = stateMachine;
        this.transition = stateMachine.newState;
    }
    enter() {}
    exit() {}
    handleInput() {}
    update() {}
}
class Statev1 {
    enter() {}
    handleInput() {}
    update() {}
    exit() {}
}

export { StateMachine, State };
