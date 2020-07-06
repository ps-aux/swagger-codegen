import { SwaggerPaths } from 'src/swagger/types'
import { createOpsTree } from 'src/ops/createOpsTree'
import { OpsTree } from './types'

it('works', () => {
    const input: SwaggerPaths = {
        'api/a/{id}/b': {
            get: {
                tags: ['operation.foo', 'opGroup.Foo'],
                summary: 'wowo',
                parameters: [
                    {
                        in: 'body',
                        name: 'foo',
                        description: 'any',
                        required: true,
                        schema: {
                            $ref: '#/definitions/MyDef'
                        }
                    },
                    {
                        name: 'pathParam',
                        in: 'path',
                        description: 'any',
                        required: true,
                        type: 'integer',
                        format: 'int64'
                    },
                    {
                        name: 'queryParam',
                        in: 'query',
                        description: 'any',
                        required: true,
                        type: 'string'
                    }
                ]
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
                /*
                params: {
                    body: {
                        name: 'object',
                        of: 'MyDef'
                    },
                    path: {
                        pathParam: {
                            name: 'integer'
                        }
                    },
                    query: {
                        queryParam: {
                            name: 'string'
                        }
                    }
                }
*/
            },
            foo2: {
                method: 'get',
                path: 'api/x'
                // params: {}
            }
        },
        globalFoo: {
            method: 'post',
            path: 'api/a'
            // params: {}
        },
        Bar: {
            bar: {
                method: 'post',
                path: 'api/b'
                // params: {}
            }
        }
    }

    expect(res).toEqual(expeted)
})
