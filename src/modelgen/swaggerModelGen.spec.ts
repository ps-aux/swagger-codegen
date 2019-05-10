import {  genModelCode } from 'swagger/modelgen/swaggerModelGen'

const Foo = {
    type: 'object',
    required: [
        'bar',
        'baz',
    ],
    properties: {
        id: {
            type: 'integer',
            format: 'int64'
        },
        bar: {
            type: 'string'
        },
        baz: {
            type: 'integer',
            format: 'int64'
        },
        aDate: {
            type: 'string',
            format: 'date-time'
        },
        status: {
            type: 'string',
            enum: ['a', 'b', 'c']
        },
    },
    title: 'Foo'
}

it('works', () => {
    genModelCode(Foo, 'abc')
})
