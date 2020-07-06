export type TsPrimitiveType = 'string' | 'boolean' | 'number' | 'Date'

export type NativeTsTypeValue = TsPrimitiveType | 'array'

export type NativeTsType = {
    __meta: {
        type: 'ts/native'
        nullable: boolean
        genericFor?: TsType
    }
    value: NativeTsTypeValue
}

export type StructureTsTypeValue = { [key: string]: TsType }

export type StructureTsType = {
    __meta: {
        type: 'ts/structure'
        nullable: boolean
    }
    value: StructureTsTypeValue
}

export type TsTypeReference = {
    id: string
    name: string
}

export type ReferenceTsType = {
    __meta: {
        type: 'ts/reference'
        nullable: boolean
        genericFor?: TsType
    }
    value: TsTypeReference
}

export type TsType = NativeTsType | StructureTsType | ReferenceTsType

export const isNativeType = (obj: TsType): obj is NativeTsType =>
    obj.__meta.type === 'ts/native'

export const isStructureType = (obj: TsType): obj is StructureTsType =>
    obj.__meta.type === 'ts/structure'

export const isReferenceType = (obj: TsType): obj is ReferenceTsType =>
    obj.__meta.type === 'ts/reference'

export const nativeType = (
    option: NativeTsTypeValue,
    nullable = false,
    genericFor?: TsType
): NativeTsType => ({
    __meta: {
        type: 'ts/native',
        nullable,
        genericFor: genericFor
    },
    value: option
})

export const structureType = (
    value: StructureTsTypeValue,
    nullable = false
): StructureTsType => ({
    __meta: {
        type: 'ts/structure',
        nullable
    },
    value
})

export const referenceType = (
    value: TsTypeReference,
    nullable = false
): ReferenceTsType => ({
    __meta: {
        type: 'ts/reference',
        nullable
    },
    value
})

export const TsBuildInTypes = {
    string: 'string',
    boolean: 'boolean',
    number: 'number',
    date: 'Date',
    any: 'any',
    object: 'object'
}
