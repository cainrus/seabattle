import {SyntheticEvent} from "react";
import assert from "../../../guards/assert";
import {GridCellType, isGridCellType} from "../GridCellType";

interface CellState {
    id: number;
    type: GridCellType;
}

export function getCellState(event: SyntheticEvent<HTMLElement>): CellState {
    const dataset = event.currentTarget.dataset;
    const id = dataset.id ? parseInt(dataset.id, 10) : undefined;
    const type = dataset.type ? parseInt(dataset.type, 10) : undefined;
    assert(isGridCellType(type));
    assert(typeof id === 'number');
    return { id, type };
}
