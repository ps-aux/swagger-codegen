import { deflatten } from 'src/filter/deflatten'

it('test', () => {
    const res = deflatten(
        [
            ['foo.a.x', 1],
            ['foo.a.y', 2],
            ['foo.b', 3],
            ['bar', 4]])

    expect(res).toEqual({
        foo: {
            a:{
                x: 1,
                y: 2
            },
            b: 3
        },
        bar: 4
    })
})
