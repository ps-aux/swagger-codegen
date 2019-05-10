import { clone } from 'ramda'
import { arrayToObject } from 'src/modelgen/util'

const detectType = val => {
    if (val.enum)
        return 'enum'
    if (val.$ref)
        return 'object'

    if (val.format === 'date-time')
        return 'date'
    if (val.format === 'double')
        return 'double'
    if (val.type === 'boolean')
        return 'boolean'
    if (val.type === 'integer')
        return 'integer'
    if (val.type === 'string')
        return 'string'

    throw new Error('Could not determine type for property ' + JSON.stringify(val))
}

export const createModel = def => {
    def = clone(def)

    const entityName = def.title

    const required = def.required || []

    const properties = Object.entries(def.properties)
        .map(([name, val]) => ({
            ...val,
            type: detectType(val),
            name,
            id: `${entityName}.${name}`,
            required: required.includes(name)
        }))

    properties.forEach((p: any) => {
        if (p.type === 'enum') {
            p.values = p.enum
        }
        delete p.enum
        delete p.format
        delete p.$ref
    })

    const attr = arrayToObject('name', properties)

    const model = {
        entityName,
        attr
    }

    return model
}


