export function convertBitsToDecimal(bits: number[]): number {
    const binaryString = bits.join('');
    return parseInt(binaryString, 2);
}
