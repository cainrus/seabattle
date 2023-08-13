export function getAdjacentCells(shipCells: number[], gridSize: number): number[] {
    const sortedShipCells = shipCells.sort((a, b) => a - b);

    const gridSizeSquare = gridSize * gridSize;

    return sortedShipCells
        .flatMap((id) => {
            const top = id - gridSize;
            const bottom = id + gridSize;
            const left = id % gridSize === 0 ? null : id - 1;
            const right = id % gridSize === gridSize - 1 ? null : id + 1;
            const topLeft = left === null || top < 0 ? null : top - 1;
            const topRight = right === null || top < 0 ? null : top + 1;
            const bottomLeft = left === null || bottom >= gridSizeSquare ? null : bottom - 1;
            const bottomRight = right === null || bottom >= gridSizeSquare ? null : bottom + 1;

            return [
                top, bottom, left, right,
                topLeft, topRight, bottomLeft, bottomRight,
            ].filter((val): val is number => val !== null);
        })
        .sort((a, b) => a - b)
        .filter((id, index, self) => (
            id >= 0 &&
            self.indexOf(id) === index
            && !shipCells.includes(id)
        ));

}
