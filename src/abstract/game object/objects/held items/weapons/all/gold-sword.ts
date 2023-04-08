import { GameScene } from '../../../../../game scene/game-scene';
import { Weapon } from '../weapon';

export class GoldSword extends Weapon {
    constructor(_x: number, _y: number, _scene: GameScene) {
        super(_x, _y, _scene, 'gold_sword');
    }
}
