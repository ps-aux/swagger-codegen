import { Attribute, SwaggerDefinitionProperty, ValidationRule } from 'types'

export const calcValidationRules = (
    attr: Attribute,
    prop: SwaggerDefinitionProperty
): ValidationRule[] => {
    const res: ValidationRule[] = []

    if (prop.pattern) {
        res.push({
            type: 'pattern',
            value: RegExp(prop.pattern)
        })
    }
    if (prop.minLength != null || prop.maxLength != null) {
        res.push({
            type: 'length',
            value: {
                min: prop.minLength,
                max: prop.maxLength
            }
        })
    }

    if (prop.minimum != null || prop.maximum != null) {
        res.push({
            type: 'minMax',
            value: {
                min: prop.minimum,
                max: prop.maximum
            }
        })
    }

    return res
}
