import {getGridCoordinates} from "../utils/getGridCoordinates";

interface GridAreaProps {
    x: number,
    y: number,
    gridSize: number,
    children: JSX.Element | JSX.Element[],
    className?: string
}

export function GridArea({
    gridSize,
    children,
    className,
    ...props
}: GridAreaProps) {

    const { x, y } = props;

    const fromCoordinates = getGridCoordinates(gridSize, x);
    const toCoordinates = getGridCoordinates(gridSize, y);

    const gridColumnStyles = `${fromCoordinates.column} / ${toCoordinates.column + 1 }`;
    const gridRowStyles = `${fromCoordinates.row} / ${toCoordinates.row + 1 }`;

    return (
        <div
            className={className}
            style={{
                flexFlow: Math.abs(y - x) >= gridSize ? 'column' :  'row',
                gridColumn: gridColumnStyles,
                gridRow: gridRowStyles,
            }}
        >
            { children }
        </div>
    );
}
