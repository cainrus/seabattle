import {SyntheticEvent} from "react";
import {getShipAndSafeZone} from "./utils/getShipAndSafeZone";
import {isCellHighlighted} from "./utils/isCellHighlighted";
import GridCell from "../GridCell/GridCell";
import {GridCellDataSetInput} from "../GridCell/GridCellProps";
import {GridCellType} from "../GridCell/GridCellType";
import CellAttackTargetIcon from "../Icon/CellAttackTarget";
import $style from './BattleFieldUnderlay.module.scss'

interface BattleFieldProps {
    gridSize: number;
    shoots: number[];
    targets: number[];
    ships: number[][];
    safe: number[][];
    hovered: {column: number, row: number, id: number};
    destroyed: boolean[];
    isSelectable: boolean;
    onClick?: (event: SyntheticEvent<HTMLElement>) => void;
}


export function BattleFieldUnderlay ({
   targets,
   gridSize,
   shoots,
   ships,
   hovered,
   destroyed,
   safe,
   isSelectable,
   onClick,
}: BattleFieldProps) {
    const cells: JSX.Element[] = [];
    const anySafeZone = safe.flat();

    // const flatShips = ships.flat();
    const hidden: number[] =  [...Array(gridSize * gridSize).keys()]
        .filter(n => !shoots.includes(n) && !anySafeZone.includes(n));

    const highlightedList: number[] = [];
    const destroyedShips: number[] = ships.filter((_, i) => destroyed[i]);
    console.log('safe', safe)
    for (let i = 0; i < gridSize * gridSize; i++) {


        const {
            withinSafeZone,
            withinShip
        } = getShipAndSafeZone({
            ships: ships.filter((_, i) => destroyed[i]),
            safeZones: safe.filter((_, i) => destroyed[i]),
            id: i,
        })


        const classList: string[] = [
            $style.cell,
        ];

        const ship = ships.find(ship => ship.includes(i)) || [];

        const isShip = ship.length > 0;
        const isHit = shoots.includes(i);


        const column = i % gridSize;
        const row = Math.floor(i / gridSize);
        const icon = false && isTarget ? (<CellAttackTargetIcon/>) : null;

        const dataset: GridCellDataSetInput = {
            row,
            column,
            type: GridCellType.BATTLEFIELD,
            // 'incognito': isCellOfDestroyedShip(i) ? 0 : 1,
        }

        const isDamage   = isShip && isHit;
        const isSafe = anySafeZone.includes(i);
        const isHidden = !isSafe && hidden.includes(i);
        const isHovered = isSelectable
            && i === hovered.id
            && !withinSafeZone.includes(i)
            && !withinShip.includes(i)
            && !shoots.includes(hovered.id)

        const isMiss = !isShip && isHit;
        const isHighLighted = isSelectable
            && hovered.id !== undefined
            && (
                // false ||
                isMiss && hovered.id === i // highlight miss cell
                || withinSafeZone.includes(hovered.id) // highlight ship safe zone cell
                || withinShip.includes(hovered.id) // highlight on of ship cells
            )
            && isCellHighlighted({
                id: i,
                gridSize,
                ship: withinShip,
                hovered: hovered.id,
                safe: withinSafeZone,
            })


        if (isHighLighted) {
            highlightedList.push(i);
        }

        const isTarget = isSelectable && !isShip && !isSafe && targets.includes(i);


        if (isHidden && !isTarget) classList.push($style.hidden)
        if (isHighLighted || isHovered) classList.push($style.highlighted)
        if (isHit && !isShip) classList.push($style.miss)
        if (isSafe) classList.push($style.safe)
        if (isMiss) classList.push($style.miss)
        if (isShip) classList.push($style.ship)
        if (isTarget) classList.push($style.target)
        if (isHovered) classList.push($style.hovered)

        cells.push(<GridCell
            key= {i}
            id= {i}
            isHighLighted={isHighLighted}
            isHovered={isHovered}
            isHidden={isHidden}
            isSafe={isSafe}
            type={GridCellType.BATTLEFIELD}
            classList={classList}
            dataset={dataset}
            onClick={onClick}
            isHit={isDamage}
            isTarget={isTarget}
            isShip={false}
        >{icon}</GridCell>);
    }


    return <>{cells}</>;
}
