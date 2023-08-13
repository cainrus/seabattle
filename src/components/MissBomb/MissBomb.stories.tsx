import { StoryFn, Meta} from "@storybook/react";
import {useState, useEffect} from 'react';
import {initialAnimationState} from "../../animation/AnimationContext";

import GridCell from "../GridCell/GridCell";
import {MissBomb} from "./MissBomb";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
    title: 'Example/MissBomb',
    component: MissBomb,
    // tags: ['autodocs'],
    decorators: [
        (Story) => (
            <GridCell>
                <Story/>
            </GridCell>
        ),
    ],
    args: {
        falling: false,
    },
    argTypes: {
        falling: {
            control: {
                type: 'boolean',
            }
        },
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
    return <MissBomb key={1} {...args}/>;
}

