import { clone } from 'ramda'
import { arrayToObject, objectToArray } from 'src/modelgen/util'
import { detectType } from 'src/modelgen/detectType'
import { Attribute, SwaggerDefinition } from 'types'
import { extractExtraProps } from 'src/modelgen/extractExtraProps'

const defFromRef = ref => ref.split('/')[2]

const attributeModel = (p, entityName, requiredProps) => {

    const type = detectType(p)
    const { name } = p

    const attr = {
        type: {
            name: type
        },
        name,
        id: `${entityName}.${name}`,
    } as Attribute

    if (requiredProps.includes(name))
        attr.required = true

    const basicType = attr.type.name

    if (basicType === 'string' && p.pattern) {
        attr.pattern = RegExp(p.pattern)
    }

    if (basicType === 'enum') {
        attr.values = p.enum
    }

    if (basicType ===  'object') {
        attr.type.type = defFromRef(p.$ref)
    }

    const extra =  extractExtraProps(p)

    if (basicType === 'ref') {
        attr.type.type = extra.ref
    }

    if (extra.readOnly) {
        attr.readOnly = true
    }

    if (extra.detailOnly) {
        attr.detailOnly = true
    }

    return attr
}

export const createAttributesModel = (def:SwaggerDefinition, entityName: string) => {
    def = clone(def)
    const required = def.required || []

    const properties = objectToArray('name', def.properties)
        .map(p => attributeModel(p, entityName, required))


    const attr: {[key:string]: Attribute} = arrayToObject('name', properties)
    return attr
}


