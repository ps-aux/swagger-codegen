export type HttpMethod = 'get' | 'put' | 'post' | 'delete'
export * from './parameter/types'

export type ApiOperation = {
    path: string
    method: HttpMethod
}

export type OpsTree = {
    [key: string]: ApiOperation | OpsTree
}
