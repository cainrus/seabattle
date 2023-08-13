import { canFleetFitOnGrid } from './canFleetFitOnGrid';

describe('canFleetFitOnGrid', () => {
    test('should return true if the fleet can fit on the grid', () => {
        const gridSize = 3;
        const fleetSize = [1, 1, 1, 1];
        expect(canFleetFitOnGrid(gridSize, fleetSize)).toBe(true);
    });

    test('should return true if the fleet can fit on the grid', () => {
        const gridSize = 3;
        const fleetSize = [3, 3];
        expect(canFleetFitOnGrid(gridSize, fleetSize)).toBe(true);
    });

    test('should return true for an empty fleet', () => {
        const gridSize = 5;
        const fleetSize: number[] = [];
        expect(canFleetFitOnGrid(gridSize, fleetSize)).toBe(true);
    });

    test('should return false if the grid is too small for the fleet', () => {
        const gridSize = 2;
        const fleetSize = [2, 2, 2];
        expect(canFleetFitOnGrid(gridSize, fleetSize)).toBe(false);
    });

    test('should return false for 3x3 grid and 5x1 fleet', () => {
        const gridSize = 3;
        const fleetSize = [1, 1, 1, 1, 1];
        expect(canFleetFitOnGrid(gridSize, fleetSize)).toBe(false);
    });

    test('should return true for a large grid and fleet', () => {
        const gridSize = 10;
        const fleetSize = [5, 4, 3, 3, 2];
        expect(canFleetFitOnGrid(gridSize, fleetSize)).toBe(true);
    });
});
