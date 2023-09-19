import {SyntheticEvent} from "react";
import ButtonProps from "../MenuButton/ButtonProps";

export type GameLayoutProps = {
    safe: number[][],
    bombs?: number[],
    ships: number[][],
    damagedShips: number[][],
    destroyed: boolean[]
    targets: number[],
    shoots: number[],
    damages: number[],
    isSelectable: boolean,
    gridSize: number,
    isLoading: boolean,
    isPaused: boolean,
    onTarget?: (id: number) => void;
    onClick?: (event: SyntheticEvent<HTMLElement>) => void;
    createMenuButton?: (props?: Partial<ButtonProps>) => JSX.Element
};
