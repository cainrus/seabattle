export function rotateMatrix<T extends Array<G>, G extends number>(matrix: T, times = 1): T {

    const n = Math.sqrt(matrix.length);

    let bufferMatrix: number[] = [...matrix];

    for (let x= (times % 4); x > 0; x--) {
        const rotatedMatrix: number[] = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Calculate the new indices for the rotated matrix
                const newRow = j;
                const newColumn = n - i - 1;

                // Calculate the index in the original matrix
                const originalIndex = newRow * n + newColumn;

                // Push the corresponding value to the rotated matrix
                rotatedMatrix.push(bufferMatrix[originalIndex]);
            }
        }
        bufferMatrix = rotatedMatrix;
    }

    return bufferMatrix as T;

}
