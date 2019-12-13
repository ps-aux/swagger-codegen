import {
    ParsedModelAttribute,
    parseSwaggerModel,
    UnparsedModelAttribute
} from 'src/neu/ModelParser'

const def = {
    type: 'object',
    required: ['number', 'unknown'],
    properties: {
        number: {
            'x-foo': 'bar',
            type: 'integer',
            format: 'int64'
        },
        name: {
            type: 'string'
        },
        unknown: {
            type: '--blabla'
        }
    },
    title: 'Bar'
}
it('works', () => {
    const res = parseSwaggerModel(def)

    const parsed = res.parsed

    expect(parsed).toMatchObject([
        {
            name: 'number',
            type: {
                name: 'integer'
            },
            required: true,
            validationRules: [],
            extra: {
                foo: 'bar'
            },
            originalDef: def.properties.number
        } as ParsedModelAttribute,
        {
            name: 'name',
            required: false,
            type: {
                name: 'string'
            },
            validationRules: [],
            extra: {},
            originalDef: def.properties.name
        } as ParsedModelAttribute
    ])

    const unparsed = res.unparsed

    expect(unparsed).toMatchObject([
        {
            name: 'unknown',
            required: true,
            validationRules: [],
            extra: {},
            originalDef: def.properties.unknown
        } as UnparsedModelAttribute
    ])
})
