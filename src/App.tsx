import React, {useContext} from 'react'
import GameSettings from "./components/GameSettings/GameSettings";
import DefaultGameLayout from "./components/GameLayout/DefaultGameLayout";
import View from "models/View";
import './App.css'
import StoreContext from "./store/storeContext";

function App() {

    const {state, dispatch} = useContext(StoreContext);


    function getView() {
        switch (state.view) {

            case View.GameSettings:
                return <GameSettings/>;
            case View.GameBoard:
            default:
                return <DefaultGameLayout/>;
        }
    }

    return (
    <>
      <p>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
