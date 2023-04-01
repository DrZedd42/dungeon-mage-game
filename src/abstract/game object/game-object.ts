import { Collider } from '../colliders/collider';
import { GameScene } from '../game scene/game-scene';
import { Sprite } from '../sprite/sprite';
import { Updateable } from '../updateable';

/*
    Extend this class when you create a new game object
*/

export abstract class GameObject extends Updateable {
    private x: number;
    private y: number;
    private previousX: number;
    private previousY: number;
    private collider: Collider | undefined;
    private sprite: Sprite | undefined;
    private scene: GameScene;
    public onPostUpdate: Array<Function> = [];
    public onPreUpdate: Array<Function> = [];

    constructor(_x: number, _y: number, _scene: GameScene) {
        super();
        this.x = _x;
        this.y = _y;
        this.previousX = this.x;
        this.previousY = this.y;
        this.scene = _scene;
        if (this.collider) {
            this.collider.setPosition(_x, _y);
        }
        return this;
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

    setSprite(_sprite: Sprite) {
        this.sprite = _sprite;
        this.sprite.setPosition(this.getPosition().x, this.getPosition().y);
        return this;
    }

    getSprite() {
        return this.sprite;
    }

    // update event system pre-update -> updates -> post-update
    update(_delta: number | undefined) {
        this.updatePreviousPosition();
        if (this.onPreUpdate) {
            this.onPreUpdate.forEach((onPreUpdateFunction) =>
                onPreUpdateFunction.bind(this)(_delta)
            );
        }
        while (!this.checkUpdatesEmpty()) {
            let func: Function = this.getNextUpdate();
            func.bind(this)(_delta);
        }
        if (this.onPostUpdate) {
            this.onPostUpdate.forEach((onPostUpdateFunction) =>
                onPostUpdateFunction.bind(this)(_delta)
            );
        }
    }

    private updatePreviousPosition() {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    public setPosition(_x: number, _y: number) {
        this.addToUpdate(() => {
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

        let stepX = _distance * Math.cos(angle);
        let stepY = _distance * Math.sin(angle);
        this.setPosition(this.x + stepX, this.y + stepY);
    }

    public getPreviousPosition() {
        return { x: this.previousX, y: this.previousY };
    }

    public getPosition() {
        return { x: this.x, y: this.y };
    }
}
