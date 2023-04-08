import { Sprite } from './sprite';

describe('Test Sprite', () => {
    test('Should return an UUID', () => {
        let sprite = new Sprite('sprite');
        expect(sprite.getUUID()).not.toBeUndefined();
        expect(typeof sprite.getUUID()).toBe('string');
    });

    test('Should have changed offset', () => {
        let sprite = new Sprite('sprite');
        sprite.setOffset(50, 50);
        expect(sprite.getOffset().offsetX).toBe(50);
        expect(sprite.getOffset().offsetY).toBe(50);
    });

    test('Should have changed position', () => {
        let sprite = new Sprite('sprite');
        sprite.setPosition(50, 50);
        expect(sprite.getPosition().x).toBe(50);
        expect(sprite.getPosition().y).toBe(50);
    });

    test('Should have changed scale', () => {
        let sprite = new Sprite('sprite');
        sprite.setScale(2, 2);
        expect(sprite.getScale().scaleX).toBe(2);
        expect(sprite.getScale().scaleY).toBe(2);
    });
});
