import { mask9bit71 } from "../masks/mocks";
import { createTileToIndexMapper } from "./createTileToIndexMapper";
import { tileMap } from './tileMap';

describe('createTileToIndexMapper', () => {
    const getTileIndex = createTileToIndexMapper(tileMap.data);

    it('should return tile index 34', () => {
        expect(getTileIndex(mask9bit71)).toBe(34)
    })

})
