import { SwaggerTypeInfoBearer } from 'src/swagger/types'
import { Type, TypeName } from 'src/_old/model'

const defFromRef = ref => ref.split('/')[2]

const compositeTypes = ['object', 'array', 'ref']

const isCompositeType = type => compositeTypes.includes(type)

const detectTypeName = (p: SwaggerTypeInfoBearer, extra: any): TypeName => {
    if (p.enum) return 'enum'
    if (p.$ref) return 'object'
    if (extra.ref) return 'ref'
    if (p.format === 'date-time') return 'date'
    if (p.format === 'double') return 'double'
    if (p.type === 'boolean') return 'boolean'
    if (p.type === 'array') return 'array'
    if (p.type === 'integer') return 'integer'
    if (p.type === 'string') return 'string'

    throw new Error(
        'Could not determine type for property ' + JSON.stringify(p)
    )
}

export const createType = (p: SwaggerTypeInfoBearer, extra: any): Type => {
    const typeName = detectTypeName(p, extra)

    const type: Type = {
        name: typeName
    }

    if (typeName === 'enum') {
        // Kind of a hack ?
        type.values = p.enum
    }

    if (isCompositeType(typeName)) {
        let innerType: Type | null = null

        if (typeName === 'object') {
            if (!p.$ref) {
                throw new Error(
                    `'object' type must have $ref. Invalid input ${JSON.stringify(
                        p
                    )}`
                )
            }
            innerType = {
                name: defFromRef(p.$ref)
            }
        }

        if (typeName === 'array') {
            const itemDef = p.items
            if (!itemDef) {
                throw new Error(
                    `'array' type must have 'items' property. Invalid input ${JSON.stringify(
                        p
                    )}`
                )
            }
            innerType = createType(itemDef, {})
        }

        if (typeName === 'ref') {
            innerType = {
                name: extra.ref
            }
        }

        if (!innerType)
            throw new Error(`inner type not detected for ${JSON.stringify(p)}`)
        type.type = innerType
    }

    return type
}
