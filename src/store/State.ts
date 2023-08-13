import type View from '../models/View';
export enum GameSettingsErrors {
    InvalidFleet,
}

export interface GameSettings {
    fleetSizes: number[];
    gridSize: number;
    isLoading: boolean,
    errors: GameSettingsErrors[]
}

export type PlayerState = {
    player: number;
    showShips: boolean;
    ships: number[][];
    shoots: number[];
}

export type State = {
    gameSettings: GameSettings;
    currentPlayer: number,
    view: View,
    players: Array<PlayerState>
}
