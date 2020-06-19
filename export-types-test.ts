import {
    Attribute,
    PrimitiveType,
    PrimitiveTypeName,
    HigherOrderType,
    ObjectType,
    ListType,
    EnumType,
    AttrType,
    ValidationRule,
    Entity,
    CreateModels,
    CreateModelFiles,
    ModelFile
} from 'src/types'

type Test = {
    attribute: {
        Attribute: Attribute
        PrimitiveType: PrimitiveType
        PrimitiveTypeName: PrimitiveTypeName
        HigherOrderType: HigherOrderType<any>
        ObjectType: ObjectType
        ListType: ListType<any>
        EnumType: EnumType<any>
        AttrType: AttrType
        ValidationRule: ValidationRule
    }
    model: {
        Entity: Entity
    }
    enum: {
        EnumType: EnumType<any>
    }
    files: {
        CreateModels: CreateModels
        CreateModelFiles: CreateModelFiles
        ModelFile: ModelFile
    }
}
