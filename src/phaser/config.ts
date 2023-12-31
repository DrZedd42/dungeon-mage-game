import { TestScenePhaser } from './phaser scene/scenes/test-scene.phaser';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Dungeon Mage',
    version: '1.0',
    width: 1280,
    height: 720,
    scene: [TestScenePhaser],
    render: { pixelArt: true, antialias: false },
};
