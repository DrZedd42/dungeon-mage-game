import { Collider } from './colliders/collider';
import { Sprite } from './sprites/sprite';
import { Updateable } from './updateable';

export class GameObject extends Updateable {
    private x: number;
    private y: number;
    private previousX: number;
    private previousY: number;
    private collider: Collider | undefined;
    private sprite: Sprite | undefined;
    public onPostUpdate: Array<Function> = [];

    constructor(_x: number, _y: number) {
        super();
        this.x = _x;
        this.y = _y;
        this.previousX = this.x;
        this.previousY = this.y;
        return this;
    }

    setCollider(_collider: Collider) {
        this.collider = _collider;
        return this;
    }

    getCollider() {
        return this.collider;
    }

    setSprite(_sprite: Sprite) {
        this.sprite = _sprite;
        return this;
    }

    getSprite() {
        return this.sprite;
    }

    update(_delta: number | undefined) {
        this.updatePreviousPosition();
        while (this.updateStack.length > 0) {
            let func: Function = this.updateStack.pop()!;
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
        this.updateStack.push(() => {
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

    public getPreviousPosition() {
        return { x: this.previousX, y: this.previousY };
    }

    public getPosition() {
        return { x: this.x, y: this.y };
    }
}
