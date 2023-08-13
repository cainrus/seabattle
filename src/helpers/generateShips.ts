import {getDefaultShips} from "../models/defaults";

/**
 * Determines whether a ship can be validly placed on a grid without violating placement rules.
 * The placement rules are as follows:
 * 1. Ships cannot be placed outside the grid boundaries.
 * 2. Ships cannot overlap with other ships.
 * 3. Ships cannot be placed in direct contact with other ships, either orthogonally or diagonally.
 *
 * @param ships - An array of ships, where each ship is represented as an array of [row, col] coordinates.
 * @param gridSize - The size of the grid (both width and height) on which the ships are placed.
 * @param ship - The size (length) of the ship being placed.
 * @param row - The starting row coordinate for the placement of the ship.
 * @param col - The starting column coordinate for the placement of the ship.
 * @param isHorizontal - A boolean indicating the orientation of the ship.
 * If true, the ship is placed horizontally; if false, vertically.
 * @returns A boolean indicating whether the ship can be validly placed on the grid.
 * Returns true if the placement is valid, false otherwise.
 */
export const isValidPlacement = (ships: number[][][], gridSize: number, ship: number, row: number, col: number, isHorizontal: boolean) => {
    for (let i = 0; i < ship; i++) {
        const newRow = row + (isHorizontal ? 0 : i);
        const newCol = col + (isHorizontal ? i : 0);

        if (
            newRow < 0 ||
            newRow >= gridSize ||
            newCol < 0 ||
            newCol >= gridSize ||
            ships.some((s) =>
                s.some(
                    (cell) =>
                        Math.abs(cell[0] - newRow) <= 1 && Math.abs(cell[1] - newCol) <= 1
                )
            )
        ) {
            return false;
        }
    }
    return true;
};

export function generateShips(gridSize: number, shipSizes: number[] = getDefaultShips()): number[][] {
    // const shipSizes = [...defaultShips];
    const ships = [];


    for (const size of shipSizes) {
        let placed = false;

        while (!placed) {
            const isHorizontal = Math.random() < 0.5;
            const row = Math.floor(Math.random() * (isHorizontal ? gridSize : gridSize - size + 1));
            const col = Math.floor(Math.random() * (isHorizontal ? gridSize - size + 1 : gridSize));

            if (isValidPlacement(ships, gridSize, size, row, col, isHorizontal)) {
                const newShip = [];
                for (let i = 0; i < size; i++) {
                    const newRow = row + (isHorizontal ? 0 : i);
                    const newCol = col + (isHorizontal ? i : 0);
                    newShip.push([newRow, newCol]);
                }
                ships.push(newShip);
                placed = true;
            }
        }
    }

    return ships.map((ship) =>
        ship.map(([row, col]) => row * gridSize + col)
    );
}
