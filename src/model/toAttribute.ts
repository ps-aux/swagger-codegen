import { HigherOrderType, AttrType } from 'src/neu/model'
import { Attribute, Type as OldType } from 'src/types'
import { ParsedModelAttribute } from 'src/neu/ModelParser'

const convertType = (type: AttrType): OldType => {
    // @ts-ignore
    if (!type.of) {
        // Primitive type
        return {
            name: type.name
        }
    }
    const hoType: HigherOrderType<any> = type as HigherOrderType<any>

    if (hoType.name === 'enum') {
        return {
            name: 'enum',
            values: hoType.of
        }
    } else if (hoType.name === 'list') {
        return {
            name: 'array',
            type: convertType(hoType.of as AttrType)
        }
    } else if (hoType.name === 'object') {
        return {
            name: 'object',
            type: {
                name: hoType.of
            }
        }
    }

    throw new Error(
        `Could not map type ${JSON.stringify(type)} to an old type format`
    )
}

export const toAttr = (
    p: ParsedModelAttribute,
    entityName: string
): Attribute => {
    let type = convertType(p.type)

    if (p.extra.ref) {
        type = {
            name: 'ref',
            type: {
                name: p.extra.ref
            }
        }
    }

    const res: Attribute = {
        type,
        name: p.name,
        id: `${entityName}.${p.name}`
    }

    if (p.required) res.required = true

    if (p.extra.readOnly) res.readOnly = true
    if (p.extra.detailOnly) res.detailOnly = true

    if (p.validationRules.length > 0) {
        res.validations = p.validationRules.map(({ name, value }) => ({
            type: name,
            value
        }))
    }

    if (res.type.name === 'ref' && p.extra.refDataPath) {
        res.refDataPath = p.extra.refDataPath
    }

    return res
}
