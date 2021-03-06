const printPropVal = val => {
    if (typeof val === 'string') val = `'${val}'`
    else if (typeof val === 'number') {
    } else if (Array.isArray(val)) {
        return `[${val.map(printPropVal).join(',')}]`
    } else if (val instanceof RegExp) {
        return `/${val.source}/`
    } else if (typeof val === 'object') {
        val = printObject(val)
    }

    return val
}

const printAttr = (key, val) => `${key}:${printPropVal(val)}`

export const printObject = obj => {
    if (obj === null) return 'null'
    if (obj === undefined) return 'undefined'
    return `{
        ${Object.entries(obj)
            .map(e => printAttr(e[0], e[1]))
            .join(',\n')}
    }`
}
