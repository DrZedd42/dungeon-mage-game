export class Sprite {
    private x: number = 0;
    private y: number = 0;
    private width: number = 0;
    private height: number = 0;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private scaleX: number = 1;
    private scaleY: number = 1;
    private src: string;
    private identifier: string;

    constructor(_identifier: string, _src: string) {
        this.src = _src;
        this.identifier = _identifier;
    }

    getIdentifier() {
        return this.identifier;
    }

    public getSrc() {
        return this.src;
    }

    public setPosition(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    public getPosition() {
        return { x: this.x, y: this.y };
    }

    public setDimension(_width: number, _height: number) {
        this.width = _width;
        this.height = _height;
    }

    public getDimension() {
        return { width: this.width, height: this.height };
    }

    public setOffset(_offsetX: number, _offsetY: number) {
        this.offsetX = _offsetX;
        this.offsetY = _offsetY;
    }

    public getOffset() {
        return { offsetX: this.offsetX, offsetY: this.offsetY };
    }

    public setScale(_scaleX: number, _scaleY: number) {
        this.scaleX = _scaleX;
        this.scaleY = _scaleY;
    }

    public getScale() {
        return { scaleX: this.scaleX, scaleY: this.scaleY };
    }
}
