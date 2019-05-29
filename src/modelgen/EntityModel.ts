import { clone } from 'ramda'
import { arrayToObject, objectToArray } from 'src/modelgen/util'
import { detectType } from 'src/modelgen/detectType'
import { Attribute } from 'types'
import { extractExtraProps } from 'src/modelgen/extractExtraProps'

const attributeModel = (p, entityName, requiredProps) => {

    const type = detectType(p)
    const { name } = p


    const res = {
        type,
        name,
        id: `${entityName}.${name}`,
        required: requiredProps.includes(name)
    } as Attribute

    if (type === 'string' && p.pattern) {
        res.pattern = RegExp(p.pattern)
    }

    if (type === 'enum') {
        res.values = p.enum
    }

    return {...res, ...extractExtraProps(p)}
}

export const createEntityModel = def => {
    def = clone(def)

    const entityName = def.title
    const required = def.required || []

    const properties = objectToArray('name', def.properties)
        .map(p => attributeModel(p, entityName, required))



    const attr = arrayToObject('name', properties)

    const model = {
        entityName,
        attr
    }

    return model
}


