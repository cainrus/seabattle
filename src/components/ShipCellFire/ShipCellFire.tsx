import {useAnimation} from "../../animation/useAnimation";
import $style from './ShipCellFire.module.scss';

interface MissSplashProps {
    duration?: number;
}

export function ShipCellFire(props: MissSplashProps = {}) {
    const {missSplashAnimation} = useAnimation();
    return (
        <div
            style={{
                animationDuration: `${props.duration || missSplashAnimation}ms`,
            }}
            className={$style.fire}
        />
    );
}
