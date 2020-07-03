import { Attribute, AttrType, PrimitiveType } from '../../../attribute/types'
import { mapObject } from '../utils'
import {
    isListType,
    isObjectType,
    isPrimitiveType,
    PrimitiveTypes
} from '../../../model.consts'
import {
    MyTsType,
    nativeType,
    referenceType,
    structureType,
    TsPrimitiveType,
    TsStructureType
} from './MyTsType'
import { TsBuildInTypes } from '../modelToTypescripTypeDef'

export type PrimitiveTypeStructure = {
    [key: string]: PrimitiveType | PrimitiveTypeStructure
}

export type AttributeMap = {
    [key: string]: Attribute
}

const primitiveTsTypeName = (t: PrimitiveType): TsPrimitiveType => {
    switch (t.name) {
        case PrimitiveTypes.string:
            // @ts-ignore
            return TsBuildInTypes.string
        case PrimitiveTypes.boolean:
            // @ts-ignore
            return TsBuildInTypes.boolean
        case PrimitiveTypes.integer:
        case PrimitiveTypes.double:
            // @ts-ignore
            return TsBuildInTypes.number
        case PrimitiveTypes.date:
            // @ts-ignore
            return TsBuildInTypes.date
    }

    throw new Error(`Could not map primitive type ${t.name} to TS type`)
}

export const primitiveTypeStructureToTs = (
    dic: PrimitiveTypeStructure
): TsStructureType => {
    const value = mapObject(
        dic,
        (v: PrimitiveType | PrimitiveTypeStructure) => {
            if (isPrimitiveType(v)) return nativeType(primitiveTsTypeName(v))
            else return primitiveTypeStructureToTs(v)
        }
    )

    return structureType(value)
}

const attrTypeToTsType = (t: AttrType, optional: boolean): MyTsType => {
    let res: MyTsType | null = null
    if (isPrimitiveType(t)) {
        res = nativeType(primitiveTsTypeName(t), optional)
    }
    if (isListType(t)) {
        const itemType = attrTypeToTsType(t.of, false)

        res = nativeType('array', optional, itemType)
    }

    if (isObjectType(t)) {
        res = referenceType({
            id: t.of,
            name: t.of
        })
    }

    if (!res) throw new Error('Unsupported type' + JSON.stringify(t))
    return res
}

export const attributeMapToTs = (dic: AttributeMap): TsStructureType => {
    const value = mapObject(dic, (attr: Attribute) => {
        const t = attr.type
        const optional = !attr.required

        return attrTypeToTsType(t, optional)
    })

    return structureType(value)
}
