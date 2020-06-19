import { Attribute } from '../../src/attribute/types'

export const dummyModelAttribute = (name: string): Attribute => ({
    name: name,
    id: `dummy.${name}`,
    type: {
        name: 'string'
    },
    required: false,
    validationRules: [],
    extra: {}
})
