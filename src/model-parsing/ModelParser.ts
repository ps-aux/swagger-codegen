import { SwaggerDefinition, SwaggerDefinitionProperty } from 'src/swagger/types'
import { parseSwaggerProperty } from 'src/model-parsing/attribute/AttributeParser'
import { isEnumType } from 'src/model.consts'
import { AttrType, ValidationRule } from '../attribute/types'
import { EnumType } from '../enum/types'

export type UnparsedModelAttribute = {
    name: string
    validationRules: ValidationRule[]
    extra: { [key: string]: any }
    required: boolean
    originalDef: SwaggerDefinitionProperty
}

export type ParsedModelAttribute = UnparsedModelAttribute & {
    type: AttrType
}

export type ModelParsingResult = {
    parsed: ParsedModelAttribute[]
    unparsed: UnparsedModelAttribute[]
    enums: EnumType<any>[]
}

export const parseSwaggerModel = (
    def: SwaggerDefinition
): ModelParsingResult => {
    const requiredProps = def.required || []

    const parsed: ParsedModelAttribute[] = []
    const unparsed: UnparsedModelAttribute[] = []

    const enums: EnumType<any>[] = []
    Object.entries(def.properties || []).forEach(([key, val]) => {
        const name = key
        const p = parseSwaggerProperty(val)

        const required = requiredProps.includes(name)

        const attr: UnparsedModelAttribute = {
            name: key,
            required,
            extra: p.extra,
            validationRules: p.validationRules,
            originalDef: val
        }
        if (p.couldNotParseType) {
            unparsed.push(attr)
            return
        }
        const type = p.type!
        parsed.push({ ...attr, type })
        if (isEnumType(type)) enums.push(type)
    })

    return {
        parsed,
        unparsed,
        enums
    }
}
