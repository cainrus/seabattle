export enum GridCellType {
    MENU,
    BATTLEFIELD,
    HORIZONTAL_RULER,
    VERTICAL_RULER,
}

const gridCellTypes: number[] = Object.values(GridCellType).reduce((acc, v) => {
    return typeof v === 'number' ? [ ...acc, v] : acc;
}, [] as number[])

export function isGridCellType(type: unknown): type is GridCellType {
    return typeof type === 'number' && gridCellTypes.includes(type);
}
