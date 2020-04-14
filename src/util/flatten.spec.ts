import { Entry, unflatten } from 'src/util/flatten'

it('unflatten', () => {
    const res = unflatten([[['a', 'b', 'c'], 'foo'], [['a', 'x'], 'bar']])

    expect(res).toEqual({
        a: {
            b: {
                c: 'foo'
            },
            x: 'bar'
        }
    })
})

describe('unflatten conflicts detected', () => {
    const testConflicts = (input: Entry[]) => {
        expect(() => {
            unflatten(input)
        }).toThrowError(/^Paths.* are in conflict$/)
    }

    it('same path', () => {
        testConflicts([[['a', 'b', 'c'], 'any'], [['a', 'b', 'c'], 'any']])
    })
    it('sub path', () => {
        testConflicts([[['a', 'b', 'c'], 'any'], [['a', 'b'], 'any']])
    })
    it('sub path (reversed)', () => {
        testConflicts([[['a', 'b'], 'any'], [['a', 'b', 'c'], 'any']])
    })
})
