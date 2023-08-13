import {useEffect, useState} from "react";
import {MissSplash} from "../MissSplash/MissSplash";
import {MissBomb} from "../MissBomb/MissBomb";
import {useAnimation} from "../../animation/useAnimation";
import GridCell from "../GridCell/GridCell";
import {getGridCoordinates} from "../utils/getGridCoordinates";
import $style from "./Miss.module.scss";

interface MissProps {
    id: number;
    gridSize: number;
    isAnimation?: boolean;
}

const ANIIMATION_DURATION = 2000;

enum SplashState {
    DISABLED,
    ENABLED,
    ANIMATION,
    HIDDEN,
}

export const Miss = function Miss({
    id,
    gridSize,
    isAnimation = false,
}: MissProps) {
    const {column, row} = getGridCoordinates(gridSize, id)
    const gridColumnStyles = `${column} / ${column}`;
    const gridRowStyles = `${row} / ${row}`;
    const missClassList = [
        $style.miss__bomb,
    ];

    const {
        shotBombAnimation,
    } = useAnimation();

    const [
        splashState,
        setSplashState,
    ] = useState(SplashState.DISABLED);


    if (isAnimation) {
        missClassList.push($style['miss__bomb--falling']);
    }

    const children: JSX.Element[] = [
        <MissBomb falling={isAnimation}/>
    ];

    useEffect(() => {
        if (isAnimation) {
            setTimeout(() => {
                setSplashState(SplashState.ENABLED);
            }, shotBombAnimation);
        }
    }, [isAnimation])

    if (splashState === SplashState.ENABLED) {
        children.push(
            <MissSplash/>
        );
    }

    return (
        <GridCell
            key={`miss-${id}`}
            classList={[$style.miss]}
            style={{
                gridColumn: gridColumnStyles,
                gridRow: gridRowStyles,
            }}
        >
            {children}
        </GridCell>
    );
}
