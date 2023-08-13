import {createContext} from 'react';

const shotTotalAnimation = 2000;
const shotBombAnimation = 1500;
const missSplashAnimation = shotTotalAnimation - shotBombAnimation;

export interface AnimationContextType {
    shotTotalAnimation: number;
    shotBombAnimation: number;
    missSplashAnimation: number;

}

export const initialAnimationState: AnimationContextType = {
    shotTotalAnimation,
    shotBombAnimation,
    missSplashAnimation,
}

const AnimationContext = createContext(initialAnimationState);

export default AnimationContext;

