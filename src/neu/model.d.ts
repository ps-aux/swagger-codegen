export type Model = {
    name: string
    attrs: { [key: string]: Attribute }
}

export type PrimitiveTypeName =
    | 'string'
    | 'integer'
    | 'double'
    | 'boolean'
    | 'date'

export type PrimitiveType = {
    // Hack for https://stackoverflow.com/questions/59714310/typescript-string-union-type-inferences-problem-in-composite-types
    name: PrimitiveTypeName | string
}

export type HigherOrderType<T> = {
    name: string
    of: T
}

export type ObjectType = HigherOrderType<string> & {
    name: 'object'
}

export type ListType<T extends Type> = HigherOrderType<T> & {
    name: 'list'
}

export type EnumType<T> = HigherOrderType<T[]> & {
    name: 'enum'
}

export type Type = PrimitiveType | HigherOrderType<any>

export type ValidationRule = {
    name: string
    value: any
}

export type Attribute = {
    name: string
    id: string
    type: Type
    required: boolean
    validationRules: ValidationRule[]
    extra: { [key: string]: any }
}
