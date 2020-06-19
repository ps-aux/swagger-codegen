import { createType } from 'src/model-parsing/attribute/type/TypeParser'

it('works', () => {
    const t = createType(
        {
            type: 'string',
            enum: ['a', 'b', 'c']
        },
        {}
    )

    expect(t).toMatchObject({
        name: 'enum',
        of: ['a', 'b', 'c']
    })
})
