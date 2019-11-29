import { extractExtraProps } from 'src/attribute/extractExtraProps'

it('works', () => {
    const res = extractExtraProps({
        'x-foo': 'a',
        'x-bar': 123,
        'x-baz': true,
        'x-refDataFor': 'bar',
        'v-other': 'nope'
    })

    expect(res).toEqual({
        foo: 'a',
        bar: 123,
        baz: true,
        refDataFor: 'bar'
    })
})
