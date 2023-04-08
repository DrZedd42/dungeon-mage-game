import { RectCollider } from '../../colliders/rect-collider';
import { GameScene } from '../../game scene/game-scene';
import { Sprite } from '../../sprite/sprite';
import { GameObject } from '../game-object';
import { HeldItem } from './held items/held-item';
import { GoldSword } from './held items/weapons/all/gold-sword';

export class Player extends GameObject {
    private heldItem: HeldItem | undefined;
    private sprites = {
        run: new Sprite('little_mage_run'),
        idle: new Sprite('little_mage_idle'),
    };

    constructor(_x: number, _y: number, _scene: GameScene) {
        super(_x, _y, _scene);
        let sprite = this.sprites.run;
        let collider = new RectCollider(
            this.getPosition().x,
            this.getPosition().y,
            20,
            20
        );
        this.setSprite(sprite);
        this.setCollider(collider);
        this.onPreUpdate.push(this.move);
        this.setHeldItem(
            new GoldSword(
                this.getPosition().x,
                this.getPosition().y,
                this.getRelatedScene()
            )
        );
        this.positionHeldItem(false);
    }

    positionHeldItem(_facingLeft: boolean) {
        if (this.heldItem) {
            this.heldItem.setPosition(
                this.getPosition().x + (_facingLeft ? 1 : -1),
                this.getPosition().y + 2
            );
            this.heldItem.rotate(_facingLeft ? 110 : -110);
        }
    }

    move(delta: number) {
        let input = this.getRelatedScene().getInputController();
        if (input.getMovementDirection().active) {
            let facingLeft =
                input.getMovementDirection().degree < -90 ||
                input.getMovementDirection().degree > 90;
            this.setSprite(this.sprites.run, true);
            this.moveTowardsDirection(
                input.getMovementDirection().degree,
                0.2 * delta,
                'degree'
            );

            this.positionHeldItem(facingLeft);

            if (this.getSprite()) {
                this.getSprite()!.setScale(facingLeft ? -1 : 1, 1);
            }
        } else {
            this.setSprite(this.sprites.idle, true);
        }
    }

    setHeldItem(_heldItem: HeldItem) {
        this.heldItem = _heldItem;
        if (this.heldItem) {
            this.getRelatedScene().add(this.heldItem);
            this.heldItem.getSprite()?.setDepthOffset(10);
        }
    }
}
