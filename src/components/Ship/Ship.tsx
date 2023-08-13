import {to} from "@react-spring/web";
import classnames from "classnames";

import $style from "./Ship.module.scss";

import {getGridCoordinates} from "../utils/getGridCoordinates";
import {ShipOrientation} from "../../models/ShipOrientation";

import ShipCell from "./ShipCell";
import {getOrientation} from "./utils/getOrientation";

interface ShipProps {
    gridSize: number,
    ship: number[]
    isHit?: boolean,
    damages?: number[]
}

const orientationClasses: Record<string, string | undefined> = {
    [ShipOrientation.Horizontal]: $style.horizontal,
    [ShipOrientation.Vertical]: $style.vertical,
    [ShipOrientation.SingleCell]: $style.singleCell,
}

export function Ship({
    ship,
    gridSize,
    damages = [],
    isHit = false
}: ShipProps) {

    const from = ship.at(0);
    const to = ship.at(-1);

    if (from === undefined) throw new Error("from is undefined");
    if (to === undefined) throw new Error("to is undefined");

    const fromCoordinates = getGridCoordinates(gridSize, from);
    const toCoordinates = getGridCoordinates(gridSize, to);
    const gridColumnStyles = `${fromCoordinates.column} / ${toCoordinates.column + 1}`;
    const gridRowStyles = `${fromCoordinates.row} / ${toCoordinates.row + 1}`;

    const orientation = getOrientation(ship);
    const orientationClass = orientationClasses[getOrientation(ship)];

    const shipCells = ship.map((id) => {
        return <ShipCell
            key={id}
            id={id}
            ship={ship}
            orientation={orientation}
            isDamaged={damages.includes(id)}
        />
    })

    return (
        <div
            className={classnames([$style.ship, orientationClass])}
            style={{
                flexFlow: to - from < gridSize ?   'row' : 'column',
                gridColumn: gridColumnStyles,
                gridRow: gridRowStyles,
            }}
        >
            {shipCells}
        </div>
    );
}

