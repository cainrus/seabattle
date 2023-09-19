import {uniq} from "lodash-es";

import {Bomb} from "../Bomb/Bomb";
import {GridArea} from "../GridArea/GridArea";
import {Ship} from "../Ship/Ship";

interface BattleFieldObjectsProps {
    gridSize: number;
    ships: number[][];
    shots: number[];
    bombs?: number[],
    targets: number[];
    destroyed?: boolean[];
}


export function BattleFieldObjects({
    targets,
    gridSize,
    shots,
    ships,
    bombs = [],
    destroyed = [],
    // isSelectable,
    // onClick,
}: BattleFieldObjectsProps) {


    const groups: JSX.Element[] = [];


    for (const ship of ships) {
        if (ship.length === 0) continue;
        const index = ships.indexOf(ship);
        groups.push(<Ship
            key={`ship-${index}`}
            ship={ship}
            isDestroyed={destroyed[index]}
            damages={ship.filter(id => shots.includes(id))}
            gridSize={gridSize}
        />)
    }

    const misses = shots.filter(id => ships.every(ship => !ship.includes(id)));
    for (const id of uniq([...misses, ...bombs])) {
        groups.push(
            <GridArea
                key={`area-${id}`}
                gridSize={gridSize}
                x={id}
                y={id}
            >
                <Bomb key={`bomb-${id}`} falling={!misses.includes(id)} />
            </GridArea>
        );
    }


    return <>{groups}</>;
}
