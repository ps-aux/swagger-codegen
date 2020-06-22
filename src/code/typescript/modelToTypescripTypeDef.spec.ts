import { dummyModelAttribute } from 'test/model/ModelAttributeTestHelpers'
import {
    modelToTypescriptTypeDef,
    typescriptTypeDefToCode
} from 'src/code/typescript/modelToTypescripTypeDef'
import { Entity } from '../../entity/types'

it('works', () => {
    const model = {
        name: 'Foo',
        attrs: {
            foo: dummyModelAttribute('foo')
        }
    } as Entity

    const res = modelToTypescriptTypeDef(model)

    expect(res).toEqual({
        name: 'Foo',
        imports: [],
        attrs: {
            foo: {
                name: 'string',
                optional: true
            }
        }
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const code = typescriptTypeDefToCode(res, x => false)

    // console.log(code)
})
