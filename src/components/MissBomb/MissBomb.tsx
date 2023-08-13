import classnames from "classnames";
import {useEffect, useState} from "react";

import {useAnimation} from "../../animation/useAnimation";
import $style from './MissBomb.module.scss';

interface MissBombProps {
    falling?: boolean;
    duration?: number;
}

export function MissBomb(props: MissBombProps = {}) {
    const {shotBombAnimation} = useAnimation();
    const duration = props.duration ?? shotBombAnimation;

    const [bombClass, setClassList] = useState([$style.bomb]);

    useEffect(() => {
        if (props.falling) {
            setClassList([$style.bomb, $style.falling])
            const timeout = setTimeout(() => {
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
