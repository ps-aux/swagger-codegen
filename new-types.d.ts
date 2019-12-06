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
    name: PrimitiveTypeName
}

export type HighOrderType<T> = {
    name: string
    of: T
}

export type ObjectType = HighOrderType<string> & {
    name: 'object'
}

export type ListType<T extends Type> = HighOrderType<T> & {
    name: 'list'
}

export type EnumType<T> = HighOrderType<T[]> & {
    name: 'enum'
}

export type Type = PrimitiveType | HighOrderType<any>

export type ValidationRule = {
    name: string
    value: any
}

export type Attribute = {
    name: string
    id: string
    type: Type
    required: boolean
    validationRules?: ValidationRule[]
}
