import {State} from "../store/State";

type PlayerState = State['players'][number];
export function getCurrentPlayerState(state: State): PlayerState {
    return state.players[state.currentPlayer];
}