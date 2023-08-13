import type {GameSettingsErrors} from "./State";

export const enum ActionTypes {
    GENERATE_SHIPS,
    SHOT,
    NEXT_PLAYER,
    SHOW_SHIPS,
    CHANGE_GAME_SETTINGS,
    RESET_GAME_SETTINGS,
    CLOSE_GAME_SETTINGS,
    OPEN_GAME_SETTINGS,
    STOP_LOADING_GAME_SETTINGS,
    START_LOADING_GAME_SETTINGS,
    ADD_ERROR,
    REMOVE_ERROR,
    CHANGE_VIEW,
}

interface BaseAction<T = ActionTypes> {
    type: T;
}


// Define action types
interface GenerateShipsAction extends BaseAction {
    type: ActionTypes.GENERATE_SHIPS;
    player: number;
};

interface ShotAction extends BaseAction {
    type: ActionTypes.SHOT;
    player: number;
    cell: number;
}

interface ShowShipsAction extends BaseAction {
    type: ActionTypes.SHOW_SHIPS;
    player: number;
    value: boolean;
};

export interface ChangeGameSettingsActionFleetSize {
    index: number;
    value: number | undefined;
}

interface ChangeGameSettingsAction extends BaseAction {
    type: ActionTypes.CHANGE_GAME_SETTINGS;
    gridSize?: number;
    fleetSize?: ChangeGameSettingsActionFleetSize;
}



interface CloseGameSettingsAction extends BaseAction  {
    type: ActionTypes.CLOSE_GAME_SETTINGS;
}

interface OpenGameSettingsAction extends BaseAction  {
    type: ActionTypes.OPEN_GAME_SETTINGS;
}

interface RemoveGameSettingsErrors extends BaseAction  {
    type: ActionTypes.REMOVE_ERROR;
    error: GameSettingsErrors
}

interface AddGameSettingsErrors extends BaseAction  {
    type: ActionTypes.ADD_ERROR;
    error: GameSettingsErrors;
}
interface StopLoadingGameSettings extends BaseAction  {
    type: ActionTypes.STOP_LOADING_GAME_SETTINGS;
}
interface StartLoadingGameSettings extends BaseAction  {
    type: ActionTypes.START_LOADING_GAME_SETTINGS;
}

// interface ChangeView extends BaseAction  {
//     type: ActionTypes.CHANGE_VIEW;
//     view: Views
// }

interface NextPlayerView extends BaseAction  {
    type: ActionTypes.NEXT_PLAYER;
}
interface ResetGameSettings extends BaseAction  {
    type: ActionTypes.RESET_GAME_SETTINGS;

}

// Define a union type for all possible actions
export type Action = GenerateShipsAction
    | ResetGameSettings
    | NextPlayerView
    // | ChangeView
    | ShotAction
    | ShowShipsAction
    | OpenGameSettingsAction
    | CloseGameSettingsAction
    | ChangeGameSettingsAction
    | AddGameSettingsErrors
    | RemoveGameSettingsErrors
    | StopLoadingGameSettings
    | StartLoadingGameSettings
