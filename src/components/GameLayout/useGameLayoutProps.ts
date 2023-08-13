import {useMemo} from "react";
import intersects from "../../utils/intersects";

import {GameLayoutProps} from "./GameLayoutProps";
import {State} from "../../store/State";
import {getAdjacentCells} from "../../helpers/getAdjacentCells";


export function useGameLayoutProps(state: State): GameLayoutProps {
    const {
        players,
        currentPlayer,
        gameSettings,
    } = state;

    const { gridSize } = gameSettings;

    const playerState = players[currentPlayer];
    const { showShips, shoots } = playerState;

    const damagedShips = playerState.ships
        .filter((ship) => intersects([ship, shoots]))
        .filter((ship) => ship.some((cell) => !shoots.includes(cell)))

    // console.log(`showShips`, showShips)
    // console.log(`playerState.ships`, playerState.ships)
    const ships = useMemo(() => showShips
        ? playerState.ships
        : playerState.ships.map((ship) => ship.filter(id => shoots.includes(id))), [playerState.ships, shoots, showShips])

    const damages = ships.flat().filter((cell) => shoots.includes(cell))




    const destroyedShips = useMemo(() => playerState.ships.flat()
        .filter((cell) =>  playerState.shoots.includes(cell)), [playerState.ships, playerState.shoots])

    const destroyed: boolean[] = ships.map((ship) => ship.every(cell => damages.includes(cell)))


    const safe = ships
        .filter(ship => ship.every(cell => playerState.shoots.includes(cell)))
        .map(ship => getAdjacentCells(ship, gameSettings.gridSize))
    //
    // const safe = useMemo(() => getAdjacentCells(destroyedShips, gameSettings.gridSize), [
    //     destroyedShips, gameSettings.gridSize
    // ])

    return {
        targets: [],
        isPaused: false,
        safe,
        ships,
        damages,
        destroyed,
        shoots: playerState.shoots,
        isLoading: gameSettings.isLoading,
        isSelectable: true,
        gridSize,
        damagedShips,
    }
}
