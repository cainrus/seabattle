export function getGridCoordinates(gridSize: number, id: number): {column: number, row: number} {
    const column = 1 + id % gridSize;
    const row = 1 + Math.floor(id / gridSize);
    return {column, row};
}
