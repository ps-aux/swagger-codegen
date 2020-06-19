export type HttpMethod = 'get' | 'put' | 'post' | 'delete'

export type ApiOperation = {
    path: string
    method: HttpMethod
}

export type OpsTree = {
    [key: string]: ApiOperation | OpsTree
}
