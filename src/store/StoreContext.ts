import { createContext } from 'react';
import { Action } from './Action';
import { State } from './State';
import { getInitialState } from './getInitialState';


type StoreContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

const StoreContext = createContext<StoreContextType>({ state: getInitialState(), dispatch: () => ({}) });

export default StoreContext;
