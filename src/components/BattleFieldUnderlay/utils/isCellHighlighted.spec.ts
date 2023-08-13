import {formatBinary} from "../../../helpers/formatBinary";
import {isCellHighlighted} from './isCellHighlighted'


describe('isCellHighlighted', () => {
    it('should highlight a cross pattern around the hovered cell when there is no ship or safe zone', () => {
        const ship: number[] = [];
        const safe: number[] = [];
        const sourceMask = [
            0, 1, 0, 0,
            1, 1, 1, 1,
            0, 1, 0, 0,
            0, 1, 0, 0,
        ];
        testHighlighting({
            gridSize: 4,
            ship,
            safe,
            hovered: 5,
            expectedMask: sourceMask,
        })
    });

    it('should highlight the entire ship and safe zone when the hovered cell intersects the ship', () => {
        const ship = [0];
        const safe = [1, 4, 5];
        const sourceMask = [
            1, 1, 1, 1,
            1, 1, 0, 0,
            1, 0, 0, 0,
            1, 0, 0, 0,
        ];
        testHighlighting({
            gridSize: 4,
            ship,
            safe,
            hovered: 0,
            expectedMask: sourceMask,
        })
    });

    it('should only highlight a cross pattern around the hovered cell when it does not intersect with the ship or safe zone', () => {
        const ship = [0];
        const safe = [1, 4, 5];
        const sourceMask = [
            0, 0, 1, 1,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
        ];
        testHighlighting({
            gridSize: 4,
            ship,
            safe,
            hovered: 2,
            expectedMask: sourceMask,
        })
    });

    it('should highlight both single-cell ships and the safe zone when the hovered cell intersects both safe zones', () => {
        const ship = [0, 6];
        const safe = [
            1, 4, 5,
            1, 2, 3,
            5, 7, 9,
            10, 11,
        ];
        const sourceMask = [
            1, 1, 1, 1,
            1, 1, 1, 1,
            0, 1, 1, 1,
            0, 1, 0, 0,
        ];
        testHighlighting({
            gridSize: 4,
            ship,
            safe,
            hovered: 1,
            expectedMask: sourceMask,
        })

    });

    it('should highlight the second ship and only its safe zone intersecting with the hovered cell, even if the ship is not directly hovered over', () => {
        const ship = [0, 6];
        const safe = [
            1, 2, 3,
            5, 7, 9,
            10, 11,
        ];
        const sourceMask = [
            1, 1, 1, 1,
            0, 1, 1, 1,
            0, 1, 1, 1,
            0, 0, 1, 0,
        ];
        testHighlighting({
            gridSize: 4,
            ship,
            safe,
            hovered: 2,
            expectedMask: sourceMask,
        })
    });
});


function createGridSize(size: number): number[] {
    return [...Array(size * size).keys()];
}

function testHighlighting({
      gridSize,
      ship,
      safe,
      hovered,
      expectedMask,
  }: {
    gridSize: number,
    ship: number[],
    safe: number[],
    hovered: number,
    expectedMask: number[],
}) {
    const field = createGridSize(gridSize);
    const targetMask = field.map(id => isCellHighlighted({
        ship,
        safe,
        hovered,
        gridSize,
        id,
    }) ? 1 : 0);
    expect(formatBinary(gridSize * gridSize, targetMask.join('')))
        .toEqual(formatBinary(gridSize * gridSize, expectedMask.join('')));
}
