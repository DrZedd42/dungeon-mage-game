import { Updateable } from './updateable';

export class Updater {
    protected updateables: Array<Updateable> = [];
    public updateAllUpdateables(_delta: number) {
        this.updateables.forEach((updatable) => {
            updatable.update(_delta);
        });
    }
    public register(_updateable: Updateable) {
        this.updateables.push(_updateable);
    }
}
