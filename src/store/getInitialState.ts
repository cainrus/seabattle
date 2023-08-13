import {shuffle} from "lodash-es";
import {generateShips} from "../helpers/generateShips";
import getRange from "../helpers/getRange";
import {defaultGridSize, getDefaultFleetSize} from "../models/defaults";
import View from "../models/View";
import type {State} from './State';

// function createPlayerState(state: State, playerId: number): {}


function getShoots({
                       ships,
                       gridSize,
                       destroyedCount = 1,
                       damagedCount = 2,
                       missesCount = 5,
                   }: {
    destroyedCount?: number,
    damagedCount?: number,
    missesCount?: number,
    gridSize: number,
    ships: number[][],
}) {
    const cells = getRange(0, gridSize * gridSize - 1);
    const shuffledShips = shuffle(ships);

    const destroyedShips = shuffledShips
        .slice(0, destroyedCount)
        .flat();
    const damagedShips = shuffledShips
        .slice(destroyedCount, damagedCount)
        .flatMap((shipCells) => shuffle(shipCells).slice(0, Math.round(Math.random() * shipCells.length)))
    const hits = [...damagedShips, ...destroyedShips];
    const misses = shuffle(cells).reduce<number[]>((acc, cell) =>
        !hits.includes(cell)
        && acc.length < missesCount
            ? ([...acc, cell])
            : acc, []);

    return [...hits, ...misses];

}

function createMiddleGamePlayersState({ player, gridSize, fleetSizes }: { player: number, gridSize: number, fleetSizes: number[] }): State['players'][number] {
    const ships = generateShips(gridSize, fleetSizes);
    const shoots = getShoots({ships, gridSize})
    return createPlayersState({
        player,
        shoots,
        ships,
    });
}

export function createBattleState(): State {
    const gameSettings = createGameSettingsState();
    const { gridSize, fleetSizes } = gameSettings;
    const players = []
    players.push(createMiddleGamePlayersState({
        player: 0,
        gridSize,
        fleetSizes,
    }))
    players.push(createMiddleGamePlayersState({
        player: 1,
        gridSize,
        fleetSizes,
    }))
    return {
        currentPlayer: 0,
        view: View.GameBoard,
        gameSettings,
        players,
    };
}

export function createGenerationState(): State {
    const gameSettings = createGameSettingsState();
    const players = []
    players.push(createPlayersState({
        player: 0,
        showShips: true,
    }))
    return {
        currentPlayer: 0,
        view: View.GameBoard,
        gameSettings,
        players,
    };
}


export function createGameSettingsState(patch: Partial<State['gameSettings']> = {}): State['gameSettings'] {
    return {
        isLoading: false,
        errors: [],
        fleetSizes: getDefaultFleetSize(),
        gridSize: defaultGridSize,
        ...patch,
    }
}

export function createPlayersState(data: Partial<State['players'][number]> & { player: number }, getShips: () => number[][] = () => ([])): State['players'][number] {
    return {
        showShips: false,
        ships: data.ships || getShips(),
        shoots: [],
        ...data,
    }
}

export function getInitialState(patch: Partial<State> = {}): State {
    let player = 0;
    const gridSize = patch.gameSettings?.gridSize || defaultGridSize;

    const getShips = () => {
        return generateShips(gridSize, getDefaultFleetSize());
    };

    return {
        currentPlayer: 0,
        view: View.GameBoard,
        ...patch,
        gameSettings: createGameSettingsState(patch.gameSettings),
        players: patch.players || [
            createPlayersState({player: player++}, getShips),
            createPlayersState({player: player++}, getShips)
        ],

    }
}
