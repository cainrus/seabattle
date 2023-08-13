import {useContext, useState} from "react";
import {getCellState} from "../GridCell/helpers/getCellState";
import {ActionTypes} from "../../store/Action";
import StoreContext from "../../store/StoreContext";
import {GridCellType} from "../GridCell/GridCellType";
import DoneMenuButton from "../MenuButton/DoneMenuButton";
import GameLayout from "./GameLayout";
import {useGameLayoutProps} from "./useGameLayoutProps";

export function ShipsPlacementGameLayout({ onClose }: {onClose: () => void}) {
    const { state, dispatch } = useContext(StoreContext);
    const props = useGameLayoutProps(state);
    const [isPaused, setPaused] = useState(false);

    console.log(props.ships)
    return (
        <GameLayout
            {...props}
            isPaused={isPaused}
            isSelectable={false}
            onClick={(event) => {
                const {type} = getCellState(event)
                if (!isPaused) {
                    if (type === GridCellType.BATTLEFIELD) {
                        dispatch({type: ActionTypes.GENERATE_SHIPS, player: state.currentPlayer});
                    } else if (type === GridCellType.MENU) {
                        dispatch({type: ActionTypes.NEXT_PLAYER});
                        setPaused(true);
                        onClose()
                    }
                }
            }}
            createMenuButton={() => <DoneMenuButton/>}
        />
    );
}
