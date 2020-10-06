import { clone } from 'ramda'
import { Attribute } from '../attribute/types'
import { Entity } from '../entity/types'

// TODO
const removeFromAttr = (a: Attribute) => {
    if (a.validationRules.length === 0) {
        // @ts-ignore
        delete a.validationRules
    }
    if (!a.required) {
        // @ts-ignore
        delete a.required
    }
    if (Object.keys(a.extra).length === 0) {
        // @ts-ignore
        delete a.extra
    }
}

export const removeDefaultsNoise = (m: Entity): any => {
    const cp = clone(m)

    Object.values(cp.attrs).forEach(a => {
        removeFromAttr(a)
    })

    return cp
}
