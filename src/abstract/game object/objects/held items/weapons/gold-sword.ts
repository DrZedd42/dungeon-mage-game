import { GameScene } from '../../../../game scene/game-scene';
import { GameObject } from '../../../game-object';
import { HeldItem } from '../held-item';

export class GoldSword extends HeldItem {
    constructor(_x: number, _y: number, _scene: GameScene) {
        super(_x, _y, _scene, 'gold_sword');
    }
}
