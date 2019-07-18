export type TypeName =
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
    name: TypeName | string
    type?: Type
    values?: string[] // in case of an array
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


export type Operation = {
    type: string, // cannot be an enum
    params?: Filter
}

export type Operations = { [key: string]: Operation }

export interface Model {
    entityName: string
    path: string | null
    attr: { [key: string]: Attribute }
    operations?: Operations,
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
