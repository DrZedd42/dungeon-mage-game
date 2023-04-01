import { RectCollider } from './rect-collider';

describe('Test rect-collider.ts', () => {
    test('Should collide with intersecting rectangle', () => {
        /*
        ________
        |       |
        |   ________
        |___|       |
            |       |
            |_______|
        */
        let collider1 = new RectCollider(0, 0, 10, 10);
        let collider2 = new RectCollider(5, 5, 10, 10);
        expect(collider1.checkCollision(collider2)).toBe(true);
    });

    test('Should not collide with rectangle when sides horizontally dont touch', () => {
        /*
        ________ ________
        |       ||       |
        |       ||       |
        |_______||_______|
        */
        let collider1 = new RectCollider(0, 0, 5, 5);
        let collider2 = new RectCollider(6, 0, 5, 5);
        expect(collider1.checkCollision(collider2)).toBe(false);
    });

    test('Should not collide with rectangle when sides vertically dont touch', () => {
        /*
        ________ 
        |       |
        |       |
        |_______|
        ________ 
        |       |
        |       |
        |_______|
        */
        let collider1 = new RectCollider(6, 0, 5, 5);
        let collider2 = new RectCollider(6, 6, 5, 5);
        expect(collider1.checkCollision(collider2)).toBe(false);
    });

    test('Should  collide with rectangle when sides horizontally match', () => {
        /*
        ________ _______
        |       |       |
        |       |       |
        |_______|_______|
        */
        let collider1 = new RectCollider(0, 0, 5, 5);
        let collider2 = new RectCollider(5, 0, 5, 5);
        expect(collider1.checkCollision(collider2)).toBe(true);
    });

    test('Should  collide with rectangle when sides vertically match', () => {
        /*
        ________ 
        |       |
        |       |
        |_______|
        |       |
        |       |
        |_______|
        */
        let collider1 = new RectCollider(0, 0, 5, 5);
        let collider2 = new RectCollider(0, 5, 5, 5);
        expect(collider1.checkCollision(collider2)).toBe(true);
    });

    test('Should change dimensions', () => {
        let collider = new RectCollider(0, 0, 5, 5);
        collider.setDimensions(50, 50);
        expect(collider.getDimensions().width).toBe(50);
        expect(collider.getDimensions().height).toBe(50);
    });

    test('Should change position', () => {
        let collider = new RectCollider(0, 0, 5, 5);
        collider.setPosition(50, 50);
        expect(collider.getPosition().x).toBe(50);
        expect(collider.getPosition().y).toBe(50);
    });

    test('Should change position', () => {
        let collider = new RectCollider(0, 0, 5, 5);
        collider.setPosition(50, 50);
        expect(collider.getPosition().x).toBe(50);
        expect(collider.getPosition().y).toBe(50);
    });

    test('Should have collision with point that is inside the rect', () => {
        let collider = new RectCollider(0, 0, 50, 50);
        expect(collider.checkPoint(0, 50)).toBe(true);
        expect(collider.checkPoint(50, 50)).toBe(true);
        expect(collider.checkPoint(50, 50)).toBe(true);
        expect(collider.checkPoint(50, 0)).toBe(true);
        expect(collider.checkPoint(25, 25)).toBe(true);
    });

    test('Should not have collision with point that is not inside the rect', () => {
        let collider = new RectCollider(0, 0, 50, 50);
        expect(collider.checkPoint(0, 51)).toBe(false);
        expect(collider.checkPoint(51, 51)).toBe(false);
        expect(collider.checkPoint(51, 51)).toBe(false);
        expect(collider.checkPoint(51, 0)).toBe(false);
        expect(collider.checkPoint(-1, -1)).toBe(false);
    });
});
