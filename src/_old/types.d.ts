import { SwaggerApiSpec } from 'src/swagger/types'
import { Model } from 'src/_old/model'
import { GenerateModelFilesOpts, ModelFile } from 'src/types'

export type GenerateModelFiles = (
    models: Model[],
    apiInfo: {
        version: string
    },
    opts: GenerateModelFilesOpts
) => ModelFile[]

export type CustomTypeDef = {
    name: string
    struct: {}
}

export type CreateModels = (
    spec: SwaggerApiSpec,
    customTypeDefs: CustomTypeDef[]
) => Model[]

export declare const createModels: CreateModels
