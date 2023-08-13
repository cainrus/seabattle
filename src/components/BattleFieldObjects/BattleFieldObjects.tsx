import {Bomb} from "../Bomb/Bomb";
import {GridArea} from "../GridArea/GridArea";
import {Miss} from "../Miss/Miss";
import {Ship} from "../Ship/Ship";

interface BattleFieldObjectsProps {
    gridSize: number;
    ships: number[][];
    shots: number[];
    bombs?: number[],
    targets: number[];
}


export function BattleFieldObjects({
    targets,
    gridSize,
    shots,
    ships,
    bombs = [],
    // destroyed,
    // isSelectable,
    // onClick,
}: BattleFieldObjectsProps) {

    const groups: JSX.Element[] = [];

    for (const bomb of bombs) {
        groups.push(
            <GridArea
                key={`bomb-${bomb}`}
                gridSize={gridSize}
                x={bomb}
                y={bomb}
            >
                <Bomb
                    falling={true}
                />
            </GridArea>
        );
    }

    for (const ship of ships) {
        if (ship.length === 0) continue;
        groups.push(<Ship
            key={`ship-${ships.indexOf(ship)}`}
            ship={ship}
            damages={ship.filter(id => shots.includes(id))}
            gridSize={gridSize}
        />)
    }

    const misses = shots.filter(id => ships.every(ship => !ship.includes(id)));

    for (const miss of misses) {
        groups.push(<Miss
            key={`miss-${miss}`}
            id={miss}
            gridSize={gridSize}
            isAnimation={targets.includes(miss)}
        />)
    }


    return <>{groups}</>;
}
