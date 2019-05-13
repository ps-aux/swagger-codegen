export const detectType = val => {
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
