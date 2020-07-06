import { Attribute, AttrType, PrimitiveType } from '../attribute/types'
import { mapObject } from '../util/mapObject'
import {
    isEnumType,
    isListType,
    isObjectType,
    isPrimitiveType,
    PrimitiveTypes
} from '../model.consts'
import {
    TsType,
    nativeType,
    referenceType,
    structureType,
    TsPrimitiveType,
    StructureTsType,
    TsBuildInTypes
} from './TsType'
import { AttributeMap, Entity, PrimitiveTypeStructure } from '../entity/types'

export class ApiModelTsTypeCreator {
    fromPrimitiveTypeStructure = (
        s: PrimitiveTypeStructure
    ): StructureTsType => {
        const value = mapObject(
            s,
            (v: PrimitiveType | PrimitiveTypeStructure) => {
                if (isPrimitiveType(v))
                    return nativeType(primitiveTsTypeName(v))
                else return this.fromPrimitiveTypeStructure(v)
            }
        )

        return structureType(value)
    }

    fromEntity = (entity: Entity): StructureTsType =>
        attributeMapToTs(entity.attrs)
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

const attrTypeToTsType = (t: AttrType, optional: boolean): TsType => {
    let res: TsType | null = null
    if (isPrimitiveType(t)) {
        res = nativeType(primitiveTsTypeName(t), optional)
    }
    if (isListType(t)) {
        const itemType = attrTypeToTsType(t.of, false)

        res = nativeType('array', optional, itemType)
    }

    if (isObjectType(t)) {
        res = referenceType(
            {
                id: t.of,
                name: t.of
            },
            optional
        )
    }

    if (isEnumType(t)) {
        res = referenceType(
            {
                id: t.id,
                name: t.id
            },
            optional
        )
    }

    if (!res) throw new Error('Unsupported type' + JSON.stringify(t))
    return res
}

export const attributeMapToTs = (dic: AttributeMap): StructureTsType => {
    const value = mapObject(dic, (attr: Attribute) => {
        const t = attr.type
        const optional = !attr.required

        return attrTypeToTsType(t, optional)
    })

    return structureType(value)
}
