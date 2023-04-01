import {
    DirectionalInputProps,
    InputController,
    KeyInputProps,
} from '../abstract/input-controller';

export class PhaserKeyBoardInputContoller implements InputController {
    private scene: Phaser.Scene;
    private leftMoveKey: Phaser.Input.Keyboard.Key;
    private rightMoveKey: Phaser.Input.Keyboard.Key;
    private upMoveKey: Phaser.Input.Keyboard.Key;
    private downMoveKey: Phaser.Input.Keyboard.Key;

    constructor(_scene: Phaser.Scene) {
        this.scene = _scene;
        this.leftMoveKey = this.scene.input.keyboard.addKey('A');
        this.rightMoveKey = this.scene.input.keyboard.addKey('D');
        this.upMoveKey = this.scene.input.keyboard.addKey('W');
        this.downMoveKey = this.scene.input.keyboard.addKey('S');
    }

    getMovementDirection(): DirectionalInputProps {
        let horizontalDirection =
            Number(this.rightMoveKey.isDown) - Number(this.leftMoveKey.isDown);
        let verticalDirection =
            Number(this.downMoveKey.isDown) - Number(this.upMoveKey.isDown);

        let active =
            this.rightMoveKey.isDown ||
            this.leftMoveKey.isDown ||
            this.upMoveKey.isDown ||
            this.downMoveKey.isDown;

        return {
            active: active,
            degree:
                (Math.atan2(verticalDirection, horizontalDirection) * 180) /
                Math.PI,
        };
    }
    getFacingDirection(): DirectionalInputProps {
        throw new Error('Method not implemented.');
    }
    getAction(): KeyInputProps {
        throw new Error('Method not implemented.');
    }
    getInteraction(): KeyInputProps {
        throw new Error('Method not implemented.');
    }
    getStart(): KeyInputProps {
        throw new Error('Method not implemented.');
    }
}
