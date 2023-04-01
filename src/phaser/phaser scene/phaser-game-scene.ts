import { GameObject } from '../../abstract/game object/game-object';
import { GameScene } from '../../abstract/game scene/game-scene';
import { Sprite } from '../../abstract/sprite/sprite';
import { Updateable } from '../../abstract/updateable';
import { PhaserKeyBoardInputContoller } from '../phaser-keyboard-input-controller';

/*
    Extend this class when you create new phaser scene
*/

export class PhaserGameScene extends Phaser.Scene {
    protected gameScene: GameScene;
    private sprites: Array<Phaser.GameObjects.Sprite> = [];
    // @ts-ignore 'preload' will be called by the Phaser-Scene-Manager
    // Use 'this.load.image("key", "path")' for every sprite that is and can be drawn in this scene inside of _preload
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
                this.updatePhaserSprites(_updateable.getSprite());
            } else {
                throw new Error(
                    "Trying to update the sprite of an 'Updateable' which is not a 'GameObject' and therefore has no 'Sprite'"
                );
            }
        });
    }

    private updatePhaserSprites(_gameSprite: Sprite | undefined) {
        if (!_gameSprite) return;
        // Documentation of the name-attribute of Phaser-Sprites : "Empty by default and never populated by Phaser. This is left for developers to use."
        // This means we can store the UUID here and check for it to see whether or not a phaser-sprite has been created for the game sprite
        let relatedPhaserSprite = this.sprites.find(
            (phaserSprite) => phaserSprite.name === _gameSprite.getUUID()
        );
        if (!relatedPhaserSprite) {
            relatedPhaserSprite = this.add.sprite(
                _gameSprite.getPosition().x,
                _gameSprite.getPosition().y,
                _gameSprite.getResourceIdentifier()
            );
            this.sprites.push(relatedPhaserSprite);
            relatedPhaserSprite.name = _gameSprite.getUUID();
        }
        this.matchSpriteAttributes(_gameSprite, relatedPhaserSprite);

        console.log(relatedPhaserSprite);
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
