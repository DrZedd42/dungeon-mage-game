import { GameObject } from '../abstract/game-object';
import { SceneAdapter } from './scene-adapter';

export class GameObjectAdapter extends GameObject {
    private scene: SceneAdapter;
    private phaserSprite: Phaser.GameObjects.Sprite | undefined;

    constructor(_x: number, _y: number, _scene: SceneAdapter) {
        super(_x, _y);
        this.scene = _scene;
        this.onPostUpdate.push(this.updatePhaserSprite);
    }

    preload() {
        let sprite = this.getSprite();
        if (sprite) {
            this.scene.load.image(sprite.getIdentifier(), sprite.getSrc());
        }
    }

    bindToSceneAdapter(_sceneAdapter: SceneAdapter) {
        _sceneAdapter.updater.register(this);
        if (!this.getSprite()) return;
        this.phaserSprite = this.scene.add.sprite(
            this.getPosition().x,
            this.getPosition().y,
            this.getSprite()!.getIdentifier()
        );
    }

    updatePhaserSprite() {
        if (!this.getSprite() || !this.phaserSprite) return;
        let sprite = this.getSprite()!;
        this.phaserSprite.setPosition(
            sprite.getPosition().x,
            sprite.getPosition().y
        );
        this.phaserSprite.setDisplaySize(
            sprite.getDimension().width * sprite.getScale().scaleX,
            sprite.getDimension().height * sprite.getScale().scaleY
        );
    }
}
