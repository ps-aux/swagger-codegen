import { Attribute, AttrType, ValidationRule } from 'src/neu/model'

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
