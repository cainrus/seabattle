import {to} from "@react-spring/web";
import classnames from "classnames";
import {GridArea} from "../GridArea/GridArea";

import $style from "./Ship.module.scss";

import {getGridCoordinates} from "../utils/getGridCoordinates";
import {ShipOrientation} from "../../models/ShipOrientation";

import ShipCell from "./ShipCell";
import {getOrientation} from "./utils/getOrientation";

interface ShipProps {
    gridSize: number,
    ship: number[]
    isDestroyed?: boolean,
    damages?: number[]
}

const orientationClasses: Record<string, string | undefined> = {
    [ShipOrientation.Horizontal]: $style.horizontal,
    [ShipOrientation.Vertical]: $style.vertical,
    [ShipOrientation.SingleCell]: $style.singleCell,
}

function getShipCoords(ship: number[]) {
    const flatShip = ship.sort((a, b) => a - b);
    const x = flatShip.at(0);
    const y = flatShip.at(-1);
    return {x, y};
}

export function Ship({
    ship,
    gridSize,
    damages = [],
    isDestroyed = false
}: ShipProps) {

    const { x, y } = getShipCoords(ship);

    if (x === undefined) throw new Error("x is undefined");
    if (y === undefined) throw new Error("y is undefined");

    const orientation = getOrientation(ship);
    const orientationClass = orientationClasses[getOrientation(ship)];

    const shipCells = ship.map((id) => {
        return <ShipCell
            key={id}
            id={id}
            ship={ship}
            isVisible={isDestroyed}
            orientation={orientation}
            isDamaged={damages.includes(id)}
        />
    })

    return (
        <GridArea
            className={classnames([ $style.ship, orientationClass ])}
            x={x}
            y={y}
            gridSize={gridSize}
        >
            { shipCells }
        </GridArea>
    );
}

