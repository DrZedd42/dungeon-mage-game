import { Updateable } from './updateable';
import { Updater } from './updater';

describe('Test Updater', () => {
    test('Should call the update function for every Updateable', () => {
        let updateable1 = new Updateable();
        let mockFn1 = jest.fn();
        updateable1.addToTemporaryUpdate(mockFn1);
        let updateable2 = new Updateable();
        let mockFn2 = jest.fn();
        updateable1.addToTemporaryUpdate(mockFn2);

        let updater = new Updater();
        updater.add(updateable1);
        updater.add(updateable2);

        updater.updateAllUpdateables(1);

        expect(mockFn1).toBeCalledTimes(1);
        expect(mockFn2).toBeCalledTimes(1);
    });

    test('Should return a list of all added Updateables', () => {
        let updateable1 = new Updateable();
        let updateable2 = new Updateable();

        let updater = new Updater();
        updater.add(updateable1);
        updater.add(updateable2);

        expect(updater.getUpdateables().length).toBe(2);
    });
});
