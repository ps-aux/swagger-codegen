import { SwaggerDefinitionProperty } from 'src/swagger/types'
import { extractExtraProps } from 'src/model/attribute/extra/extractExtraProps'
import { AttrType, ValidationRule } from 'src/model'
import { createType } from 'src/model/attribute/type/TypeParser'
import { parseValidationRules } from 'src/model/attribute/validation/ValidationsRulesParser'

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
