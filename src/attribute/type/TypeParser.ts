import { SwaggerTypeInfoBearer } from 'src/swagger/types'

import { ExtraProps } from 'src/attribute/extra/ExtraProps'
import {
    AttrType,
    HigherOrderType,
    ListType,
    ObjectType,
    PrimitiveType,
    PrimitiveTypeName
} from '../types'
import { EnumType } from '../../enum/types'

const tryDetectPrimitiveType = (
    p: SwaggerTypeInfoBearer
): PrimitiveType | null => {
    // Enums are special types for us
    if (p.enum) return null
    let name: PrimitiveTypeName | null = null

    if (p.format === 'date-time') name = 'date'
    else if (p.format === 'double') name = 'double'
    else if (p.type === 'boolean') name = 'boolean'
    else if (p.type === 'integer') name = 'integer'
    else if (p.type === 'string') name = 'string'

    if (name != null)
        return {
            name
        }

    return null
}

const defNameFromRef = ref => ref.split('/')[2]

const tryDetectHigherOrderType = (
    p: SwaggerTypeInfoBearer,
    extra: ExtraProps
): HigherOrderType<any> | null => {
    if (p.$ref) {
        const t: ObjectType = {
            name: 'object',
            of: defNameFromRef(p.$ref)
        }

        return t
    }

    if (p.enum) {
        const t: EnumType<string> = {
            name: 'enum',
            id: extra.enumId,
            of: p.enum
        }

        return t
    }

    if (p.type === 'array') {
        const itemDef = p.items!
        const type = createType(itemDef, extra)

        if (!type)
            throw new Error(
                'Cannot detect type of array ' +
                    JSON.stringify(p.type) +
                    'in prop ' +
                    JSON.stringify(p)
            )

        const t: ListType<AttrType> = {
            name: 'list',
            of: type
        }

        return t
    }

    return null
}

export const createType = (
    info: SwaggerTypeInfoBearer,
    extra: ExtraProps
): AttrType | null => {
    const primitive = tryDetectPrimitiveType(info)
    if (primitive) return primitive

    const higherOrder = tryDetectHigherOrderType(info, extra)
    if (higherOrder) return higherOrder

    return null
}
