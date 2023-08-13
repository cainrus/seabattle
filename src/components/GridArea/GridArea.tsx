import {getGridCoordinates} from "../utils/getGridCoordinates";

interface GridAreaProps {
    x: number,
    y: number,
    gridSize: number,
    children: JSX.Element | JSX.Element[],

}

export function GridArea({
                      x,
                      y,
                      gridSize,
                      children
                  }: GridAreaProps) {
    const fromCoordinates = getGridCoordinates(gridSize, x);
    const toCoordinates = getGridCoordinates(gridSize, y);
    const gridColumnStyles = `${fromCoordinates.column} / ${toCoordinates.column + 1}`;
    const gridRowStyles = `${fromCoordinates.row} / ${toCoordinates.row + 1}`;

    return (
        <div
            style={{
                flexFlow: x - y < gridSize ? 'row' : 'column',
                gridColumn: gridColumnStyles,
                gridRow: gridRowStyles,
            }}
        >
            {children}
        </div>
    );
}
