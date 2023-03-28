import { GameObject } from './game-object';

describe('Test game-object.ts', () => {
    test('Fields should be initialized on creation', () => {
        let gameObject = new GameObject(10, 15);
        expect(gameObject.getPosition().x).toBe(10);
        expect(gameObject.getPosition().y).toBe(15);
    });

    test('Update should call Position-Setter', () => {
        let gameObject = new GameObject(1, 2);
        gameObject.setPosition(5, 5);
        expect(gameObject.getPosition().x).toBe(1);
        expect(gameObject.getPosition().y).toBe(2);
        gameObject.update(1);
        expect(gameObject.getPosition().x).toBe(5);
        expect(gameObject.getPosition().y).toBe(5);
    });

    test('Update position should also update the previous position', () => {
        let gameObject = new GameObject(1, 2);
        const setPositionSpy = jest.spyOn(gameObject, 'setPosition');
        gameObject.setPosition(5, 5);
        expect(gameObject.getPosition().x).toBe(1);
        expect(gameObject.getPosition().y).toBe(2);
        gameObject.update(1);
        expect(gameObject.getPosition().x).toBe(5);
        expect(gameObject.getPosition().y).toBe(5);
        expect(gameObject.getPreviousPosition().x).toBe(1);
        expect(gameObject.getPreviousPosition().y).toBe(2);
        expect(setPositionSpy).toBeCalledTimes(1);
    });

    test('CallStack should be empty after calling the functions inside it', () => {
        let gameObject = new GameObject(1, 2);
        gameObject.setPosition(1, 1);
        gameObject.update(1);
    });
});
