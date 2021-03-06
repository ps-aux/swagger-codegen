import { SwaggerDefinitionProperty } from 'src/swagger/types'
import { ExtraProps } from '../../../attribute/types'

const regex = /(x-)(.*)/

export const extractExtraProps = (p: SwaggerDefinitionProperty): ExtraProps => {
    const res = {}
    Object.keys(p)
        .map(k => k.match(regex))
        .filter(m => !!m)
        .forEach((m: any) => {
            const origProp = m[0]
            const newName = m[2]
            res[newName] = p[origProp]
        })

    return res
}
