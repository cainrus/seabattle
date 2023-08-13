import {GridCellType} from "../GridCellType";
import {ShipOrientation} from "../../../models/ShipOrientation";

export interface GridCellDataSet {
    [`incognito`]?: 1 | 0;
    [`ship-sprite`]?: number;
    orientation?: ShipOrientation | undefined,
    row?: number,
    column?: number,
    type: GridCellType,
}
