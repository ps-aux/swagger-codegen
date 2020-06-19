import { OpParameterModel } from './parameter/types'

export type HttpMethod = 'get' | 'put' | 'post' | 'delete'
export * from './parameter/types'

export type ApiOperation = {
    path: string
    method: HttpMethod
    params: OpParameterModel
}

export type OpsTree = {
    [key: string]: ApiOperation | OpsTree
}
