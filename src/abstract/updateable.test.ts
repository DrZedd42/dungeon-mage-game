import { Updateable } from './updateable';

describe('Test Updateable', () => {
    test('Should call function in pre update', () => {
        let updateable = new Updateable();
        let mockFunc = jest.fn();
        updateable.addToPersistentPreUpdate(() => mockFunc());
        updateable.update(1);
        expect(mockFunc).toBeCalledTimes(1);
        updateable.update(1);
        expect(mockFunc).toBeCalledTimes(2);
    });

    test('Should call function in post update', () => {
        let updateable = new Updateable();
        let mockFunc = jest.fn();
        updateable.addToPersistentPostUpdate(() => mockFunc());
        updateable.update(1);
        expect(mockFunc).toBeCalledTimes(1);
        updateable.update(1);
        expect(mockFunc).toBeCalledTimes(2);
    });

    test('Should call function in update only once', () => {
        let updateable = new Updateable();
        let mockFunc = jest.fn();
        updateable.addToTemporaryUpdate(() => mockFunc());
        updateable.update(1);
        expect(mockFunc).toBeCalledTimes(1);
        updateable.update(1);
        expect(mockFunc).toBeCalledTimes(1);
    });
});
