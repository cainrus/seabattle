import type { Bit } from "../masks/types";

import { getTileSetMasks } from './getTileSetMasks';
import { getMask, MaskValue } from './getMasks';
import { InvalidTileSetError } from "../sprites/InvalidTileSetError";
import { formatBinary } from '../../helpers/formatBinary';

const format = formatBinary.bind(null, 9);

describe('getTileSetMasks', () => {
    const gridSize = 10;
    let openedCells: Bit[] = []
    beforeEach(() => {
        openedCells = new Array(gridSize * gridSize).fill(0);
    });

    it('should return 0 for a cell with no opened neighbors', () => {
        const id = 55; // a cell in the middle of the grid
        expect(format(getMask(id, gridSize, openedCells))).toBe(format(0));
    });

    it('should return correct mask for a cell with some opened neighbors', () => {
        const id = 55;
        openedCells[54] = 1; // open the cell to the left
        openedCells[56] = 1; // open the cell to the right
        expect(format(getMask(id, gridSize, openedCells)))
            .toBe(format(0b101000));
    });

    it('should return correct mask for a cell on the edge of the grid', () => {
        const id = 0; // top left cell
        openedCells[1] = 1; // open the cell to the right
        openedCells[gridSize] = 1; // open the cell below
        const mask = getMask(id, gridSize, openedCells)
        expect(format(mask)).toBe(format(parseInt('000001010', 2)));
    });

    it('should generate the correct masks for a compatible tileset', () => {
        const tileset: MaskValue[] = [
            0, 1, 0,
            1, 0, 1,
            0, 1, 0,
        ];
        const expectedMasks: number[] = [
            0b000001010, 0b000010101, 0b000100010,
            0b001010001, 0b010101010, 0b100010100,
            0b010001000, 0b101010000, 0b010100000,
        ];

        const masks = getTileSetMasks(tileset);

        const masksBinaryString = masks.map(item => format(item));
        const expectedMasksBinaryString = expectedMasks.map(item => format(item));

        expect(masksBinaryString).toEqual(expectedMasksBinaryString);
    });

    it('should throw an error for an incompatible tileset length', () => {
        const tileset: MaskValue[] = [0, 1, 0, 1, 0];
        expect(() => {
            getTileSetMasks(tileset);
        }).toThrowError(InvalidTileSetError);
    });
});
