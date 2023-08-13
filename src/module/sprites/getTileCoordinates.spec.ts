import {
    mask9bit71,
    mask9bitSpecial,
    mask9bitEmpty, mask9bitSurroundedEmptyCenter,
} from '../masks/mocks';
import { tileMap } from './tileMap';
import { getTileCoordinates } from './getTileCoordinates';

describe('getTileSetMasks', () => {
    it('case 71', () => {
        const coords = getTileCoordinates(mask9bit71, tileMap.data)
        expect(coords).toEqual({ x: 4, y: 2 })
    });

    it('case special', () => {
        const coords = getTileCoordinates(mask9bitSpecial, tileMap.data)
        expect(coords).toEqual({ x: 0, y: 4 })
    });
    it('case filled surrounding with empty center', () => {
        const coords = getTileCoordinates(mask9bitSurroundedEmptyCenter, tileMap.data)
        expect(coords).toEqual({ x: 0, y: 0 })
    });

    it('case totally empty', () => {
        const coords = getTileCoordinates(mask9bitEmpty, tileMap.data)
        expect(coords).toEqual({ x: 0, y: 0 })
    });
});
