import { getAdjacentCells } from './getAdjacentCells';

describe('getAdjacentCells', () => {
    test('should return adjacent cells for a single-cell ship', () => {
        const gridSize = 5;
        const shipCells = [12]; // Ship at cell (2, 2)
        const expectedAdjacentCells = [6, 7, 8, 11, 13, 16, 17, 18];
        const adjacentCells = getAdjacentCells(shipCells, gridSize);
        expect(adjacentCells).toEqual(expectedAdjacentCells);
    });

    test('should return adjacent cells for a horizontal multi-cell ship', () => {
        const gridSize = 5;
        const shipCells = [11, 12, 13]; // Ship at cells (2, 1), (2, 2), (2, 3)
        const expectedAdjacentCells = [5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19];
        const adjacentCells = getAdjacentCells(shipCells, gridSize);
        expect(adjacentCells).toEqual(expectedAdjacentCells);
    });



    test('should return adjacent cells for a vertical multi-cell ship', () => {
        const gridSize = 5;
        const shipCells = [7, 12, 17]; // Ship at cells (1, 2), (2, 2), (3, 2)
        const expectedAdjacentCells = [1, 2, 3, 6, 8, 11, 13, 16, 18, 21, 22, 23];
        const adjacentCells = getAdjacentCells(shipCells, gridSize);
        expect(adjacentCells).toEqual(expectedAdjacentCells);
    });


    test('should handle ship at grid boundaries', () => {
        const gridSize = 5;
        const shipCells = [0, 5]; // Ship at cells (0, 0), (1, 0)
        const expectedAdjacentCells = [1, 6, 10, 11];
        const adjacentCells = getAdjacentCells(shipCells, gridSize);
        expect(adjacentCells).toEqual(expectedAdjacentCells);
    });

});
