import LittleMageRunFilePath from '../../assets/images/spr_little_mage_run.png';
import LittleMageIdleFilePath from '../../assets/images/spr_little_mage_idle.png';
import { PhaserGameScene } from './phaser scene/phaser-game-scene';

type SpriteMetaInfo = {
    filepath: string;
    spritesheetAnimation?: {
        cellWidth: number;
        cellHeight: number;
        speed: number;
        frames: number;
        loop: boolean;
    };
};

export type SpriteMetaInfoContainerKeys = {
    little_mage_run: string;
    little_mage_idle: string;
};

export const SpriteMetaInfoContainer: {
    [P in keyof SpriteMetaInfoContainerKeys]: SpriteMetaInfo;
} = {
    // Little Mage
    little_mage_run: {
        filepath: LittleMageRunFilePath,
        spritesheetAnimation: {
            frames: 6,
            cellWidth: 16,
            cellHeight: 16,
            speed: 10,
            loop: true,
        },
    },
    little_mage_idle: {
        filepath: LittleMageIdleFilePath,
        spritesheetAnimation: {
            frames: 6,
            cellWidth: 16,
            cellHeight: 16,
            speed: 10,
            loop: true,
        },
    },
};

export function loadPhaserSpriteUsingMetaInfo(
    scene: PhaserGameScene,
    spriteKey: keyof SpriteMetaInfoContainerKeys
) {
    const spriteMetaInfo = SpriteMetaInfoContainer[spriteKey];
    if (spriteMetaInfo) {
        if (spriteMetaInfo.spritesheetAnimation) {
            scene.load.spritesheet(spriteKey, spriteMetaInfo.filepath, {
                frameWidth: spriteMetaInfo.spritesheetAnimation.cellWidth,
                frameHeight: spriteMetaInfo.spritesheetAnimation.cellHeight,
                startFrame: 0,
                endFrame: spriteMetaInfo.spritesheetAnimation.frames - 1,
            });
        }
    } else {
        throw new Error(
            'The defined key does not exist in SpriteMetaInfoContainer'
        );
    }
}
