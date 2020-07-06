import { SwaggerApiSpec } from 'src/swagger/types'
import { Model } from 'src/_old/model'
import { GenerateModelFilesOpts, CodeFile } from '../files/types'

export type GenerateModelFiles = (
    models: Model[],
    apiInfo: {
        version: string
    },
    opts: GenerateModelFilesOpts
) => CodeFile[]

export type CustomTypeDef = {
    name: string
    struct: {}
}

export type CreateModels = (
    spec: SwaggerApiSpec,
    customTypeDefs: CustomTypeDef[]
) => Model[]

export declare const createModels: CreateModels
