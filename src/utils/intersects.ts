export default <T>(arrays: Array<T[]>) => arrays.reduce((a, b) => a.filter(c => b.includes(c)))
