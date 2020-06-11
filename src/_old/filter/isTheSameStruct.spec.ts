import { isTheSameStruct } from 'src/_old/filter/isTheSameStruct'

it('works', () => {
    const def = {
        a: 'string',
        b: {
            c: 'number'
        }
    }

    const structA = {
        a: {
            type: {
                name: 'string'
            }
        },
        b: {
            c: {
                type: {
                    name: 'number'
                }
            }
        }
    }

    const res1 = isTheSameStruct(def, structA)
    expect(res1).toBe(true)

    const res2 = isTheSameStruct(
        {
            a: 'string'
        },
        structA
    )
    expect(res2).toBe(false)
})
