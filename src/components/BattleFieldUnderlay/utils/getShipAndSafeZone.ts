
export function getShipAndSafeZone({id, ships, safeZones}: {id: number, ships: number[][], safeZones: number[][]}): {
    withinSafeZone: number[],
    withinShip: number[],
} {

    const shipIndex = ships.findIndex(ship => ship.includes(id));

    if (shipIndex === -1) {
        const safeZoneIndexes = [];
        for (const safeZoneIndex in safeZones) {
            if (safeZones[safeZoneIndex].includes(id)) {
                safeZoneIndexes.push(+safeZoneIndex);
            }
        }

        return {
            withinShip: safeZoneIndexes
                .map(safeZoneIndex => ships[safeZoneIndex])
                .reduce((a,b) => [...a, ...b], [])
                .sort(),
            withinSafeZone: safeZoneIndexes
                .map((safeZoneIndex) => safeZones[safeZoneIndex])
                .reduce((a, b) => [...a, ...b], [])
                .filter((item, index, list) => list.indexOf(item) === index)
                .sort(),
        }
    } else {
        return {
            withinShip: ships[shipIndex]?.sort(),
            withinSafeZone: safeZones[shipIndex]?.sort() || [],
        }
    }
}
