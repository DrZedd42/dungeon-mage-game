import { TestScene } from '../../../abstract/game scene/scenes/test-scene';
import { PhaserGameScene } from '../phaser-game-scene';
import TestSprite from '../../../../assets/images/testsprite.png';

export class TestScenePhaser extends PhaserGameScene {
    constructor(_gameConfig: Phaser.Types.Core.GameConfig) {
        super(_gameConfig, new TestScene(), () => {
            this.load.image('testsprite', TestSprite);
        });
    }
}
