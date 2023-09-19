import classnames from "classnames";
import { useLayoutEffect, useState} from "react";

import {useAnimation} from "../../animation/useAnimation";
import $style from './Bomb.module.scss';

interface BombProps {
    falling?: boolean;
    duration?: number;
}

export function Bomb(props: BombProps = {}) {
    const {shotBombAnimation} = useAnimation();
    const duration = props.duration ?? shotBombAnimation;

    const [bombClass, setClassList] = useState([$style.bomb]);
    console.info('props.falling', props.falling)
    useLayoutEffect(() => {
        if (props.falling) {
            setClassList([$style.bomb, $style.falling])
            const timeout = setTimeout(() => {
                console.warn('reset')
                setClassList([$style.bomb])
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [duration, props.falling])

    return (
        <div
            style={{
                animationDuration: `${duration}ms`,
            }}
            className={classnames(bombClass)}
        />
    );
}
