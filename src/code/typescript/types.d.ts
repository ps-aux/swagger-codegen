import { PrimitiveType } from '../../attribute/types'

export type PrimitiveTypeStructure = {
    [key: string]: PrimitiveType | PrimitiveTypeStructure
}

export type TsPrimitiveType = 'string' | 'boolean' | 'number' | 'Date'

export type TsStructureType = {
    [key: string]: TsTypeDef<any>
}

export type TsReferenceType = {
    id: string
    name: string
    _tsRef: true
}

export type GenericType<T extends MyTsType> = (
    | NativeGenericType<T>
    | TsReferencedGenericType<T>) & {
    _tsGeneric: true
}

export type NativeGenericType<T extends MyTsType> = {
    name: string
    of: TsTypeDef<T>
}

export type TsReferencedGenericType<T extends MyTsType> = TsReferenceType & {
    of: TsTypeDef<T>
}

export type MyTsType =
    | TsPrimitiveType
    | TsStructureType
    | TsReferenceType
    | GenericType<any>

export type TsTypeDef<T extends MyTsType> = {
    def: T
    nullable: boolean
}
