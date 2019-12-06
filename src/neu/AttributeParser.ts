import { SwaggerDefinitionProperty } from 'src/swagger/types'
import { extractExtraProps } from 'src/attribute/extractExtraProps'
import { Type, ValidationRule } from 'new-types'
import { createType } from 'src/neu/TypeParser'
import { parseValidationRules } from 'src/neu/ValidationsRulesParser'

export type PropertyParsingResult = {
    type: Type | null
    validationRules: ValidationRule[]
    extra: { [key: string]: any }
    couldNotParseType: boolean
}

export const parseSwaggerProperty = (
    prop: SwaggerDefinitionProperty
): PropertyParsingResult => {
    const type = createType(prop)
    const extra = extractExtraProps(prop)
    const validationRules = parseValidationRules(prop)

    const couldNotParseType = !!type

    return {
        type,
        validationRules,
        extra,
        couldNotParseType
    }
}
