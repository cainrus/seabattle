import getNextPlayerId from "../helpers/getNextPlayerId";
import {generateShips} from "../helpers/generateShips";
import {updateObjectProperties} from "../helpers/reduce";
import {replaceArrayItem} from "../helpers/reduce/replaceArrayItem";
import {updateArrayItems} from "../helpers/reduce/updateArrayItems";
import {createGameSettingsState} from "./getInitialState";
import type {Action} from "./Action";
import {ActionTypes, ChangeGameSettingsActionFleetSize} from "./Action";
import type {GameSettings, State} from "./State";

function updateGridSize(gameSettings: GameSettings, gridSize?: number): GameSettings {
    if (gridSize && gridSize !== gameSettings.gridSize) {
        return { ...gameSettings, gridSize };
    }
    return gameSettings;
}

function updateFleetSizes(gameSettings: GameSettings, fleetSize?: ChangeGameSettingsActionFleetSize): GameSettings {
    if (!fleetSize) return gameSettings;
    const shipSize = fleetSize.value;
    const shipIndex = fleetSize.index;
    if (shipIndex === undefined) return gameSettings;
    const previousShipSize = gameSettings.fleetSizes[shipIndex];
    if (shipSize !== previousShipSize) {
        const fleetSizes = replaceArrayItem(
            gameSettings.fleetSizes,
            shipIndex,
            shipSize,
        );
        if (!fleetSizes.length) {
            return gameSettings;
        }
        console.log('update from', gameSettings.fleetSizes, 'to', fleetSizes)
        return { ...gameSettings, fleetSizes };
    }
    return gameSettings;
}

export const storeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.RESET_GAME_SETTINGS: {
            return updateObjectProperties(state, {
                gameSettings: updateObjectProperties(state.gameSettings, createGameSettingsState())
            })
        }
        // case ActionTypes.CHANGE_VIEW: {
        //     return updateObjectProperties(state, {
        //
        //     })
        // }
        case ActionTypes.STOP_LOADING_GAME_SETTINGS: {
            return updateObjectProperties(state, {
                gameSettings: updateObjectProperties(state.gameSettings, {
                    isLoading: false
                })
            });
        }
        case ActionTypes.START_LOADING_GAME_SETTINGS: {
            return updateObjectProperties(state, {
                gameSettings: updateObjectProperties(state.gameSettings, {
                    isLoading: true
                })
            });
        }
        case ActionTypes.REMOVE_ERROR: {
            return updateObjectProperties(state, {
                gameSettings: updateObjectProperties(state.gameSettings, {
                    errors: state.gameSettings.errors.includes(action.error)
                        ? state.gameSettings.errors.filter(error => error !== action.error)
                        : state.gameSettings.errors,
                })
            });
        }
        case ActionTypes.ADD_ERROR: {
            return updateObjectProperties(state, {
                gameSettings: updateObjectProperties(state.gameSettings, {
                    errors: state.gameSettings.errors.includes(action.error)
                        ? state.gameSettings.errors
                        : state.gameSettings.errors.concat(action.error),
                })
            });
        }

        // case ActionTypes.OPEN_GAME_SETTINGS: {
        //     return updateObjectProperties(state, {
        //         gameSettings: updateObjectProperties(state.gameSettings, {
        //             isClosed: false
        //         })
        //     });
        // }
        //
        // case ActionTypes.CLOSE_GAME_SETTINGS: {
        //     return updateObjectProperties(state, {
        //         gameSettings: updateObjectProperties(state.gameSettings, {
        //             isClosed: true
        //         })
        //     });
        // }

        case ActionTypes.CHANGE_GAME_SETTINGS: {
            let gameSettingsUpdate = state.gameSettings;
            if (gameSettingsUpdate.isLoading) return state;

            gameSettingsUpdate = updateGridSize(gameSettingsUpdate, action.gridSize);
            gameSettingsUpdate = updateFleetSizes(gameSettingsUpdate, action.fleetSize);
            return updateObjectProperties(state, {
                gameSettings: gameSettingsUpdate
            })
        }

        case ActionTypes.GENERATE_SHIPS:
            return updateObjectProperties(state, {
                players: updateArrayItems(state.players, ((itemState) => {
                    return itemState.player === action.player ? {
                        ...itemState,
                        ships: generateShips(state.gameSettings.gridSize, state.gameSettings.fleetSizes),
                    } : itemState;
                })),
            });
        case ActionTypes.NEXT_PLAYER: {
            return {
                ...state,
                currentPlayer: getNextPlayerId(state)
            }
        }

        case ActionTypes.SHOT: {
            const id = action.cell;
            return updateObjectProperties(state, {
                players: updateArrayItems(state.players, (playerState) => {
                    return playerState.player === action.player
                        ? updateObjectProperties(playerState, {
                            shoots: playerState.shoots.includes(id)
                                ? playerState.shoots
                                : playerState.shoots.concat(id),


                        }) : playerState;
                })
            });
        }
        case ActionTypes.SHOW_SHIPS:
            return updateObjectProperties(state, {
                players: updateArrayItems(state.players, ((itemState) => {
                    return itemState.player === action.player ? {
                        ...itemState, showShips: action.value,
                    } : itemState;
                }))
            });

        default:
            return state;
    }
}

