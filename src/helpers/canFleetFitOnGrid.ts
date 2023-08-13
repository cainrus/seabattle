
type Grid = number[][];

function canPlaceShip(grid: Grid, row: number, col: number, shipSize: number): boolean {
    const directions = [
        [-1, 0], // Up
        [1, 0], // Down
        [0, -1], // Left
        [0, 1], // Right
        [-1, -1], // Up-Left
        [-1, 1], // Up-Right
        [1, -1], // Down-Left
        [1, 1], // Down-Right
    ];

    const isValidCell = (r: number, c: number) => {
        return r >= 0 && r < grid.length && c >= 0 && c < grid.length;
    };

    // Check horizontal placement
    if (col + shipSize <= grid.length) {
        let canPlace = true;
        for (let i = 0; i < shipSize; i++) {
            if (grid[row][col + i] !== 0) {
                canPlace = false;
                break;
            }
            // Check buffer cells around the ship
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + i + dc;
                if (isValidCell(newRow, newCol) && grid[newRow][newCol] !== 0) {
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) return true;
    }

    // Check vertical placement
    if (row + shipSize <= grid.length) {
        let canPlace = true;
        for (let i = 0; i < shipSize; i++) {
            if (grid[row + i][col] !== 0) {
                canPlace = false;
                break;
            }
            // Check buffer cells around the ship
            for (const [dr, dc] of directions) {
                const newRow = row + i + dr;
                const newCol = col + dc;
                if (isValidCell(newRow, newCol) && grid[newRow][newCol] !== 0) {
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) return true;
    }

    return false;
}


function markShip(grid: Grid, row: number, col: number, shipSize: number, isHorizontal: boolean, value: number): void {
    for (let i = 0; i < shipSize; i++) {
        if (isHorizontal) {
            grid[row][col + i] = value;
        } else {
            grid[row + i][col] = value;
        }
    }
}

function placeShips(grid: Grid, fleet: number[], index: number, memo: { [key: string]: boolean } = {}): boolean {
    if (index === fleet.length) {
        return true;
    }

    const shipSize = fleet[index];
    const gridKey = grid.map(row => row.join('')).join(';') + '|' + index;

    if (memo[gridKey] !== undefined) {
        return memo[gridKey];
    }

    // Calculate the total number of cells required by the remaining ships
    const totalCellsRequired = fleet.slice(index).reduce((acc, shipSize) => acc + shipSize, 0);

    // Calculate the number of available cells on the grid
    const availableCells = grid.flatMap(row => row).filter(cell => cell === 0).length;

    // Prune the search tree if there are not enough available cells
    if (totalCellsRequired > availableCells) {
        return false;
    }


    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            // Try horizontal placement if it fits within the grid boundaries
            if (col + shipSize <= grid.length && canPlaceShip(grid, row, col, shipSize)) {
                markShip(grid, row, col, shipSize, true, 1);
                if (placeShips(grid, fleet, index + 1, memo)) {
                    memo[gridKey] = true;
                    return true;
                }
                markShip(grid, row, col, shipSize, true, 0);
            }

            // Try vertical placement if it fits within the grid boundaries
            if (row + shipSize <= grid.length && canPlaceShip(grid, row, col, shipSize)) {
                markShip(grid, row, col, shipSize, false, 1);
                if (placeShips(grid, fleet, index + 1, memo)) {
                    memo[gridKey] = true;
                    return true;
                }
                markShip(grid, row, col, shipSize, false, 0);
            }
        }
    }

    memo[gridKey] = false;
    return false;
}




const cache: Record<string, boolean | undefined> = {};
export function canFleetFitOnGrid(gridSize: number, fleet: number[]): boolean {
    const startTime = performance.now();

    const cacheKey = `${gridSize}>${fleet.join(':')}`;
    const cachedResult = cache[cacheKey];
    if (typeof cachedResult === 'boolean') return cachedResult;

    // Sort the fleet in descending order by ship size
    const sortedFleet = fleet.slice().sort((a, b) => b - a);

    // Check if any ship is larger than the grid size or if the total number of cells exceeds the grid size
    const totalCells = sortedFleet.reduce((acc, shipSize) => acc + shipSize, 0);
    if (sortedFleet.some(shipSize => shipSize > gridSize) || totalCells > gridSize * gridSize) {
        return false;
    }

    const grid: Grid = Array(gridSize)
        .fill(0)
        .map(() => Array(gridSize).fill(0));
    const result = placeShips(grid, sortedFleet, 0);
    cache[cacheKey] = result;

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`Execution time: ${elapsedTime.toFixed(2)} milliseconds`);


    return result;
}
