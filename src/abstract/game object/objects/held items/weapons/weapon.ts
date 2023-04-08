import { GameScene } from '../../../../game scene/game-scene';
import { HeldItem } from '../held-item';

export class Weapon extends HeldItem {
    constructor(
        _x: number,
        _y: number,
        _scene: GameScene,
        _identifier: string
    ) {
        super(_x, _y, _scene, _identifier);
    }
}
