import {ShipOrientation} from "../../../models/ShipOrientation";

export function getOrientation(ship: number[]): ShipOrientation {
    return ship.length === 1
        ? ShipOrientation.SingleCell
        : ship[1] - ship[0] === 1
            ? ShipOrientation.Horizontal
            : ShipOrientation.Vertical;
}
