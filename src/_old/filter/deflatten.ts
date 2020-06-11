import { unflatten } from 'flat'
import { fromPairs } from 'ramda'

export const deflatten = (entries: [string, any][]): object => {
    const arr = entries as any[]
    const obj = fromPairs(arr)
    return unflatten(obj)
}
