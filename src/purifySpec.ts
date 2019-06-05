import { calcChecksumFromObj } from 'src/checksum'

const { clone } = require('ramda')


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

    res.checksum = calcChecksumFromObj(res)

    return res

}

