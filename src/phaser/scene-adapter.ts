import { Updater } from '../abstract/updater';

export class SceneAdapter extends Phaser.Scene {
    public updater = new Updater();

    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }

    update(_time: number, _delta: number) {
        this.updater.updateAllUpdateables(_delta / 1000);
    }
}
