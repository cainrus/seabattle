import { updateObjectProperties } from './updateObjectProperties';

describe('updateObjectProperties', () => {
    test('', () => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const updatedObject = updateObjectProperties(originalObject, { b: 4, c: 3 });
        expect(updatedObject).toEqual({ a: 1, b: 4, c: 3 });
        expect(updatedObject).not.toBe(originalObject);
    })

});