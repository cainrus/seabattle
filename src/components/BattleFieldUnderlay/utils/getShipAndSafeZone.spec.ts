import {getShipAndSafeZone} from "./getShipAndSafeZone";


/**
 * Assumed grid:
 * 0, 1, 2, 3,
 * 4, 5, 6, 7,
 * 8, 9, 10, 11,
 * 12, 13, 14, 15
 */

describe('getShipAndSafeZone', () => {
    it('should return empty arrays when the cell id is not within a ship or safe zone', () => {
        const ships = [[0]];
        const safeZones = [[1, 4, 5]];
        const id = 8;
        const expectedResult = {
            withinSafeZone: [],
            withinShip: [],
        };

        expect(getShipAndSafeZone({ id, ships, safeZones })).toEqual(expectedResult);
    });

    it('should return correct ship and safe zone when the cell id is within a ship', () => {
        const ships = [[0], [2, 3]];
        const safeZones = [[1, 4, 5], [1, 5, 6, 7]];
        const id = 3;
        const expectedResult = {
            withinSafeZone: [1, 5, 6, 7],
            withinShip: [2, 3],
        };

        expect(getShipAndSafeZone({ id, ships, safeZones }))
            .toEqual(expectedResult);
    });

    it('returns the correct ship and safe zone when the cell id is present within the safe zone of only the first ship, and does not return the second ship or its safe zone', () => {
        const ship1 = [0];
        const ship2 = [2, 3];
        const ships = [ship1, ship2];
        const safeZone1 = [1, 4, 5];
        const safeZone2 = [1, 5, 6, 7];
        const safeZones = [safeZone1, safeZone2];
        const id = 4 ;
        const expectedResult = {
            withinSafeZone: safeZone1,
            withinShip: ship1,
        };

        expect(getShipAndSafeZone({ id, ships, safeZones }))
            .toEqual(expectedResult);
    });

    it('should return correct ship and safe zone when the cell id is within both safe zones', () => {
        const ships = [[0], [2]];
        const safeZone1 = [1, 4, 5];
        const safeZone2 = [1, 3, 5, 6, 7];
        const safeZones = [safeZone1, safeZone2];
        const id = 1;
        const expectedResult = {
            withinSafeZone: [...safeZone1, ...safeZone2]
                .filter((item, index, list) => list.indexOf(item) === index)
                .sort(),
            withinShip: [0, 2],
        };

        expect(getShipAndSafeZone({ id, ships, safeZones })).toEqual(expectedResult);
    });

    it('should handle when safe zone is undefined for a not totally revealed ship', () => {
        const ships = [[0, 1], [3]];
        const safeZones = [[4, 5]];
        const id = 3;
        const expectedResult = {
            withinSafeZone: [],
            withinShip: [3],
        };

        expect(getShipAndSafeZone({ id, ships, safeZones })).toEqual(expectedResult);
    });

});
