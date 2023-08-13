import { ActionTypes } from "../../store/Action";
import { getInitialState } from "../../store/getInitialState";
import StoreProvider from "../../store/StoreProvider";
import { storeReducer } from "../../store/storeReducer";
import GameSettings from './GameSettings';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
    title: 'Example/GameSettings',
    component: GameSettings,
    tags: ['autodocs'],
    argTypes: {
        id: {description: 'cell id', control: {type: 'number', min: 0, max: 100, step: 1}},
    },
};

export const DefaultGameSettings = () => {
    return (
        <StoreProvider>
            <GameSettings/>
        </StoreProvider>
    );
}

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const InvalidFleetSizeGameSettings = () => {
//   const initialState = storeReducer(
//       getInitialState({
//         gameSettings: {
//           isLoading: false,
//           errors: [],
//           fleetSizes: [4, 4],
//           gridSize: 3,
//         },
//       }),
//       { type: ActionTypes.CLOSE_GAME_SETTINGS }
//   );
//
//   return (
//       <StoreProvider initialState={initialState}>
//         <GameSettings />
//       </StoreProvider>
//   );
// };




