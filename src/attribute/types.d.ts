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

export type ListType<T extends AttrType> = HigherOrderType<T> & {
    name: 'list'
}

export type EnumType<T> = HigherOrderType<T[]> & {
    name: 'enum'
    id?: string // Optional for now
}

export type AttrType = PrimitiveType | HigherOrderType<any>

export type ValidationRule = {
    name: string
    value: any
}

export type Attribute = {
    name: string
    id: string
    type: AttrType
    required: boolean
    validationRules: ValidationRule[]
    extra: { [key: string]: any }
}
