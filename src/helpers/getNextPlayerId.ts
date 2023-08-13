import type {State} from "../store/State";

export default function getNextPlayerId(state: State): number {
    const players = state.players.map(({player}) => player);
    return players.length === 1
        ? state.currentPlayer
        : (players.indexOf(state.currentPlayer) + 1) % (state.players.length - 1);
}
