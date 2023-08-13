import getRange from './getRange';

describe('getRange', () => {
    it('returns an ascending range when from < to', () => {
        expect(getRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('returns a descending range when from > to', () => {
        expect(getRange(5, 1)).toEqual([5, 4, 3, 2, 1]);
    });

    it('returns a single-element array when from = to', () => {
        expect(getRange(3, 3)).toEqual([3]);
    });

    it('returns an empty array when `from` is not numbers', () => {
        expect(getRange(NaN, NaN)).toEqual([]);
    });

    it('returns an empty array when `to` is not numbers', () => {
        expect(getRange(NaN, NaN)).toEqual([]);
    });

    it('returns an empty array when `from` and `to` are not numbers', () => {
        expect(getRange(NaN, NaN)).toEqual([]);
    });
});
