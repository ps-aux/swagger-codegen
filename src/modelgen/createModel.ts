import { clone } from 'ramda'
import { arrayToObject } from 'src/modelgen/util'
import { detectType } from './detectType'


const removeUnwantedProps = p => {
    delete p.enum
    delete p.format
    delete p.$ref
}

const addEnumValues = p => {
    p.values = p.enum
}


const transformKeyVal = (name, val, entityName, required) => ({
    ...val,
    type: detectType(val),
    name,
    id: `${entityName}.${name}`,
    required: required.includes(name)
})


export const createModel = def => {
    def = clone(def)

    const entityName = def.title
    const required = def.required || []

    const properties = Object.entries(def.properties)
        .map(([name, val]) =>
            transformKeyVal(name, val, entityName, required))


    properties.forEach((p: any) => {
        if (p.type === 'enum') {
            addEnumValues(p)
        }
        removeUnwantedProps(p)
    })

    const attr = arrayToObject('name', properties)

    const model = {
        entityName,
        attr
    }

    return model
}


