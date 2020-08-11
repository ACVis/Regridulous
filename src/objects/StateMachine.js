class StateMachine {
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
class StateMachinev2 {
    constructor(initialState, stateList, { scene, subject } = {}) {
        this.initialState = initialState;
        this.possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;

        for (const state of Object.values(this.stateList)) {
            this.possibleStates[state] = state(scene, subject);
        }
        // State instances get access to the state machine via this.stateMachine.
        for (const state of Object.values(this.stateList)) {
            state.stateMachine = this;
        }
    }
    //handleInput can optionally return a state to switch to
    handleInput(scene, subject, input) {
        console.log("StateMachine handle input placeholder, passing: ", input);
        const state = this.state.handleInput(input);

        if (state != null) {
            this.state = state;
            this.possibleStates[this.state].enter(...this.stateArgs);
        }

        this.state.handleInput(input);
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

class Statev2 {
    //Put this constructor on the child classes
    // constructor(scene, subject) {
    //     this.scene = scene;
    //     this.subject = subject;
    // }
    enter() {}
    handleInput() {}
    update() {}
    exit() {}
}
class State {
    enter() {}
    handleInput() {}
    update() {}
    exit() {}
}

export { StateMachine, State };
