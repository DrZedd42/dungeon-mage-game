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
});
