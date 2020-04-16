import { Model2 } from 'src/types'
import { dummyModelAttribute } from 'test/neu/model/ModelAttributeTestHelpers'
import {
    modelToTypescriptTypeDef,
    typescriptTypeDefToCode
} from 'src/neu/code/modelToTypescripTypeDef'

it('works', () => {
    const model = {
        name: 'Foo',
        attrs: {
            foo: dummyModelAttribute('foo')
        }
    } as Model2

    const res = modelToTypescriptTypeDef(model)

    expect(res).toEqual({
        name: 'Foo',
        imports: [],
        attrs: {
            foo: 'string'
        }
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const code = typescriptTypeDefToCode(res)

    // console.log(code)
})
