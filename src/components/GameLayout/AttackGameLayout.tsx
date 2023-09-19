import {useContext, useEffect, useState} from "react";
import { useAnimation } from '../../animation/useAnimation'
import {getCellState} from "../GridCell/helpers/getCellState";
import {getAdjacentCellsMemoized} from "../../helpers/getAdjacentCellsMemoized";
import type {PlayerState, State} from "../../store/State";
import getPlayerState from "../../helpers/getPlayerState";
import getNextPlayerId from "../../helpers/getNextPlayerId";
import {ActionTypes} from "../../store/Action";
import StoreContext from "../../store/StoreContext";
import {GridCellType} from "../GridCell/GridCellType";
import DoneMenuButton from "../MenuButton/DoneMenuButton";
import GameLayout from "./GameLayout";
import { useGameLayoutProps } from "./useGameLayoutProps";

function isCellIgnored({state, id}: {state: State, id: number}): boolean {
    const playerState = getPlayerState(state, getNextPlayerId(state))
    return playerState.shoots.includes(id)
        || getDestroyedShipsAdjacentCells(playerState, state.gameSettings.gridSize).includes(id);
}

function getDestroyedShipsAdjacentCells(targetPlayerState: PlayerState, gridSize: number): Array<number> {
    const { ships, shoots } = targetPlayerState;
    const destroyedShips = ships
        .filter(ship => ship.every(cell => shoots.includes(cell)))
    return getAdjacentCellsMemoized(destroyedShips.flat(), gridSize)
}

export function AttackGameLayout({ onClose }: {onClose: () => void}) {
    const { shotBombAnimation, shotTotalAnimation } = useAnimation();
    const [ shots, setShots ] = useState<number[]>([]);
    const [ isUiPaused, setUiPaused ] = useState(false);
    const [ isSelectable, setSelectable ] = useState(true);
    const [ targets, setTargets ] = useState<number[]>([]);
    const [ bombs, setBombs ] = useState<number[]>([]);


    const { state, dispatch } = useContext(StoreContext);
    const props = useGameLayoutProps(state);
    const createMenuButton = targets.length ? () => (<DoneMenuButton/>) : undefined;

    function shootTarget(id: number) {
        if (targets.length) {
            setBombs([...targets]);
            setShots([...targets]);
            setSelectable(false);
            console.log('?')
            setTimeout(() => {
                console.log('!')
                dispatch({
                    type: ActionTypes.SHOT,
                    cell: id,
                    player: getNextPlayerId(state),
                });
            }, shotBombAnimation);

            onClose();
        }
    }

    // TODO: research, do i need cleaning?
    useEffect(() => {
        if (bombs.length) {
            console.log('set bomb 1')
            const timeout = setTimeout(() => {
                console.log('set bomb 2')
                setBombs([]);
            }, shotBombAnimation);
            return () => clearTimeout(timeout);
        }
    }, [ bombs, shotBombAnimation ])

    useEffect(() => {
        if (shots.length) {
            const timeout = setTimeout(() => {
                setUiPaused(true);
            }, shotTotalAnimation)
            return () => clearTimeout(timeout);
        }
    }, [ shots, shotTotalAnimation ]);

    function selectTarget(id: number) {
        if (!isUiPaused && !targets.includes(id)) {
            if (isCellIgnored({ state, id })) {
                setTargets([]);
            } else {
                setTargets([id]);
            }
        }
    }


    return (
        <GameLayout
            {...props}
            bombs={bombs}
            isPaused={isUiPaused}
            isSelectable={isSelectable}
            targets={targets}
            onTarget={(id: number) => {
                selectTarget(id);
            }}
            onClick={(event) => {
                if (!isSelectable) return false;
                const {type, id} = getCellState(event)
                if (type === GridCellType.BATTLEFIELD ) {
                    selectTarget(id);
                } else if (type === GridCellType.MENU) {
                    if (typeof targets[0] === 'number') {
                        shootTarget(targets[0]);
                    }
                }
            }}
            createMenuButton={createMenuButton}
        />
    );
}
