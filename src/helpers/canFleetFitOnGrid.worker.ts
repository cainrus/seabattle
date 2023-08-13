const instance = new ComlinkWorker<typeof import('./canFleetFitOnGrid')>(new URL('./canFleetFitOnGrid.ts', import.meta.url), {/* normal Worker options*/})

export const canFleetFitOnGrid = instance.canFleetFitOnGrid.bind(instance);

const cache: Record<string, boolean> = {};

export async function memoizedCanFleetFitOnGrid(gridSize: number, fleetSizes: number[]): Promise<boolean> {
    const key = `${gridSize}:${fleetSizes.join(',')}`
    let result = cache[key];
    if (result !== undefined) return Promise.resolve(result);
    result = await canFleetFitOnGrid(gridSize, fleetSizes);
    cache[key] = result;
    return Promise.resolve(result);
}