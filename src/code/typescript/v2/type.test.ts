import { exportTypeCode } from './myTsTypeCodeExport'
import {
    attributeMapToTs,
    PrimitiveTypeStructure,
    primitiveTypeStructureToTs
} from './modelMyTsTypeMapping'
import { CodeFormatter } from '../../FormatCode'
import { Attribute, AttrType } from '../../../attribute/types'

const formatCode = CodeFormatter({
    semicolons: false,
    singleQuote: true
})

it('PrimitiveTypeStructure', () => {
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
    const x = primitiveTypeStructureToTs(d)

    const code = exportTypeCode('foo', x)
    const res = formatCode(code)

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

    const code = exportTypeCode('foo', x)
    const res = formatCode(code)

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
})
