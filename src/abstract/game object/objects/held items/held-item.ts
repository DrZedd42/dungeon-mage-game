import { GameScene } from '../../../game scene/game-scene';
import { Sprite } from '../../../sprite/sprite';
import { GameObject } from '../../game-object';

export abstract class HeldItem extends GameObject {
    constructor(_x: number, _y: number, _scene: GameScene, _name: string) {
        super(_x, _y, _scene);
        let sprite = new Sprite(_name);
        this.setSprite(sprite);
    }

    rotate(_rotation: number) {
        this.getSprite()!.setRotation(_rotation);
    }
}
