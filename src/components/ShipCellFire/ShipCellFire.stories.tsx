import { StoryFn, Meta} from "@storybook/react";
import {useState, useEffect} from 'react';
import {initialAnimationState} from "../../animation/AnimationContext";

import GridCell from "../GridCell/GridCell";
import {ShipCellFire} from "./ShipCellFire";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
    title: 'Example/ShipCellFire',
    component: ShipCellFire,
    // tags: ['autodocs'],
    decorators: [
        (Story) => (
            <GridCell>
                <Story/>
            </GridCell>
        ),
    ]
};

export default meta;

export const Default: StoryFn<typeof meta> = (args) => {
    return <ShipCellFire key={1} {...args}/>;
}

