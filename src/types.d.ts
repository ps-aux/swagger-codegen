import { OperationType } from './values' // TODO fix warning in Idea

export type BasicType =
    | 'integer'
    | 'double'
    | 'string'
    | 'boolean'
    | 'date'
    | 'enum'
    | 'object'
    | 'ref'
    | 'interval'
    | 'array'

export type Type = {
    name: BasicType | string
    type?: Type | string
}

export type Attribute = {
    name: string
    id: string
    type: Type
    required?: boolean
    values?: string[]
    readOnly?: boolean
    detailOnly?: boolean
    refDataPath?: string
    validations?: ValidationRule[]
}

export type ValidationRuleType =
    | 'pattern'
    | 'length'
    | 'minMax'

export type MinMax = {
    min?: number,
    max?: number
}


export type ValidationRule = {
    type: ValidationRuleType | string,
    value: RegExp | MinMax
}

export interface Model {
    entityName: string
    path: string | null
    operations: string[]
    attr: { [key: string]: Attribute }
    filter: any // TODO
    checksum: string
}

export type FilterParam = {
    name: string
    id: string
    type: Type
    required?: boolean
    values?: string[]
}

export type Filter = { [key: string]: FilterParam }

export type Api = {
    version: string
}
