import type { PlayerState, State } from "../store/State";

export default function getPlayerState(state: State, id: number): PlayerState {
    const playerState = state.players.find(({player}) => player === id);
    if (!playerState) throw new Error(`Player ${id} not found`);
    return playerState
}
