import { TestObject } from '../../game object/objects/test-object';
import { GameScene } from '../game-scene';

export class TestScene extends GameScene {
    constructor() {
        super();
        this.add(new TestObject(50, 50));
    }
}
