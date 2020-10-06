import {
    parseSwaggerModel,
    UnparsedModelAttribute
} from 'src/model-parsing/ModelParser'

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
        },
        enum: {
            type: 'string',
            enum: ['Foo', 'Bar'],
            'x-enumId': 'MyEnum'
        },
        enumList: {
            type: 'array',
            items: {
                type: 'string',
                enum: ['A', 'B']
            }
        }
    },
    title: 'Bar'
}
it('works', () => {
    const res = parseSwaggerModel(def)

    expect(res.parsed).toMatchObject([
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
        },
        {
            name: 'name',
            required: false,
            type: {
                name: 'string'
            },
            validationRules: [],
            extra: {},
            originalDef: def.properties.name
        },
        {
            name: 'enum',
            required: false,
            extra: { enumId: 'MyEnum' },
            validationRules: [],
            type: { name: 'enum', id: 'MyEnum', of: ['Foo', 'Bar'] },
            originalDef: def.properties.enum
        },
        {
            name: 'enumList',
            required: false,
            extra: {},
            validationRules: [],
            originalDef: def.properties.enumList,
            type: {
                name: 'list',
                of: {
                    name: 'enum',
                    of: ['A', 'B']
                }
            }
        }
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

    expect(res.enums).toMatchObject([
        { name: 'enum', id: 'MyEnum', of: ['Foo', 'Bar'] }
    ])
})
