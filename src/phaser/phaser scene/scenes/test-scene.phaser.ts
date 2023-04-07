import { TestScene } from '../../../abstract/game scene/scenes/test-scene';
import { PhaserGameScene } from '../phaser-game-scene';
import { loadPhaserSpriteUsingMetaInfo } from '../../sprite-meta-info.data';

export class TestScenePhaser extends PhaserGameScene {
    constructor(_gameConfig: Phaser.Types.Core.GameConfig) {
        super(_gameConfig, new TestScene(), () => {
            loadPhaserSpriteUsingMetaInfo(this, 'little_mage_run');
            loadPhaserSpriteUsingMetaInfo(this, 'little_mage_idle');
            loadPhaserSpriteUsingMetaInfo(this, 'gold_sword');
        });
    }
}
