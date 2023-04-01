import { InputController } from '../input-controller';
import { Updater } from '../updater';

/*
    Extend this class when you create a new game scene
*/

export class GameScene extends Updater {
    protected inputController: InputController | undefined;

    constructor() {
        super();
    }

    setInputController(_inputController: InputController) {
        this.inputController = _inputController;
    }

    getInputController() {
        if (!this.inputController) {
            throw new Error(
                'Trying to access an input controller of a scene where the input controller has not been set yet.'
            );
        }
        return this.inputController;
    }
}
