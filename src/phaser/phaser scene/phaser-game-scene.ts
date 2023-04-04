import { GameObject } from '../../abstract/game object/game-object';
import { GameScene } from '../../abstract/game scene/game-scene';
import { Sprite } from '../../abstract/sprite/sprite';
import { Updateable } from '../../abstract/updateable';
import { PhaserKeyBoardInputContoller } from '../phaser-keyboard-input-controller';
import {
    SpriteMetaInfoContainer,
    SpriteMetaInfoContainerKeys,
} from '../sprite-meta-info.data';

/*
    Extend this class when you create new phaser scene
*/

export class PhaserGameScene extends Phaser.Scene {
    protected gameScene: GameScene;
    private sprites: Array<{
        image: Phaser.GameObjects.Sprite;
        owner: string;
    }> = [];
    // @ts-ignore 'preload' will be called by the Phaser-Scene-Manager
    // Use 'loadPhaserSpriteUsingMetaInfo' for every sprite that is and can be drawn in this scene inside of _preload
    private preload: Function;

    constructor(
        _gameConfig: Phaser.Types.Core.GameConfig,
        _gameScene: GameScene,
        _preload: Function
    ) {
        super(_gameConfig);
        this.gameScene = _gameScene;
        this.preload = _preload;
    }

    public init() {
        this.gameScene.setInputController(
            new PhaserKeyBoardInputContoller(this)
        );
    }

    public update(_time: number, _delta: number) {
        this.gameScene.updateAllUpdateables(_delta);
        this.gameScene.getUpdateables().forEach((_updateable: Updateable) => {
            if (_updateable instanceof GameObject) {
                this.updatePhaserSprites(
                    _updateable.getSprite(),
                    _updateable.getUUID()
                );
            } else {
                throw new Error(
                    "Trying to update the sprite of an 'Updateable' which is not a 'GameObject' and therefore has no 'Sprite'"
                );
            }
        });
    }

    // This function serves the purpose of adding and removing Phaser Sprites from the scene, as well as syncing the values of the Abstract Sprite Object with actual Phaser Sprite Objects (... scale, offset, width, height, etc)
    private updatePhaserSprites(
        _gameSprite: Sprite | undefined,
        _ownerUUID: string
    ) {
        if (!_gameSprite) return;

        const uuid = _gameSprite.getUUID();
        // Documentation of the name-attribute of Phaser-Sprites : "Empty by default and never populated by Phaser. This is left for developers to use."
        // This means we can store the UUID here and check for it to see whether or not a phaser-sprite has been created for the game sprite
        const relatedPhaserSprite = this.sprites.find(
            (phaserSprite) => phaserSprite.image.name === uuid
        )?.image;

        let phaserSprite: Phaser.GameObjects.Sprite;
        const animation_key = `animation_${_gameSprite.getResourceIdentifier()}`;
        // This loop allows only one visible sprite per object, allowing for animation states like run, idle etc
        if (relatedPhaserSprite) {
            this.sprites.forEach((sprite) => {
                if (
                    sprite.owner === _ownerUUID &&
                    sprite.image.name !== uuid &&
                    sprite.image.visible
                ) {
                    sprite.image.setVisible(false);
                }
            });

            phaserSprite = relatedPhaserSprite;
            phaserSprite.setVisible(true);
            this.matchSpriteAttributes(_gameSprite, phaserSprite);
        } else {
            phaserSprite = this.add.sprite(
                _gameSprite.getPosition().x,
                _gameSprite.getPosition().y,
                _gameSprite.getResourceIdentifier()
            );
            const spriteMetaInfo =
                SpriteMetaInfoContainer[
                    _gameSprite.getResourceIdentifier() as keyof SpriteMetaInfoContainerKeys
                ];
            if (!spriteMetaInfo) {
                throw new Error(
                    'There is no meta-info configured for this sprite. Please add meta information under sprite-meta-info.data.ts'
                );
            }
            const { spritesheetAnimation } = spriteMetaInfo;
            if (spritesheetAnimation) {
                const { speed, frames, loop } = spritesheetAnimation;

                let anim = phaserSprite.anims.create({
                    frameRate: speed,
                    key: animation_key,
                    frames: this.anims.generateFrameNumbers(
                        _gameSprite.getResourceIdentifier(),
                        { start: 0, end: frames - 1 }
                    ),
                    repeat: loop ? -1 : 0,
                });

                if (!anim) {
                    throw new Error(
                        'There has been an issue creating the animation object'
                    );
                }
                phaserSprite.play(anim);
            }
            this.matchSpriteAttributes(_gameSprite, phaserSprite);
            phaserSprite.name = uuid;
            this.sprites.push({ image: phaserSprite, owner: _ownerUUID });
        }
    }

    private matchSpriteAttributes(
        _gameSprite: Sprite,
        _phaserSprite: Phaser.GameObjects.Sprite
    ) {
        if (!_gameSprite || !_phaserSprite) return;
        let sprite = _gameSprite!;

        _phaserSprite.setPosition(
            sprite.getPosition().x,
            sprite.getPosition().y
        );
        _phaserSprite.setDisplaySize(
            sprite.getDimension().width * sprite.getScale().scaleX,
            sprite.getDimension().height * sprite.getScale().scaleY
        );
    }
}
