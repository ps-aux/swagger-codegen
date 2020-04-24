import { SwaggerDefinitionProperty } from 'src/swagger/types'
import { extractExtraProps } from 'src/neu/attribute/extra/extractExtraProps'
import { AttrType, ValidationRule } from 'src/neu/model'
import { createType } from 'src/neu/attribute/type/TypeParser'
import { parseValidationRules } from 'src/neu/attribute/validation/ValidationsRulesParser'

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
