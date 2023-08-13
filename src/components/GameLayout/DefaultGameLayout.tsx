import { useContext } from "react";
import StoreContext from "../../store/StoreContext";
import { useGameLayoutProps } from "./useGameLayoutProps";
import GameLayout from "./GameLayout";

export default function DefaultGameLayout() {
    const { state } = useContext(StoreContext);
    const props = useGameLayoutProps(state);
    return <GameLayout {...props}></GameLayout>
}



// import {useContext, useMemo} from "react";
// import type {GridFieldProps} from "./GridFieldProps";
// import {getAdjacentCells} from "../../helpers/getAdjacentCells";
//
// import StoreContext from "../../store/storeContext";

