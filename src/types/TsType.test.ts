import { attributeMapToTs } from './ApiModelTsTypeCreator'
import { Attribute, AttrType } from '../attribute/types'

it('PrimitiveTypeStructure', () => {
    /*
    const d: PrimitiveTypeStructure = {
        a: {
            name: 'string'
        },
        b: {
            a: {
                c: {
                    name: 'integer'
                }
            }
        }
    }
*/
    /*
    expect(res).toEqual(
        formatCode(`
        export type foo =
         {
              a: string
              b: {
                a: {
                  c: number
                }
              }
         }
        `)
    )
*/
})

it('AttrTypeMap', () => {
    const attr = (type: AttrType, required = true): Attribute => ({
        type,
        required,
        name: 'any',
        id: 'any',
        extra: [],
        validationRules: []
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const x = attributeMapToTs({
        a: attr({
            name: 'integer'
        }),
        b: attr(
            {
                name: 'string'
            },
            false
        ),
        c: attr({
            name: 'object',
            of: 'ObjType'
        }),
        d: attr({
            name: 'list',
            of: {
                name: 'string'
            }
        }),
        e: attr({
            name: 'list',
            of: {
                name: 'object',
                of: 'ItemType'
            }
        })
    })
    // const code = exportTypeCode('foo', x)
    // const res = formatCode(code)

    /*
    expect(res).toEqual(
        formatCode(`
        export type foo =
         {
              a: number,
              b?: string
              c: ObjType,
              d: string[]
              e: ItemType[]
         }
        `)
    )
*/
})
