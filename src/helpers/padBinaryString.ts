export function padBinaryString(binaryString: string, length: number): string {
    while (binaryString.length < length) {
        binaryString = '0' + binaryString;
    }
    return binaryString;
}
