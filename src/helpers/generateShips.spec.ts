import {getDefaultShips} from "../models/defaults";
import {generateShips, isValidPlacement} from './generateShips';

describe('isValidPlacement', () => {
    test('should return false if ship is out of bounds', () => {
        const ships: number[][][] = [];
        const gridSize = 5;
        const shipSize = 3;
        const row = 4;
        const col = 3;
        const isHorizontal = true;
        expect(isValidPlacement(ships, gridSize, shipSize, row, col, isHorizontal)).toBe(false);
    });

    test('should return false if ship overlaps with another ship', () => {
        const ships = [[
            [1, 1], [1, 2], [1, 3]
        ]];
        const gridSize = 5;
        const shipSize = 3;
        const row = 0;
        const col = 2;
        const isHorizontal = true;
        expect(isValidPlacement(ships, gridSize, shipSize, row, col, isHorizontal)).toBe(false);
    });

    test('should return true if ship placement is valid', () => {
        const ships = [[
            [1, 1], [1, 2], [1, 3]
        ]];
        const gridSize = 5;
        const shipSize = 3;
        const row = 3;
        const col = 0;
        const isHorizontal = true;
        expect(isValidPlacement(ships, gridSize, shipSize, row, col, isHorizontal)).toBe(true);
    });
});

describe('generateShips', () => {
    test('should generate valid ship placements', () => {
        const gridSize = 10;
        const shipSizes = getDefaultShips();
        const ships = generateShips(gridSize, shipSizes);

        // Check that the number of ships generated matches the number of ship sizes
        expect(ships.length).toBe(shipSizes.length);

        // Check that each ship has the correct size
        ships.forEach((ship, index) => {
            expect(ship.length).toBe(shipSizes[index]);
        });

        // Check that ships do not overlap or touch each other
        const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
        ships.forEach((ship) => {
            ship.forEach((cell) => {
                const row = Math.floor(cell / gridSize);
                const col = cell % gridSize;
                expect(grid[row][col]).toBe(0);
                grid[row][col] = 1;
            });
        });
    });
});
