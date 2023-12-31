import { v4 as uuidv4 } from 'uuid';

export class Sprite {
    private x: number = 0;
    private y: number = 0;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private scaleX: number = 1;
    private scaleY: number = 1;
    private uuid: string;
    private resourceIdentifier: string;
    private depthOffset: number = 0;
    private rotation: number = 0;

    constructor(_resourceIdentifier: string) {
        this.uuid = uuidv4();
        this.resourceIdentifier = _resourceIdentifier;
    }

    // The resource identifier should be a key unique to the resource representing that sprite (e.g "player_idle", "tree_big", "explosion_small_blue", ...)
    // This helps the render engine using the game logic to better and more easily identify the sprites when drawing
    public getResourceIdentifier() {
        return this.resourceIdentifier;
    }

    public setRotation(_rotation: number) {
        this.rotation = _rotation;
    }

    public getRotation() {
        return this.rotation;
    }

    public setDepthOffset(_depthOffset: number) {
        this.depthOffset = _depthOffset;
    }

    public getDepthOffset() {
        return this.depthOffset;
    }

    public getUUID() {
        return this.uuid;
    }

    public setPosition(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    public getPosition() {
        return { x: this.x, y: this.y };
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
