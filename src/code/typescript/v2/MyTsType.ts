export type TsPrimitiveType = 'string' | 'boolean' | 'number' | 'Date'

export type TsNativeTypeOption = TsPrimitiveType | 'array'

export type TsNativeType = {
    __meta: {
        type: 'ts/native'
        nullable: boolean
        genericFor?: MyTsType
    }
    value: TsNativeTypeOption
}

export type TsStructureTypeValue = { [key: string]: MyTsType }

export type TsStructureType = {
    __meta: {
        type: 'ts/structure'
        nullable: boolean
    }
    value: TsStructureTypeValue
}

export type TsTypeReference = {
    id: string
    name: string
}

export type TsReferenceType = {
    __meta: {
        type: 'ts/reference'
        nullable: boolean
        genericFor?: MyTsType
    }
    value: TsTypeReference
}

export type MyTsType = TsNativeType | TsStructureType | TsReferenceType

export const isNativeType = (obj: MyTsType): obj is TsNativeType =>
    obj.__meta.type === 'ts/native'

export const isStructureType = (obj: MyTsType): obj is TsStructureType =>
    obj.__meta.type === 'ts/structure'

export const isReferenceType = (obj: MyTsType): obj is TsNativeType =>
    obj.__meta.type === 'ts/reference'

export const nativeType = (
    option: TsNativeTypeOption,
    nullable = false,
    genericFor?: MyTsType
): TsNativeType => ({
    __meta: {
        type: 'ts/native',
        nullable,
        genericFor: genericFor
    },
    value: option
})

export const structureType = (
    value: TsStructureTypeValue,
    nullable = false
): TsStructureType => ({
    __meta: {
        type: 'ts/structure',
        nullable
    },
    value
})

export const referenceType = (
    value: TsTypeReference,
    nullable = false
): TsReferenceType => ({
    __meta: {
        type: 'ts/reference',
        nullable
    },
    value
})
