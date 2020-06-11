import { Attribute, Entity } from 'src/model'
import { clone } from 'ramda'

const removeFromAttr = (a: Attribute) => {
    if (a.validationRules.length === 0) delete a.validationRules
    if (!a.required) delete a.required
    if (Object.keys(a.extra).length === 0) delete a.extra
}

export const removeDefaultsNoise = (m: Entity): any => {
    const cp = clone(m)

    Object.values(cp.attrs).forEach(a => {
        removeFromAttr(a)
    })

    return cp
}
