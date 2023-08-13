import {convertBitsToDecimal} from "../../helpers/convertBitsToDecimal";
import {get9bitMask} from "./get9bitMask";

export type MaskValue = 1 | 0;

export function getMask(id: number, gridSize: number, cellStates: MaskValue[]): number {
    return convertBitsToDecimal(get9bitMask(id, gridSize, cellStates));
}







