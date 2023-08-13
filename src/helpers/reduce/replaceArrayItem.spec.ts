import { replaceArrayItem } from "../reduce/replaceArrayItem";

describe('replaceArrayItem', () => {
    test('should replace an item in the array and return a new array', () => {
        const originalArray = [1, 2, 3, 4];
        const updatedArray = replaceArrayItem(originalArray, 1, 5);
        expect(updatedArray).toEqual([1, 5, 3, 4]);
        expect(updatedArray).not.toBe(originalArray);
    });

    test('should remove an item from the array if value is undefined', () => {
        const originalArray = [1, 2, 3, 4];
        const updatedArray = replaceArrayItem(originalArray, 2, undefined);
        expect(updatedArray).toEqual([1, 2, 4]);
        expect(updatedArray).not.toBe(originalArray);
    });

    test('should return the same array if index is out of bounds', () => {
        const originalArray = [1, 2, 3, 4];
        const updatedArray1 = replaceArrayItem(originalArray, originalArray.length + 1, 5);
        const updatedArray2 = replaceArrayItem(originalArray, -1, 5);
        expect(updatedArray1).toEqual(originalArray);
        expect(updatedArray1).toBe(originalArray);
        expect(updatedArray2).toEqual(originalArray);
        expect(updatedArray2).toBe(originalArray);
    });

    test('should return the same array if value is the same as the current item', () => {
        const originalArray = [1, 2, 3, 4];
        const updatedArray = replaceArrayItem(originalArray, 1, 2);
        expect(updatedArray).toEqual(originalArray);
        expect(updatedArray).toBe(originalArray);
    });

    test('should return new array on add (index === array.length)', () => {
        const originalArray = [1, 2, 3, 4];
        const testValue = 5;
        const updatedArray = replaceArrayItem(originalArray, originalArray.length, testValue);
        expect(updatedArray).toEqual(originalArray.concat(testValue));
        expect(updatedArray).not.toBe(originalArray);
    });
    test('should return new array on rm last (index === array.length)', () => {
        const originalArray = [1, 2, 3, 4];
        const updatedArray = replaceArrayItem(originalArray, originalArray.length - 1);
        expect(updatedArray).toEqual(originalArray.slice(0, -1));
        expect(updatedArray).not.toBe(originalArray);
    });
    test('should return new array on rm first (index === 0)', () => {
        const originalArray = [1, 2, 3, 4];
        const updatedArray = replaceArrayItem(originalArray, 0);
        expect(updatedArray).toEqual(originalArray.slice(1));
        expect(updatedArray).not.toBe(originalArray);
    });
});
