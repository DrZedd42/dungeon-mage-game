import { RectCollider } from '../../colliders/rect-collider';
import { Sprite } from '../../sprite/sprite';
import { GameObject } from '../game-object';

export class TestObject extends GameObject {
    constructor(_x: number, _y: number) {
        super(_x, _y);
        let sprite = new Sprite('testsprite');
        sprite.setDimension(50, 50);
        let collider = new RectCollider(
            this.getPosition().x,
            this.getPosition().y,
            20,
            20
        );
        this.setSprite(sprite);
        this.setCollider(collider);
    }
}
