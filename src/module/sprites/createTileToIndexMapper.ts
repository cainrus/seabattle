import {isNumber} from "../../guards/isNumber";
import ensure from "../../guards/ensure";
import type {Mask9Bit} from "../masks/types";
import {getIndexFrom9bitMask} from "./getIndexFrom9bitMask";

export function createTileToIndexMapper(tiles: number[][]): (probe: Mask9Bit) => number {
    const values = tiles.flat();
    return (probe: Mask9Bit) => {

        const maskIndex = getIndexFrom9bitMask(probe);
        let tileIndex = values.findIndex((index) => Object.is(index, maskIndex));

        if (tileIndex === -1) {
            const sortedEntries = values
                .map((value) => ([value, cornerHammingDistance(maskIndex, value)]))
                .sort((a, b) => a[1] - b[1]);

            tileIndex = ensure(sortedEntries.at(0)?.[0], isNumber)
        }

        return tileIndex
    }
}


function cornerHammingDistance(a, b) {
    let distance = 0;
    let corners = [0, 2, 6, 8];

    for(let i = 0; i < corners.length; i++) {
        let bitA = (a >> corners[i]) & 1;   // Extract the i-th bit of a
        let bitB = (b >> corners[i]) & 1;   // Extract the i-th bit of b

        if(bitA !== bitB) {
            distance++;
        }
    }

    return distance;
}
