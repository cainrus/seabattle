import type { Mask9Bit } from "../masks/types";
import { getIndexFrom9bitMask } from "./getIndexFrom9bitMask";

export function getTileCoordinates(mask9bit: Mask9Bit, blobTileMap: number[][]): undefined | { x: number, y: number } {
    let tileIndex = getIndexFrom9bitMask(mask9bit);
    if (tileIndex === -1) {
        tileIndex = getIndexFrom9bitMask(mask9bit, true);
    }
    console.log('tileIndex', tileIndex)
    for (const [x, row] of blobTileMap.entries()) {
        const y = row.findIndex(value => Object.is(value, tileIndex));
        if (y !== -1) {
            return {x, y};
        }
    }
}
