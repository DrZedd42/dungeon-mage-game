import { GameScene } from './game-scene';
//@ts-ignore
import { InputController } from '../input-controller';

describe('Test GameScene', () => {
    test('Should throw error when getting input controller that does not exist', () => {
        let scene = new GameScene();
        expect(() => scene.getInputController()).toThrow();
    });

    test('Should not throw when getting input controller that is defined', () => {
        let scene = new GameScene();
        let inputController = {} as InputController;
        scene.setInputController(inputController);
        expect(() => scene.getInputController()).not.toThrow();
    });
});
