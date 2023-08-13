/**
 * @param ship ship cell list.
 * @param safe ship safe zone list.
 * @param id
 * @param hovered
 */
export function isCellHighlighted({
    ship,
    safe,
    id,
    gridSize,
    hovered,
}: {
    ship: number[],
    safe: number[],
    id: number,
    gridSize: number,
    hovered?: number,
}): boolean {


    if (hovered === undefined) return false;

    const shipWithSafeZone = [...ship, ...safe];
    const isWithinShipWithSafeZone = shipWithSafeZone.includes(id);
    const isShipWithSafeZoneHovered = shipWithSafeZone.includes(hovered);
    if (isShipWithSafeZoneHovered && isWithinShipWithSafeZone) {
        return true;
    }

    const column = id % gridSize;
    const hoveredColumn = hovered % gridSize;
    const isColumnHovered = column === hoveredColumn;
    if (isColumnHovered && !isWithinShipWithSafeZone) {
        return true;
    }
    const row = Math.floor(id / gridSize);
    const hoveredRow = Math.floor(hovered / gridSize);
    const isRowHovered = row === hoveredRow;
    if (isRowHovered && !isWithinShipWithSafeZone) {
        return true;
    }

    return false;
}
