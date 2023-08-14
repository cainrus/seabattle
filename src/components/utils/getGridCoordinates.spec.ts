import { getGridCoordinates } from './getGridCoordinates';

describe('getGridCoordinates', () => {
    const gridSize = 3;
    it('should return correct coordinates for id=0 in a 3x3 grid', () => {
        const result = getGridCoordinates(gridSize, 0);
        expect(result).toEqual({ column: 1, row: 1 });
    });

    it('should return correct coordinates for id=1 in a 3x3 grid', () => {
        const result = getGridCoordinates(gridSize, Math.pow(gridSize, 2) - 1);
        expect(result).toEqual({ column: 3, row: 3 });
    });
});
