import type {Meta, StoryFn} from '@storybook/react';
import View from "../../models/View";

import AnimationProvider from "../../animation/AnimationProvider";
import {AttackGameLayout} from "./AttackGameLayout";
import {ShipsPlacementGameLayout} from "./ShipsPlacementGameLayout";
import StoreProvider from "../../store/StoreProvider";

import {
    createPlayersState,
    getInitialState,
    createBattleState,
    createGenerationState
} from "../../store/getInitialState";
import {PlayerState, State} from "../../store/State";

import GameLayout from './GameLayout';

import {useGameLayoutProps} from "./useGameLayoutProps";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
type Story = StoryFn<typeof GameLayout>;

const meta: Meta<typeof GameLayout> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Example/GameLayout',
    component: GameLayout,
    tags: ['autodocs'],
    argTypes: {
        isSelectable: {description: 'Toggle interactivity', control: 'boolean'},
        gridSize: {description: 'grid size'},
    },
    args: {
        gridSize: 10,
        safe: [],
        ships: [],
        shoots: [],
        isSelectable: true,
        isLoading: true,

    }
};

export default meta;

function getSinglePlayerState(playerState: Partial<PlayerState> = {}): State {
    return getInitialState({
        players: [
            createPlayersState({
                player: 0,
                ...playerState,
            })
        ]
    })
}



// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EmptyGrid: Story = (args) => {
    const props = {...useGameLayoutProps(getSinglePlayerState()), ...args};
    return <GameLayout {...props}></GameLayout>
};

export const GenerationStage: Story = () => {
    function onClose() {
        console.log(123)
    }
    return <StoreProvider initialState={createGenerationState()}>
        <ShipsPlacementGameLayout onClose={onClose}/>
    </StoreProvider>
}

export const AttackStage: Story = () => {
    function onClose() {
        console.log('close')
    }

    // console.log()

    return <StoreProvider initialState={createBattleState()}>
        <AttackGameLayout onClose={onClose}/>
    </StoreProvider>;
}

export const AttackMiniStage: Story = () => {
    function onClose() {
        console.log('close')
    }

    // console.log()

    return (
        <StoreProvider initialState={{
            players: [
                {
                    ships: [[0], [6], [8, 12]],
                    shoots: [0, 6, 12],
                    showShips: false,
                    player: 0,
                }
            ],
            gameSettings: {
                gridSize: 4,
                isLoading: false,
                fleetSizes: [1, 1],
                errors: []
            },
            currentPlayer: 0,
            view: View.GameBoard,
        }}>
            <AnimationProvider>
                <AttackGameLayout onClose={onClose}/>
            </AnimationProvider>
        </StoreProvider>
    );
}


export const AttackFinalStage: Story = () => {
    function onClose() {
        console.log('close')
    }

    // console.log()

    return (
        <StoreProvider initialState={createBattleState()}>
            <AnimationProvider>
                <AttackGameLayout onClose={onClose}/>
            </AnimationProvider>
        </StoreProvider>
    );
}
