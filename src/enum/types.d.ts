import { HigherOrderType } from '../attribute/types'

export type EnumType<T> = HigherOrderType<T[]> & {
    name: 'enum'
    id: string // Optional for now
}
