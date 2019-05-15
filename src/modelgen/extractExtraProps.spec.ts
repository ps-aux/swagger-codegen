import { extractExtraProps } from 'src/modelgen/extractExtraProps'

it('works', () => {

    const res = extractExtraProps({
        'x-foo': 'a',
        'x-bar': 123,
        'x-baz': true,
        'v-other': 'nope'
    })

    expect(res).toEqual({
        foo: 'a',
        bar: 123,
        baz: true
    })

})
