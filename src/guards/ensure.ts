type Guard<T> = (input: unknown) => input is T;

export default function ensure<T>(value: unknown, guard: Guard<T>, message?: string): T {
    if (guard(value)) {
        return value;
    }
    throw new Error(message || 'Type guard failed');
}