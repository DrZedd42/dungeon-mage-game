import { InputController } from '../input-controller';
import { Updater } from '../updater';

/*
    Extend this class when you create a new game scene
*/

export abstract class GameScene extends Updater {
    protected inputController: InputController | undefined;

    constructor() {
        super();
    }

    setInputController(_inputController: InputController) {
        this.inputController = _inputController;
    }
}
