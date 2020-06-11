import { SwaggerPaths } from 'src/swagger/types'
import { createOpsTree } from 'src/ops/createOpsTree'
import { OpsTree } from 'src/model'

it('works', () => {
    const input: SwaggerPaths = {
        'api/a/{id}/b': {
            get: {
                tags: ['operation.foo', 'opGroup.Foo'],
                summary: 'wowo',
                parameters: []
            }
        },
        'api/x': {
            get: {
                tags: ['operation.foo2', 'opGroup.Foo'],
                summary: '',
                parameters: []
            }
        },
        'api/a': {
            post: {
                tags: ['operation.globalFoo'],
                summary: '',
                parameters: []
            }
        },
        'api/b': {
            post: {
                tags: ['operation.bar', 'opGroup.Bar'],
                summary: '',
                parameters: []
            }
        }
    }

    const res = createOpsTree(input)

    const expeted: OpsTree = {
        Foo: {
            foo: {
                method: 'get',
                path: 'api/a/{id}/b'
            },
            foo2: { method: 'get', path: 'api/x' }
        },
        globalFoo: { method: 'post', path: 'api/a' },
        Bar: {
            bar: {
                method: 'post',
                path: 'api/b'
            }
        }
    }

    expect(res).toEqual(expeted)
})
