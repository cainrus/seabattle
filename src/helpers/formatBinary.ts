import {padBinaryString} from "./padBinaryString";

export function formatBinary(size: number, value: number|string) {
    return padBinaryString(`${value}`, size)
        .match(RegExp(`\\d{1,${Math.sqrt(size)}}`, 'g'))
        ?.join('\n')
}
