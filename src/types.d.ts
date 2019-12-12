import { SwaggerApiSpec } from './swagger/types'
import { Model } from './model'
import {
    Model as _Model2,
    Attribute as _Attribute2,
    Type as _Type2,
    ValidationRule as _ValidationRule2
} from './/neu/model'

export {
    ListType,
    EnumType,
    PrimitiveTypeName,
    PrimitiveType,
    HigherOrderType,
    ObjectType
} from './neu/model'

export {
    TypeName,
    Type,
    ValidationRule,
    Attribute,
    Model,
    Operation,
    FilterParam,
    Filter,
    MinMax,
    Operations,
    ValidationRuleType
} from './model'

export type Model2 = _Model2
export type Attribute2 = _Attribute2
export type Type2 = _Type2
export type ValidationRule2 = _ValidationRule2

export type Api = {
    version: string
}

export type CustomTypeDef = {
    name: string
    struct: {}
}

export type HttpMethod = 'get' | 'put' | 'post' | 'delete'

export type CreateModels = (
    spec: SwaggerApiSpec,
    customTypeDefs: CustomTypeDef[]
) => Model[]

export declare const createModels: CreateModels

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

export type GenerateModelFiles = (
    models: Model[],
    apiInfo: {
        version: string
    },
    opts: GenerateModelFilesOpts
) => ModelFile[]

export declare const generateModelFiles: GenerateModelFiles

// 2nd version

export type CreateModels2 = (spec: SwaggerApiSpec) => Model2[]

export type CreateModelFilesOpts = {
    format: CodeFormatOpts
    removeDefaults: boolean
}

export type CreateModelFiles = (
    models: Model2[],
    apiInfo: {
        version: string
    },
    opts: CreateModelFilesOpts
) => ModelFile[]

export declare const createModels2: CreateModels2
export declare const createModelFiles: CreateModelFiles
