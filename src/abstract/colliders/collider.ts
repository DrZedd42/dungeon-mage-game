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

    getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }
}
