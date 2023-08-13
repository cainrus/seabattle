export default function assert(
    condition: unknown,
    message = 'Assert error',
): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}
