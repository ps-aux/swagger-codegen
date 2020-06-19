import { SwaggerDefinitionProperty } from 'src/swagger/types'
import { extractExtraProps } from 'src/attribute/extra/extractExtraProps'
import { createType } from 'src/attribute/type/TypeParser'
import { parseValidationRules } from 'src/attribute/validation/ValidationsRulesParser'
import { AttrType, ValidationRule } from './types'

export type PropertyParsingResult = {
    type: AttrType | null
    validationRules: ValidationRule[]
    extra: { [key: string]: any }
    couldNotParseType: boolean
}

export const parseSwaggerProperty = (
    prop: SwaggerDefinitionProperty
): PropertyParsingResult => {
    const extra = extractExtraProps(prop)
    const type = createType(prop, extra)
    const validationRules = parseValidationRules(prop)

    const couldNotParseType = !type

    return {
        type,
        validationRules,
        extra,
        couldNotParseType
    }
}
