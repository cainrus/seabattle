import {SyntheticEvent} from "react";
import type {MouseEventHandler} from "react";
import {GridCellDataSet} from "./types/GridCellDataSet";

import type {ShipOrientation} from "../../models/ShipOrientation";


export interface GridCellDataSetInput {
    [`incognito`]?: 1 | 0;
    [`ship-sprite`]?: number;
    orientation?: ShipOrientation | undefined,
    row?: number,
    column?: number,
}

export type GridCellProps = {
    style?: React.CSSProperties;
    onClick?: (event: SyntheticEvent<HTMLElement>) => void;
    onMouseEnter?: MouseEventHandler,
    onMouseLeave?: MouseEventHandler,
    children?: React.ReactNode,
    id?: number,
    classList?: string[],
    dataset?: GridCellDataSet,
}
