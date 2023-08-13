import AnimationContext, {initialAnimationState} from "./AnimationContext";
import type {AnimationContextType} from "./AnimationContext";

interface AnimationsProviderProps extends Partial<AnimationContextType> {
    children: JSX.Element;
}

const AnimationProvider = ({children, ...overrides }: AnimationsProviderProps) => {
    return (
        <AnimationContext.Provider value={{
            ...initialAnimationState,
            ...overrides,
        }}>
            {children}
        </AnimationContext.Provider>
    );
};

export default AnimationProvider;
