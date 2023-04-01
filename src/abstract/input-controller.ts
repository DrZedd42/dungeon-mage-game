export interface KeyInputProps {
    down: boolean; // Should only be true only the first time the button is pressed until released
    press: boolean;
    up: boolean; // Should only be true the first time the button is released after it was pressed
}

export interface DirectionalInputProps {
    active: boolean;
    vector: { x: number; y: number };
}

export interface InputController {
    getMovementDirection(): DirectionalInputProps; // Direction at which the controlled instance is moving towards
    getFacingDirection(): DirectionalInputProps; // Direction at which the controlled instance is facing (also the direction where the player will swing their item at)
    getAction(): KeyInputProps; // Used to use items, swing weapon or press buttons
    getInteraction(): KeyInputProps; // Used to piuck up items, interact with objects in the game world (e.g NPCs, Furnace, ...)
    getStart(): KeyInputProps; // Used to pause the game
}
