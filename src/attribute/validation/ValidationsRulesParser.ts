import { SwaggerDefinitionProperty } from 'src/swagger/types'
import { ValidationRule } from '../types'

export const parseValidationRules = (
    prop: SwaggerDefinitionProperty
): ValidationRule[] => {
    const res: ValidationRule[] = []

    if (prop.pattern) {
        res.push({
            name: 'pattern',
            value: RegExp(prop.pattern)
        })
    }
    if (prop.minLength != null || prop.maxLength != null) {
        res.push({
            name: 'length',
            value: {
                min: prop.minLength,
                max: prop.maxLength
            }
        })
    }

    if (prop.minimum != null || prop.maximum != null) {
        res.push({
            name: 'minMax',
            value: {
                min: prop.minimum,
                max: prop.maximum
            }
        })
    }

    return res
}
