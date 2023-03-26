export abstract class Collider {
    protected x: number;
    protected y: number;
    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
    abstract checkPoint(_x: number, _y: number): boolean;
    abstract checkCollision(_collider: Collider): boolean;
    setPosition(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
}
