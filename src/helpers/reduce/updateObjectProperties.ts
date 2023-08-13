export const updateObjectProperties = <T extends object>(source: T, patch: Partial<T>): T => {
    const changed = Object.entries(patch)
        .some(([key, v]) => (source as any)[key] !== v);

    return changed ? Object.assign({}, source, patch) : source;
};
