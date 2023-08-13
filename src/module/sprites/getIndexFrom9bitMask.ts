import {get8bitMask} from "./get8bitMask";
import {mask9bitCenter} from '../masks/mask9bitCenter';
import type {Mask8Bit, Mask9Bit} from '../masks/types';

enum Direction {
    NW = 128,
    N = 1,
    NE = 2,
    W = 64,
    E = 4,
    SW = 32,
    S = 16,
    SE = 8,
}

const bitMapper = [
    Direction.NW,
    Direction.N,
    Direction.NE,
    Direction.E,
    Direction.W,
    Direction.SE,
    Direction.S,
    Direction.SW,
];

const diagonaleIndexesFor8bitMask = [0, 2, 5, 7];

function convert9bitTo8bit(mask9bit: Mask9Bit): Mask8Bit {
    return mask9bit
        .reduce((acc, value, index) =>  index === mask9bitCenter
            ? acc
            : [...acc, value], [] as number[]) as Mask8Bit;
}

// Индексы ячеек, прилегающих к каждому из угловых элементов
const adjacentCellsToCorners = [
    [Direction.N, Direction.W], // для верхнего левого угла
    [Direction.N, Direction.E], // для верхнего правого угла
    [Direction.S, Direction.W], // для нижнего левого угла
    [Direction.S, Direction.E], // для нижнего правого угла
];

export function getIndexFrom9bitMask(mask9bit: Mask9Bit, skipDiagonal = false) {

    const isCentralBitSet = !!mask9bit[mask9bitCenter];
    if (!isCentralBitSet) return 0;
    const mask8bit = convert9bitTo8bit(mask9bit);
    const indexesToSkip = skipDiagonal
        ? diagonaleIndexesFor8bitMask
        : [];

    // Перебираем диагональные индексы и проверяем, оба ли соседних (не по диагонали) элемента установлены в 1.
    // Если оба не установлены в 1, то устанавливаем диагональный элемент в 0.
    for (let i = 0; i < diagonaleIndexesFor8bitMask.length; i++) {
        const cornerIndex = diagonaleIndexesFor8bitMask[i];
        const adjacentCells = adjacentCellsToCorners[i];
        if (!(mask8bit[adjacentCells[0]] === 1 && mask8bit[adjacentCells[1]] === 1)) {
            mask8bit[cornerIndex] = 0;
        }
    }

    const resultIndex = mask8bit.reduce<number>((acc, bit, i) => {
        return !bit || indexesToSkip.includes(i) ? acc : acc + bitMapper[i];
    }, 0);
    return resultIndex === 0 && isCentralBitSet ? -0 : resultIndex;
}
