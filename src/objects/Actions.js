class Action {
    constructor({
        effect,
        enabled = true,
        ammo,
        name,
        id = "",
        description = "",
    }) {
        this.name = name;
        this.description = description;
        this.enabled = enabled;
        this.currentAmmo = ammo; //should have a way to do infinite, maybe a const enum string of "infinite", or -1 is infinite
        this.effect = effect;
    }
}
function effect_moveUp(entity, { tiles = 1 }) {
    entity.row += tiles;
}

const action_MoveUp = new Action({
    effect: effect_moveUp,
    name: "moveup",
    description: "Move X tiles up.",
    enabled: true,
    currentAmmo: -1,
});
function effect_move(entity, { cols, rows }) {
    if (rows) entity.row += rows;
    if (cols) entity.col += cols;
}

const action_Move = new Action({
    effect: effect_move,
    name: "move",
    description: "Move N tiles in XY direction.",
    enabled: true,
    currentAmmo: -1,
});

export { action_Move };
