export function updateArrayItems<T>(list: Array<T>, callback: (value: T) => T): Array<T> {
    let updated = false;
    const result = list.map(item => {
        const newItem = callback(item);
        if (newItem !== item) {
            updated = true;
        }
        return newItem;
    });
    return updated ? result : list;
}