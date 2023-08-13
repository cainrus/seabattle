export default function getRange(from: number, to: number): number[] {
    const range: number[] = [];
    if (!Number.isFinite(from) || !Number.isFinite(to)) return []
    if (from < to) {
        for (let i = from; i <= to; i++) {
            range.push(i);
        }
    } else if (from > to) {
        for (let i = from; i >= to; i--) {
            range.push(i);
        }
    } else if (from) {
        range.push(from);
    }

    return range;
}
