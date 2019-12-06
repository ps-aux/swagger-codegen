import { clone } from 'ramda'
import { arrayToObject } from 'src/util'
import { extractExtraProps } from 'src/attribute/extractExtraProps'
import { calcValidationRules } from 'src/attribute/ValidationsModel'
import { Attribute } from 'src/types'
import { SwaggerDefinition, SwaggerDefinitionProperty } from 'src/swagger/types'
import { createType } from 'src/attribute/SwaggerTypeParser'

// Some extra props - superset of Attribute
type MyAttribute = Attribute & {
    refDataFor?: string
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
        id: `${entityName}.${name}`
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
            throw new Error(
                `refDataFor in a type which is not 'object'. Type: ${JSON.stringify(
                    attr.type
                )}`
            )
        attr.refDataFor = extra.refDataFor
    }

    if (extra.refDataPath) {
        if (attr.type.name !== 'ref')
            throw new Error(
                `refDataPath in a type which is not 'ref'. Type: ${JSON.stringify(
                    attr.type
                )}`
            )
        attr.refDataPath = extra.refDataPath
    }

    const validationRules = calcValidationRules(p)
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
