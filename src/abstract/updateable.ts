export abstract class Updateable {
    protected updateStack: Array<Function> = [];
    abstract update(_delta: number): void;
}
