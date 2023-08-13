import {useReducer} from 'react';
import type {State} from "./State";
import StoreContext from './StoreContext';

// Import your reducer and initial state
import {storeReducer} from './storeReducer';
import {getInitialState} from './getInitialState';

const identity = function <T>(x: T): T {
    return x;
}

const StoreProvider = ({children, initialState}: { children: React.ReactNode, initialState?: State }) => {
    const [state, dispatch] = useReducer(
        storeReducer,
        initialState || getInitialState(),
        identity
    );

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
