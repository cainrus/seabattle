import {ShipOrientation} from "../../models/ShipOrientation";
import type {GridCellProps} from "../GridCell/GridCellProps";
import {ShipCellFire} from "../ShipCellFire/ShipCellFire";
import GridCell from "../GridCell/GridCell";
import $style from "./Ship.module.scss";
import {getShipSpriteIndex} from "./utils/getShipSpriteIndex";

interface ShipCellProps extends Omit<GridCellProps, 'isShip'> {
    id: number,
    ship: number[],
    orientation: ShipOrientation
    isDamaged?: boolean
    isVisible?: boolean
}

/**
 * Renders a single ship cell of whole ship
 */
export default function ShipCell(props: ShipCellProps) {
    const {
        ship,
        classList=[],
        orientation,
        isVisible = true,
        ...restProps
    } = props;

    const children: JSX.Element[] = [];
    if (isVisible) {
        children.push(
            <div
                key={'ship'}
                className={$style.ship__cell}
                data-ship-sprite-index={getShipSpriteIndex(ship, props.id)}
            ></div>
        )
    }



    if (restProps.isDamaged) {
        children.push(
            <ShipCellFire key={'fire'}/>
        )
    }

    if (orientation === ShipOrientation.Horizontal) classList.push($style.cell__horizontal);
    if (orientation === ShipOrientation.SingleCell) classList.push($style.cell__single);

    return (
        <GridCell
            {...restProps}
            classList={[
                ...classList
            ]}
        >
            {children}
        </GridCell>
    );
}
