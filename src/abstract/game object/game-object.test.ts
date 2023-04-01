import { RectCollider } from '../colliders/rect-collider';
import { GameScene } from '../game scene/game-scene';
import { Sprite } from '../sprite/sprite';
import { GameObject } from './game-object';

describe('Test game-object.ts', () => {
    let scene = new GameScene();

    test('Fields should be initialized on creation', () => {
        let gameObject = new GameObject(10, 15, scene);
        expect(gameObject.getPosition().x).toBe(10);
        expect(gameObject.getPosition().y).toBe(15);
    });

    test('Update should call Position-Setter', () => {
        let gameObject = new GameObject(1, 2, scene);
        gameObject.setPosition(5, 5);
        expect(gameObject.getPosition().x).toBe(1);
        expect(gameObject.getPosition().y).toBe(2);
        gameObject.update(1);
        expect(gameObject.getPosition().x).toBe(5);
        expect(gameObject.getPosition().y).toBe(5);
    });

    test('Update position should also update the previous position', () => {
        let gameObject = new GameObject(1, 2, scene);
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
        let gameObject = new GameObject(1, 2, scene);
        gameObject.setPosition(1, 1);
        gameObject.update(1);
    });

    test('Should set position of collider when set to object', () => {
        let gameObject = new GameObject(1, 1, scene);
        let collider = new RectCollider(50, 50, 50, 50);
        gameObject.setCollider(collider);
        expect(gameObject.getCollider()!.getPosition().x).toBe(1);
        expect(gameObject.getCollider()!.getPosition().y).toBe(1);
    });

    test('Should set position of sprite when set to object', () => {
        let gameObject = new GameObject(1, 1, scene);
        let sprite = new Sprite('testsprite');
        gameObject.setSprite(sprite);
        expect(gameObject.getSprite()!.getPosition().x).toBe(1);
        expect(gameObject.getSprite()!.getPosition().y).toBe(1);
    });

    test('Should call pre update function', () => {
        let gameObject = new GameObject(1, 1, scene);
        let mockFunction = jest.fn();
        gameObject.onPreUpdate.push(mockFunction);
        gameObject.update(1);
        expect(mockFunction).toBeCalledTimes(1);
    });

    test('Should call post update function', () => {
        let gameObject = new GameObject(1, 1, scene);
        let mockFunction = jest.fn();
        gameObject.onPostUpdate.push(mockFunction);
        gameObject.update(1);
        expect(mockFunction).toBeCalledTimes(1);
    });

    test('Should set position for sprite and collider on position-change', () => {
        let gameObject = new GameObject(1, 1, scene);
        let collider = new RectCollider(50, 50, 50, 50);
        let sprite = new Sprite('testsprite');
        gameObject.setSprite(sprite);
        gameObject.setCollider(collider);
        gameObject.setPosition(3, 3);
        gameObject.update(1);
        expect(gameObject.getCollider()?.getPosition().x).toBe(3);
        expect(gameObject.getCollider()?.getPosition().y).toBe(3);
        expect(gameObject.getSprite()?.getPosition().x).toBe(3);
        expect(gameObject.getSprite()?.getPosition().y).toBe(3);
    });

    test('Should change x position positively when moving towards right direction (0 degree)', () => {
        let gameObject = new GameObject(0, 0, scene);
        gameObject.moveTowardsDirection(0, 1, 'degree');
        expect(gameObject.getPosition().x).toBe(0);
        expect(gameObject.getPosition().y).toBe(0);
        gameObject.update(1);
        expect(gameObject.getPosition().x).toBe(1);
        expect(gameObject.getPosition().y).toBe(0);
    });

    test('Should change x position negatively when moving towards left direction (0 degree)', () => {
        let gameObject = new GameObject(0, 0, scene);
        gameObject.moveTowardsDirection(180, 1, 'degree');
        expect(gameObject.getPosition().x).toBe(0);
        expect(gameObject.getPosition().y).toBe(0);
        gameObject.update(1);
        expect(gameObject.getPosition().x).toBe(-1);
        expect(gameObject.getPosition().y).toBe(0);
    });

    test('Should change position when moving towards direction (radians)', () => {
        let gameObject = new GameObject(0, 0, scene);
        gameObject.moveTowardsDirection(50, 1, 'radians');
        expect(gameObject.getPosition().x).toBe(0);
        expect(gameObject.getPosition().y).toBe(0);
        gameObject.update(1);
        expect(gameObject.getPosition().x).not.toBe(0);
        expect(gameObject.getPosition().y).not.toBe(0);
    });
});
