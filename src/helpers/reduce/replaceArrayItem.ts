export function replaceArrayItem<T>(list: Array<T>, index: number, value?: T) {
    return index < 0 || list[index] === value || index > list.length
        ? list
        : [
            ...list.slice(0, index),
            ...(value === undefined ? [] : [value]),
            ...list.slice(index + 1)
        ];
}