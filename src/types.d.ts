import { SwaggerApiSpec } from './swagger/types'
import { Entity, OpsTree, EnumType } from './model'

export {
    ListType,
    EnumType,
    PrimitiveTypeName,
    PrimitiveType,
    HigherOrderType,
    ObjectType,
    ApiOperation,
    Entity,
    Attribute,
    AttrType,
    ValidationRule
} from './model'

export type Api = {
    version: string
}

export type HttpMethod = 'get' | 'put' | 'post' | 'delete'

export type CodeFormatOpts = {
    semicolons: boolean
    singleQuote: boolean
}

export type GenerateModelFilesOpts = {
    codeFormat: CodeFormatOpts
    log?: (a: any) => void
}

export type ModelFile = {
    content: string
    name: string
}

export type ModelsParsingResult = {
    models: Entity[]
    ops: OpsTree
    enums: EnumType<any>[]
}

// 2nd version

export type CreateModels = (spec: SwaggerApiSpec) => ModelsParsingResult

export type CreateModelFilesOpts = {
    format: CodeFormatOpts
    removeDefaults: boolean
}

export type CreateModelFiles = (
    parsed: ModelsParsingResult,
    apiInfo: {
        version: string
    },
    opts: CreateModelFilesOpts
) => ModelFile[]

export declare const createModels: CreateModels
export declare const createModelFiles: CreateModelFiles
