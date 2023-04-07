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
        this.onPreUpdate.push(() => {
            this.setPosition(
                this.wielder.getPosition().x,
                this.wielder.getPosition().y
            );
        });
        let sprite = new Sprite(_name);
        sprite.setDimension(16, 16);
        this.setSprite(sprite);
    }

    setWielder(_wielder: GameObject) {
        this.wielder = _wielder;
    }
}
