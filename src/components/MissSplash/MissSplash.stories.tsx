import { StoryFn, Meta} from "@storybook/react";
import {useState, useEffect} from 'react';
import {initialAnimationState} from "../../animation/AnimationContext";

import GridCell from "../GridCell/GridCell";
import {MissSplash} from "./MissSplash";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
    title: 'Example/MissSplash',
    component: MissSplash,
    // tags: ['autodocs'],
    decorators: [
        (Story) => (
            <GridCell>
                <Story/>
            </GridCell>
        ),
    ],
    args: {
        duration: initialAnimationState.missSplashAnimation,
    },
    argTypes: {
        duration: {
            control: {
                step: 50,
                type: 'number',
                min: 100,
                max: 1000,
            },
        },
    },
};

export default meta;

export const Default: StoryFn<typeof meta> = (args) => {
    const [key, setKey] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1)
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <MissSplash key={key} {...args}/>;
}

