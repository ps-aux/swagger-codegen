import { MyTsType, TsPrimitiveType } from './types'

export const isTsPrimitiveType = (obj: MyTsType): obj is TsPrimitiveType =>
    typeof obj === 'string'
