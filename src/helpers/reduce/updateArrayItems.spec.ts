import { updateArrayItems } from "./updateArrayItems";

describe('updateArrayItems', () => {
    test('should update reference and update values with change applied', () => {
        const originalArray = [1, 2, 3, 4];
        const updatedArray = updateArrayItems(originalArray, (value) => value * 2);
        expect(updatedArray).toEqual([2, 4, 6, 8]);
        expect(updatedArray).not.toBe(originalArray);
    });
    test('should not update reference or values without changes', () => {
        const originalArray = [1, 2, 3, 4];
        const testArray = [...originalArray];
        const updatedArray = updateArrayItems(originalArray, (value) => value);
        expect(updatedArray).toBe(originalArray);
        expect(updatedArray).toEqual(testArray);
    })
});
