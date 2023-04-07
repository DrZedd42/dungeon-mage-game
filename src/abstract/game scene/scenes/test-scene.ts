import { Player } from '../../game object/objects/player';
import { GameScene } from '../game-scene';

export class TestScene extends GameScene {
    constructor() {
        super();
        this.add(new Player(50, 50, this));
    }
}
