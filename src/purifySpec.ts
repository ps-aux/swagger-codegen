import crypto from 'crypto'

const { clone } = require('ramda')

const calcHash = str =>
    crypto
        .createHash('md5')
        .update(str)
        .digest('hex')

export const purifySpec = spec => {
    const res = {
        swagger: clone(spec.swagger),
        info: clone(spec.info),
        basePath: clone(spec.basePath),
        tags: clone(spec.tags),
        paths: clone(spec.paths),
        definitions: clone(spec.definitions),
        checksum: ''
    }

    // Remove default param value as it is per env
    Object.entries(res.paths).forEach(([k, v]) => {
        Object.entries(v).forEach(([k, v]) => {
            const params = v.parameters

            const authParam = params.find(p => p.name === 'Authorization')
            delete authParam.default
        })
    })

    res.checksum = calcHash(JSON.stringify(res))

    return res

}

