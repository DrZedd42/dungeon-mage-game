export class Updateable {
    public onPostUpdate: Array<Function> = [];
    public onPreUpdate: Array<Function> = [];
    private updateStack: Array<Function> = [];

    // Adding a function to this stack will not clear it and continously call it before each update
    addToPersistentPreUpdate(func: Function) {
        this.onPreUpdate.push(func);
    }

    // Adding a function to this stack will clear it once it is called
    addToTemporaryUpdate(func: Function) {
        this.updateStack.push(func);
    }

    // Adding a function to this stack will not clear it and continously call it after each update
    addToPersistentPostUpdate(func: Function) {
        this.onPostUpdate.push(func);
    }

    update(_delta: number | undefined) {
        if (this.onPreUpdate) {
            this.onPreUpdate.forEach((onPreUpdateFunction) =>
                onPreUpdateFunction.bind(this)(_delta)
            );
        }
        while (this.updateStack.length > 0) {
            let func = this.updateStack.pop()!;
            func.bind(this)(_delta);
        }
        if (this.onPostUpdate) {
            this.onPostUpdate.forEach((onPostUpdateFunction) =>
                onPostUpdateFunction.bind(this)(_delta)
            );
        }
    }
}
