import {
    AttrType,
    ListType,
    ObjectType,
    PrimitiveType
} from './attribute/types'
import { EnumType } from './enum/types'

export const PrimitiveTypes = {
    string: 'string',
    integer: 'integer',
    boolean: 'boolean',
    double: 'double',
    date: 'date'
}

export const isPrimitiveType = (obj: any): obj is PrimitiveType =>
    obj.name in PrimitiveTypes

const ObjectTypeName = 'object'

const ListTypeName = 'list'

const EnumTypeName = 'enum'

export const isObjectType = (type: AttrType): type is ObjectType =>
    type.name === ObjectTypeName

export const isListType = (type: AttrType): type is ListType<any> =>
    type.name === ListTypeName

export const isEnumType = (type: AttrType): type is EnumType<any> =>
    type.name === EnumTypeName
