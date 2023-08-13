//http://www.cr31.co.uk/stagecast/wang/blob.html
import assert from "../../guards/assert";
import type {Bit, Mask9Bit} from "../masks/types";

/**
 * @return {number} binary number
 */
export function get9bitMask(id: number, gridSize: number, cellStates: Array<Bit>, invert = false): Mask9Bit {
    const row = Math.floor(id / gridSize);
    const col = id % gridSize;

    const mask: Array<Bit> = [];
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i < 0 || i >= gridSize || j < 0 || j >= gridSize) {
                mask.push(0);
            } else {
                const index = i * gridSize + j;
                mask.push(cellStates[index]);
            }
        }
    }
    assert(mask.length === 9)
    if (invert) return mask.map((val) => val === 1 ? 0 : 1) as Mask9Bit
    return mask as Mask9Bit;
}
