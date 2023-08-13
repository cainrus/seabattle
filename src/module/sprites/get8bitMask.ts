import { mask9bitCenter } from '../masks/mask9bitCenter';
import type {Bit} from '../masks/types';
import { get9bitMask } from './get9bitMask';

export function get8bitMask(id: number, gridSize: number, cellStates: Array<Bit>): Array<Bit> {
    return get9bitMask(id, gridSize, cellStates).filter((_, index) => index !== mask9bitCenter)
}
