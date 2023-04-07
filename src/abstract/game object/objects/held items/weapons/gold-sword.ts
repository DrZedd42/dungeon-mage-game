import { GameObject } from '../../../game-object';
import { HeldItem } from '../held-item';

export class GoldSword extends HeldItem {
    constructor(_x: number, _y: number, _wielder: GameObject) {
        super(_x, _y, _wielder.getRelatedScene(), _wielder, 'gold_sword');
    }
}
