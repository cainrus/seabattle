import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import CellAttackTargetIcon from "src/components/Icon/CellAttackTarget";
import {MissSplash} from "src/components/MissSplash/MissSplash";
import {PaletteTree} from "./palette";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CellAttackTargetIcon">
                <CellAttackTargetIcon/>
            </ComponentPreview>
            <ComponentPreview path="/MissSplash">
                <MissSplash/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
