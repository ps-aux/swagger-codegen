import { Attribute, PrimitiveType } from '../attribute/types'

export type Entity = {
    name: string
    attrs: { [key: string]: Attribute }
}

export type PrimitiveTypeStructure = {
    [key: string]: PrimitiveType | PrimitiveTypeStructure
}

export type AttributeMap = {
    [key: string]: Attribute
}
