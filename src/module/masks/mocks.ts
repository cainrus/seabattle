import type {Mask9Bit} from "../masks/types";

export const mask9bit24: Mask9Bit = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 1,
];

export const mask9bit71: Mask9Bit = [
    0, 1, 1,
    1, 1, 1,
    0, 0, 0,
];


export const mask9bitSpecial: Mask9Bit = [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0,
];


export const mask9bit68: Mask9Bit = [
    0, 0, 0,
    1, 1, 1,
    0, 0, 0,
];

export const mask9bitSurroundedEmptyCenter: Mask9Bit = [
    1, 1, 1,
    1, 0, 1,
    1, 1, 1,
]


export const mask9bitEmpty: Mask9Bit = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]

export const mask9bit17: Mask9Bit = [
    1, 1, 1,
    0, 1, 0,
    1, 1, 1,
]

export const mask9bit: Mask9Bit =  [
    1, 1, 1,
    0, 1, 1,
    1, 1, 1,
]
