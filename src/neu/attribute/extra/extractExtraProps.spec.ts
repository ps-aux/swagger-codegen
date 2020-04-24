import { extractExtraProps } from 'src/neu/attribute/extra/extractExtraProps'
import { SwaggerDefinitionProperty } from 'src/swagger/types'

it('works', () => {
    // @ts-ignore
    const prop = {
        'x-foo': 'a',
        'x-bar': 123,
        'x-baz': true,
        'x-refDataFor': 'bar',
        'v-other': 'nope'
    } as SwaggerDefinitionProperty

    const res = extractExtraProps(prop)

    expect(res).toEqual({
        foo: 'a',
        bar: 123,
        baz: true,
        refDataFor: 'bar'
    })
})
