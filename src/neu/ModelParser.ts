import { SwaggerDefinition, SwaggerDefinitionProperty } from 'src/swagger/types'
import { Type, ValidationRule } from 'new-types'
import { parseSwaggerProperty } from 'src/neu/attribute/AttributeParser'

export type UnparsedModelAttribute = {
    name: string
    validationRules: ValidationRule[]
    extra: { [key: string]: any }
    required: boolean
    originalDef: SwaggerDefinitionProperty
}

export type ParsedModelAttribute = UnparsedModelAttribute & {
    type: Type
}

export type ModelParsingResult = {
    parsed: ParsedModelAttribute[]
    unparsed: UnparsedModelAttribute[]
}

export const parseSwaggerModel = (
    def: SwaggerDefinition
): ModelParsingResult => {
    const requiredProps = def.required || []

    const parsed: ParsedModelAttribute[] = []
    const unparsed: UnparsedModelAttribute[] = []

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
        } else {
            parsed.push({ ...attr, type: p.type! })
        }
    })

    return {
        parsed,
        unparsed
    }
}
