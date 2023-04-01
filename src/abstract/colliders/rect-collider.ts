import { Collider } from './collider';

export class RectCollider extends Collider {
    private width: number;
    private height: number;

    constructor(_x: number, _y: number, _width: number, _height: number) {
        super(_x, _y);
        this.width = _width;
        this.height = _height;
    }

    setDimensions(_width: number, _height: number) {
        this.width = _width;
        this.height = _height;
    }

    getDimensions(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }

    checkPoint(_x: number, _y: number): boolean {
        return (
            _x >= this.x &&
            _x <= this.x + this.width &&
            _y >= this.y &&
            _y <= this.y + this.height
        );
    }

    checkCollision(_collider: Collider): boolean {
        if (_collider instanceof RectCollider) {
            return (
                // Check for x-overlap
                ((this.x >= _collider.x &&
                    this.x <= _collider.x + _collider.width) ||
                    (this.x + this.width >= _collider.x &&
                        this.x + this.width <=
                            _collider.x + _collider.width)) &&
                // Check for y-overlap
                ((this.y >= _collider.y &&
                    this.y <= _collider.y + _collider.height) ||
                    (this.y + this.height >= _collider.y &&
                        this.y + this.height <= _collider.y + _collider.height))
            );
        } else {
            throw new Error(
                'Collider was not covered in checkCollision-Check.'
            );
        }
    }
}
