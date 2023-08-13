import { memoize } from 'lodash-es'

import {getAdjacentCells} from './getAdjacentCells'


const getAdjacentCellsMemoized = memoize(getAdjacentCells, (cells, size) => {
 return cells.join('.') + `.${size}`
})

let cacheKey: string|undefined;
let cacheResult: number[];

type MapCache = typeof getAdjacentCellsMemoized['cache']
class Cache implements MapCache {
 has(key: string) {
  return cacheKey === key
 }
 delete(key: string) {
  if (cacheKey === key) {
   cacheKey = undefined;
   return true;
  }
  return false;
 }
 set(key: string, value: number[]): this {
  cacheKey = key;
  cacheResult = value;
  return this;
 }
 get(key: string): undefined | number[] {
  if(cacheKey === key) {
   return cacheResult;
  }
 }
}
getAdjacentCellsMemoized.cache = new Cache();
export { getAdjacentCellsMemoized }
