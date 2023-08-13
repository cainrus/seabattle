import type {Bit} from "../masks/types";
import {InvalidTileSetError} from "../sprites/InvalidTileSetError";
import {get8bitMask} from "./get8bitMask";

export function getTileSetMasks(tileSet: Bit[]): Array<Bit[]> {
    const gridSize = Math.sqrt(tileSet.length);
    if (gridSize % 1 !== 0) {
        throw new InvalidTileSetError('Invalid tileSet. The length must be a perfect square to form a compatible grid.');
    }

    const masks: Array<Bit[]> = [];
    for (let id = 0; id < tileSet.length; id++) {
        masks.push(get8bitMask(id, gridSize, tileSet));
    }
    return masks;
}



