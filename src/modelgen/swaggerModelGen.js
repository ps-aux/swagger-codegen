const { clone } = require('ramda')
const prettier = require('prettier')

const printPropVal = (val) => {

    if (typeof val === 'string')
        val = `'${val}'`
    else if (typeof val === 'number') {
    } else if (Array.isArray(val)) {
        return `[${val.map(printPropVal).join(',')}]`
    } else if (typeof val === 'object') {
        val = printObject(val)
    }

    return val
}

const printAttr = (key, val) =>
    `${key}:${printPropVal(val)}`

const printObject = obj => {

    return `{
        ${Object.entries(obj)
        .map(e => printAttr(e[0], e[1]))
        .join(',\n')}
    }`
}

const toObject = (nameAttr, props) => {
    const res = {}

    props.forEach(p => {
        res[p[nameAttr]] = p
    })

    return res
}

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

const genModel = def => {
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

    properties.forEach((p) => {
        if (p.type === 'enum') {
            p.values = p.enum
        }
        delete p.enum
        delete p.format
        delete p.$ref
    })

    const attr = toObject('name', properties)

    const model = {
        entityName,
        attr
    }

    // console.log(code)
    return model
}

const genModelCode = (def, version, { semicolons = false } = {}) => {
    const model = { version, ...genModel(def) }
    const code = `export const ${model.entityName} = ${printObject(model)}`

    const prettified = prettier.format(code,
        { semi: semicolons, parser: 'babel', singleQuote: true })
    return prettified
}

module.exports.genModelCode = genModelCode
