import {
    AttrType,
    EnumType,
    ListType,
    ObjectType,
    PrimitiveType
} from 'src/neu/model'

export const PrimitiveTypes = {
    string: 'string',
    integer: 'integer',
    boolean: 'boolean',
    double: 'double',
    date: 'date'
}

export const isPrimitiveType = (type: AttrType): type is PrimitiveType =>
    type.name in PrimitiveTypes

const ObjectTypeName = 'object'

const ListTypeName = 'list'

const EnumTypeName = 'enum'

export const isObjectType = (type: AttrType): type is ObjectType =>
    type.name === ObjectTypeName

export const isListType = (type: AttrType): type is ListType<any> =>
    type.name === ListTypeName

export const isEnumType = (type: AttrType): type is EnumType<any> =>
    type.name === EnumTypeName
