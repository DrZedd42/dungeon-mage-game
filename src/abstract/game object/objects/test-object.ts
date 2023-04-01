import { RectCollider } from '../../colliders/rect-collider';
import { GameScene } from '../../game scene/game-scene';
import { Sprite } from '../../sprite/sprite';
import { GameObject } from '../game-object';

export class TestObject extends GameObject {
    constructor(_x: number, _y: number, _scene: GameScene) {
        super(_x, _y, _scene);
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
        this.onPreUpdate.push(this.move);
    }

    move(delta: number) {
        let input = this.getRelatedScene().getInputController();
        if (input.getMovementDirection().active) {
            this.moveTowardsDirection(
                input.getMovementDirection().degree,
                1 * delta,
                'degree'
            );
        }
    }
}
