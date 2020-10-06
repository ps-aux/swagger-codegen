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
    CodeFile
} from 'src/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
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
        ModelFile: CodeFile
    }
}
