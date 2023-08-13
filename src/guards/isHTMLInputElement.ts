export function isHTMLInputElement(value: unknown): value is HTMLInputElement {
    return !!value && value instanceof HTMLInputElement;
}