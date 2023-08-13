const SHIP_SPRITE_LAST_INDEX = 7;

export function getShipSpriteIndex(ship: number[], id: number): number {
    const withinShipIndex = ship.indexOf(id);
    return withinShipIndex === 0
        ? 1
        : withinShipIndex === ship.length - 1
            ? SHIP_SPRITE_LAST_INDEX
            : Math.min(
                SHIP_SPRITE_LAST_INDEX,
                withinShipIndex % (SHIP_SPRITE_LAST_INDEX - 1) + 1
            );
}
