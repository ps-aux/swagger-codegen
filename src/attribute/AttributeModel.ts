import { clone } from 'ramda'
import { arrayToObject } from 'src/util'
import { extractExtraProps } from 'src/attribute/extractExtraProps'
import { calcValidationRules } from 'src/attribute/ValidationsModel'
import { Attribute, Type, TypeName } from 'src/types'
import { SwaggerDefinition, SwaggerDefinitionProperty, SwaggerTypeInfoBearer } from 'src/swagger/types'

const defFromRef = ref => ref.split('/')[2]

// Some extra props - superset of Attribute
type MyAttribute = Attribute & {
    refDataFor?: string
}

const compositeTypes = ['object', 'array', 'ref']

const isCompositeType = type => compositeTypes.includes(type)

const detectTypeName = (p: SwaggerTypeInfoBearer, extra: any): TypeName => {
    if (p.enum)
        return 'enum'
    if (p.$ref)
        return 'object'
    if (extra.ref)
        return 'ref'
    if (p.format === 'date-time')
        return 'date'
    if (p.format === 'double')
        return 'double'
    if (p.type === 'boolean')
        return 'boolean'
    if (p.type === 'array')
        return 'array'
    if (p.type === 'integer')
        return 'integer'
    if (p.type === 'string')
        return 'string'

    throw new Error('Could not determine type for property ' + JSON.stringify(p))
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

const attributeModel = (
    p: SwaggerDefinitionProperty,
    name: string,
    entityName: string,
    requiredProps
): MyAttribute => {
    const extra = extractExtraProps(p)

    const attr = {
        type: createType(p, extra),
        name,
        id: `${entityName}.${name}`,
    } as MyAttribute

    if (requiredProps.includes(name)) attr.required = true
    if (extra.readOnly) {
        attr.readOnly = true
    }

    if (extra.detailOnly) {
        attr.detailOnly = true
    }

    if (extra.refDataFor) {
        if (attr.type.name !== 'object')
            throw new Error(`refDataFor in a type which is not 'object'. Type: ${JSON.stringify(attr.type)}`)
        attr.refDataFor = extra.refDataFor
    }

    if (extra.refDataPath) {
        if (attr.type.name !== 'ref')
            throw new Error(`refDataPath in a type which is not 'ref'. Type: ${JSON.stringify(attr.type)}`)
        attr.refDataPath = extra.refDataPath
    }

    const validationRules = calcValidationRules(attr, p)
    if (validationRules.length > 0) attr.validations = validationRules

    return attr
}

export const createAttributesModel = (
    def: SwaggerDefinition,
    entityName: string
): { [key: string]: Attribute } => {
    def = clone(def)
    const required = def.required || []

    const properties = Object.entries(def.properties || [])
        .map(([name, p]) => attributeModel(p, name, entityName, required))
        // Remove ref data - they are duplicate attributes. The logical attribute is the one with id.
        .filter(attr => !attr.refDataFor)

    return arrayToObject('name', properties)
}
