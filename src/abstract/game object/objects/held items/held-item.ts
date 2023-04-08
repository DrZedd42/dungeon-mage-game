import { GameScene } from '../../../game scene/game-scene';
import { Sprite } from '../../../sprite/sprite';
import { GameObject } from '../../game-object';

export abstract class HeldItem extends GameObject {
    private wielder: GameObject;
    constructor(
        _x: number,
        _y: number,
        _scene: GameScene,
        _wielder: GameObject,
        _name: string
    ) {
        super(_x, _y, _scene);
        this.wielder = _wielder;
        let sprite = new Sprite(_name);
        this.setSprite(sprite);
        this.rotate(-135);
    }

    setWielder(_wielder: GameObject) {
        this.wielder = _wielder;
    }

    rotate(_rotation: number) {
        this.getSprite()!.setRotation(_rotation);
    }
}
