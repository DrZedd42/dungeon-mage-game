import { Collider } from '../colliders/collider';
import { GameScene } from '../game scene/game-scene';
import { Sprite } from '../sprite/sprite';
import { Updateable } from '../updateable';
import { v4 as uuidv4 } from 'uuid';

/*
    Extend this class when you create a new game object
*/

export class GameObject extends Updateable {
    private x: number;
    private y: number;
    private previousX: number;
    private previousY: number;
    private collider: Collider | undefined;
    private sprite: Sprite | undefined;
    private scene: GameScene;
    private uuid: string;

    constructor(_x: number, _y: number, _scene: GameScene) {
        super();
        this.x = _x;
        this.y = _y;
        this.previousX = this.x;
        this.previousY = this.y;
        this.scene = _scene;
        this.addToPersistentPreUpdate(this.updatePreviousPosition);
        this.uuid = uuidv4();
        return this;
    }

    public getUUID() {
        return this.uuid;
    }

    getRelatedScene() {
        return this.scene;
    }

    setCollider(_collider: Collider) {
        this.collider = _collider;
        this.collider.setPosition(this.getPosition().x, this.getPosition().y);
        return this;
    }

    getCollider() {
        return this.collider;
    }

    setSprite(_sprite: Sprite, _overwriteFields = false) {
        let oldSprite = this.sprite;
        this.sprite = _sprite;
        if (_overwriteFields && oldSprite) {
            this.sprite.setDimension(
                oldSprite.getDimension().width,
                oldSprite.getDimension().height
            );
            this.sprite.setOffset(
                oldSprite.getOffset().offsetX,
                oldSprite.getOffset().offsetY
            );
            this.sprite.setScale(
                oldSprite.getScale().scaleX,
                oldSprite.getScale().scaleY
            );
        }
        this.sprite.setPosition(this.getPosition().x, this.getPosition().y);
        return this;
    }

    getSprite() {
        return this.sprite;
    }

    private updatePreviousPosition() {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    public setPosition(_x: number, _y: number) {
        this.addToTemporaryUpdate(() => {
            this.x = _x;
            this.y = _y;
            if (this.sprite) {
                this.sprite.setPosition(_x, _y);
            }
            if (this.collider) {
                this.collider.setPosition(_x, _y);
            }
        });
        return this;
    }

    public moveTowardsDirection(
        _degree: number,
        _distance: number,
        _angleType: 'radians' | 'degree'
    ) {
        let angle: number = _degree;

        if (_angleType === 'degree') {
            // if degree is provided we need to convert to radians in order to use Math-functions
            angle = (_degree * Math.PI) / 180;
        }

        let stepX = Math.cos(angle);
        let stepY = Math.sin(angle);
        if (Math.abs(stepY) <= Number.EPSILON) {
            stepY = 0;
        }
        if (Math.abs(stepX) <= Number.EPSILON) {
            stepX = 0;
        }

        this.setPosition(
            this.x + stepX * _distance,
            this.y + stepY * _distance
        );
    }

    public getPreviousPosition() {
        return { x: this.previousX, y: this.previousY };
    }

    public getPosition() {
        return { x: this.x, y: this.y };
    }
}
