import {
    GenericType,
    MyTsType,
    TsPrimitiveType,
    TsReferencedGenericType,
    TsReferenceType,
    TsStructureType
} from './types'
import { PrimitiveTypes } from '../../model.consts'
import { TsBuildInTypes } from './modelToTypescripTypeDef'
import { PrimitiveType } from '../../attribute/types'

it('works', () => {
    const prim: TsPrimitiveType = 'string'

    const ref: TsReferenceType = {
        id: 'Foo',
        name: 'Foo',
        _tsRef: true
    }

    const struc: TsStructureType = {
        a: { def: 'string', nullable: false },
        b: {
            def: {
                id: 'Foo',
                name: 'Foo'
            },
            nullable: false
        },
        c: {
            def: {
                ca: {
                    def: prim,
                    nullable: true
                },
                cb: {
                    def: {
                        cba: {
                            def: {
                                id: 'Foo',
                                name: 'Foo'
                            },
                            nullable: true
                        }
                    },
                    nullable: true
                }
            },
            nullable: false
        },
        ref: {
            def: ref,
            nullable: true
        }
    }

    const genNat: GenericType<TsPrimitiveType> = {
        name: 'array',
        of: {
            def: prim,
            nullable: false
        },
        _tsGeneric: true
    }

    const genRef: TsReferencedGenericType<TsStructureType> = {
        id: 'myArray.id',
        name: 'myArray',
        of: {
            def: struc,
            nullable: false
        },
        _tsRef: true
    }

    let t: MyTsType = struc
    t = prim
    t = ref
    t = genNat
    t = genRef

    console.log('t si', t)
})

const primitiveTsTypeName = (t: PrimitiveType): TsPrimitiveType => {
    switch (t.name) {
        case PrimitiveTypes.string:
            // @ts-ignore
            return TsBuildInTypes.string
        case PrimitiveTypes.boolean:
            // @ts-ignore
            return TsBuildInTypes.boolean
        case PrimitiveTypes.integer:
        case PrimitiveTypes.double:
            // @ts-ignore
            return TsBuildInTypes.number
        case PrimitiveTypes.date:
            // @ts-ignore
            return TsBuildInTypes.date
    }

    throw new Error(`Could not map primitive type ${t.name} to TS type`)
}

/*
const foo = (dic: PrimitiveTypeStructure): TsStructureType => {
    return mapObject(dic, (v: PrimitiveType | PrimitiveTypeStructure) => {
        if (isPrimitiveType(v)) return primitiveTsTypeName(v)
        else return foo(v)
    })
}

*/

it('go ', () => {
    const d = {
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
    // const x = foo(d)
    // console.log(x)
})
