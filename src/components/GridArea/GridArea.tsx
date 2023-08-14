import {getGridCoordinates} from "../utils/getGridCoordinates";

interface GridAreaProps {
    x: number,
    y: number,
    gridSize: number,
    children: JSX.Element | JSX.Element[],
    className?: string
}

export function GridArea({
                      x,
                      y,
                      gridSize,
                      children,
                      className,
                  }: GridAreaProps) {
    const fromCoordinates = getGridCoordinates(gridSize, x);
    const toCoordinates = getGridCoordinates(gridSize, y);

    const gridColumnStyles = `${toCoordinates.column} / ${fromCoordinates.column + 1 }`;
    const gridRowStyles = `${toCoordinates.row} / ${fromCoordinates.row + 1 }`;

    return (
        <div
            className={className}

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
