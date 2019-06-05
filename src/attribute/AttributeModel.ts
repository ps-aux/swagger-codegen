import { clone } from 'ramda'
import { arrayToObject, objectToArray } from 'src/util'
import { detectType } from 'src/attribute/detectType'
import { Attribute, SwaggerDefinition } from 'types'
import { extractExtraProps } from 'src/attribute/extractExtraProps'

const defFromRef = ref => ref.split('/')[2]

// Some extra props - superset of Attribute
type MyAttribute = Attribute & {
    refDataFor?: string
}

const attributeModel = (p, entityName, requiredProps): MyAttribute => {

    const type = detectType(p)
    const { name } = p

    const attr = {
        type: {
            name: type
        },
        name,
        id: `${entityName}.${name}`
    } as MyAttribute

    if (requiredProps.includes(name))
        attr.required = true

    const basicType = attr.type.name

    if (basicType === 'string' && p.pattern) {
        attr.pattern = RegExp(p.pattern)
    }

    if (basicType === 'enum') {
        attr.values = p.enum
    }

    if (basicType === 'object') {
        attr.type.type = defFromRef(p.$ref)
    }

    const extra = extractExtraProps(p)

    if (basicType === 'ref') {
        attr.type.type = extra.ref

        if (extra.refDataPath)
            attr.refDataPath = extra.refDataPath
    }

    if (extra.readOnly) {
        attr.readOnly = true
    }

    if (extra.detailOnly) {
        attr.detailOnly = true
    }

    if (extra.refDataFor) {
        attr.refDataFor = extra.refDataFor
    }

    return attr
}

export const createAttributesModel = (def: SwaggerDefinition,
                                      entityName: string):  { [key: string]: Attribute }  => {
    def = clone(def)
    const required = def.required || []

    const properties = objectToArray('name', def.properties)
        .map(p => attributeModel(p, entityName, required))
        // Remove ref data - they are duplicate attributes. The logical attribute is the one with id.
        .filter(attr => !attr.refDataFor)


    return arrayToObject('name', properties)
}


