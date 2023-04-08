import LittleMageRunFilePath from '../../assets/images/spr_little_mage_run.png';
import LittleMageIdleFilePath from '../../assets/images/spr_little_mage_idle.png';
import GoldSwordFilePath from '../../assets/images/spr_gold_sword.png';
import { PhaserGameScene } from './phaser scene/phaser-game-scene';

type SpriteMetaInfo = {
    filepath: string;
    spritesheetAnimation?: {
        speed: number;
        frames: number;
        loop: boolean;
    };
    width: number;
    height: number;
    // Anchor Point of the image (Default is 0.5, range is 0.0 - 1.0)
    originX?: number;
    originY?: number;
};

export type SpriteMetaInfoContainerKeys = {
    little_mage_run: string;
    little_mage_idle: string;
    gold_sword: string;
};

export const SpriteMetaInfoContainer: {
    [P in keyof SpriteMetaInfoContainerKeys]: SpriteMetaInfo;
} = {
    // Little Mage
    little_mage_run: {
        filepath: LittleMageRunFilePath,
        spritesheetAnimation: {
            frames: 6,
            speed: 10,
            loop: true,
        },
        width: 16,
        height: 16,
    },
    little_mage_idle: {
        filepath: LittleMageIdleFilePath,
        spritesheetAnimation: {
            frames: 6,
            speed: 10,
            loop: true,
        },
        width: 16,
        height: 16,
    },
    // Items
    gold_sword: {
        filepath: GoldSwordFilePath,
        width: 16,
        height: 16,
        originY: 1,
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
                frameWidth: spriteMetaInfo.width,
                frameHeight: spriteMetaInfo.height,
                startFrame: 0,
                endFrame: spriteMetaInfo.spritesheetAnimation.frames - 1,
            });
        } else {
            scene.load.image(spriteKey, spriteMetaInfo.filepath);
        }
    } else {
        throw new Error(
            'The defined key does not exist in SpriteMetaInfoContainer'
        );
    }
}
