import { SwaggerDefinition } from 'src/swagger/types'
import { Type, ValidationRule } from 'new-types'
import { parseSwaggerProperty } from 'src/neu/AttributeParser'

export type UnparsedModelAttribute = {
    name: string
    validationRules: ValidationRule[]
    extra: { [key: string]: any }
    required: boolean
    originalDef: SwaggerDefinition
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
    if (!def.properties) throw new Error('"properties" missing in definition')

    const requiredProps = def.required || []

    const parsed: ParsedModelAttribute[] = []
    const unparsed: UnparsedModelAttribute[] = []

    Object.entries(def.properties).forEach(([key, val]) => {
        const name = key
        const p = parseSwaggerProperty(val)

        const required = requiredProps.includes(name)

        const attr: UnparsedModelAttribute = {
            name: key,
            required,
            extra: p.extra,
            validationRules: p.validationRules,
            originalDef: def
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
