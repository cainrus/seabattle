import {useAnimation} from "../../animation/useAnimation";
import $style from './MissSplash.module.scss';

interface MissSplashProps {
    duration?: number;
}

export function MissSplash(props: MissSplashProps = {}) {
    const {missSplashAnimation} = useAnimation();
    return (
        <div
            style={{
                animationDuration: `${props.duration || missSplashAnimation}ms`,
            }}
            className={$style.splash}
        />
    );
}
