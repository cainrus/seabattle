import {formatBinary} from "./formatBinary";
import { rotateMatrix } from './rotateMatrix';

describe('rotateMatrix', () => {
    it('should rotate the matrix 90 degrees clockwise', () => {
        const originalMatrix: Array<1 | 0> = [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ];

        const rotatedMatrix: Array<1 | 0> = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];

        expect(rotateMatrix(originalMatrix)).toEqual(rotatedMatrix);
    });

    it('should rotate a 2x2 matrix 90 degrees clockwise', () => {
        const originalMatrix: Array<1 | 0> = [
            1, 0,
            0, 1
        ];

        const rotatedMatrix: Array<1 | 0> = [
            0, 1,
            1, 0
        ];

        expect(rotateMatrix(originalMatrix)).toEqual(rotatedMatrix);
    });

    it('should rotate an empty matrix and return an empty matrix', () => {
        const originalMatrix: Array<1 | 0> = [];

        const rotatedMatrix: Array<1 | 0> = [];

        expect(rotateMatrix(originalMatrix)).toEqual(rotatedMatrix);
    });

    it('should rotate a 3x3 matrix 180 degrees clockwise', () => {
        const originalMatrix: Array<1 | 0> = [
            1,0,0,
            1,1,0,
            0,0,0,
        ];

        const rotatedMatrix: Array<1 | 0> = [
            0,0,0,
            0,1,1,
            0,0,1,
        ];

        expect(
            formatBinary(9, rotateMatrix(originalMatrix, 2).join(''))
        ).toEqual(
            formatBinary(9, rotatedMatrix.join(''))
        );
    });

    it('should rotate a 3x3 matrix 90 degrees clockwise on rotate=5', () => {
        const originalMatrix: Array<1 | 0> = [
            1,0,0,
            0,0,0,
            0,0,0,
        ];

        const rotatedMatrix: Array<1 | 0> = [
            0,0,0,
            0,0,0,
            1,0,0,
        ];

        expect(
            formatBinary(9, rotateMatrix(originalMatrix, 5).join(''))
        ).toEqual(
            formatBinary(9, rotatedMatrix.join(''))
        );
    });

    it('should not rotate a matrix', () => {
        const originalMatrix: Array<1 | 0> = [
            1,0,0,
            0,0,0,
            0,0,0,
        ];
        const rotatedMatrix: Array<1 | 0> = [
            1,0,0,
            0,0,0,
            0,0,0,
        ];
        expect(
            formatBinary(9, rotateMatrix(originalMatrix, 0).join(''))
        ).toEqual(
            formatBinary(9, rotatedMatrix.join(''))
        );
    });

    it('should not rotate a matrix on rotate=4', () => {
        const originalMatrix: Array<1 | 0> = [
            1,0,0,
            0,0,0,
            0,0,0,
        ];
        const rotatedMatrix: Array<1 | 0> = [
            1,0,0,
            0,0,0,
            0,0,0,
        ];
        expect(
            formatBinary(9, rotateMatrix(originalMatrix, 0).join(''))
        ).toEqual(
            formatBinary(9, rotatedMatrix.join(''))
        );
    });

    it('should rotate a 3x3 matrix 270 degrees clockwise', () => {
        const originalMatrix: Array<1 | 0> = [
            1,0,0,
            0,0,0,
            0,0,0,
        ];

        const rotatedMatrix: Array<1 | 0> = [
            0,0,1,
            0,0,0,
            0,0,0,
        ];

        expect(
            formatBinary(9, rotateMatrix(originalMatrix, 3).join(''))
        ).toEqual(
            formatBinary(9, rotatedMatrix.join(''))
        );
    });
});
