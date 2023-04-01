export abstract class Updateable {
    private updateStack: Array<Function> = [];
    addToUpdate(func: Function) {
        this.updateStack.push(func);
    }

    checkUpdatesEmpty() {
        return this.updateStack.length <= 0;
    }

    getNextUpdate(): Function {
        let func = this.updateStack.pop();
        if (func instanceof Function) {
            return func;
        } else {
            throw new Error(
                "Update Stack was empty, please check with 'checkUpdatesEmpty' before calling this function."
            );
        }
    }
    abstract update(_delta: number): void;
}
