import { CustomTypeDef, Filter, FilterParam } from 'src/types'
import { arrayToObject } from 'src/util'
import { EntityOperation } from 'src/model/EntityOperation'
import { createType } from 'src/attribute/AttributeModel'
import { deflatten } from './deflatten'
import { isTheSameStruct } from './isTheSameStruct'

const isCompositeParam = p => p.name.includes('.')

const objectName = (
    struct: {},
    customTypeDefs: CustomTypeDef[]
): string | null => {
    for (const typeDef of customTypeDefs) {
        const r = isTheSameStruct(typeDef.struct, struct)
        if (r) return typeDef.name
    }
    return null
}

const firstNonComposite = (val: any) => {
    // test if it is param def
    if (val.id && val.name && val.type) return val

    // Go deeper
    return firstNonComposite(Object.values(val)[0])
}

const compositeParamsToParas = (
    comParams: FilterParam[],
    customTypeDefs: CustomTypeDef[],
    paramNameSpace: string
): FilterParam[] => {
    const r = deflatten(comParams.map(x => [x.name, x]))

    return Object.entries(r).map(([name, val]) => {
        const typeName = objectName(val, customTypeDefs)

        if (!typeName)
            throw new Error(
                `Could not map param group '${name}' to a type.
                 JSON: ${JSON.stringify(val)}`
            )

        const first = firstNonComposite(val)

        const required = !!first.required

        const r: FilterParam = {
            id: paramNameSpace + '.' + name,
            name,
            type: {
                name: 'object',
                type: {
                    name: typeName
                }
            }
        }

        if (required) r.required = true

        return r
    })
}

export const createFilterModel = (
    entityName,
    operation: EntityOperation,
    ignoredParams: string[] = [],
    paramNameSpace: string,
    customTypeDefs: CustomTypeDef[]
): Filter | undefined => {
    const paramPrefix = `${entityName}.${paramNameSpace}`

    const params: FilterParam[] = operation.swaggerOp.parameters
        // TODO move string to swagger type defs
        .filter(p => p.in === 'query')
        .map(p => {
            const type = createType(p, {})
            const name = p.name

            const param: FilterParam = {
                id: `${paramPrefix}.${name}`,
                name,
                type
            }
            if (p.required) param.required = true

            if (type.name === 'enum') param.type.values = p.enum

            return param
        })
        .filter(p => !ignoredParams.includes(p.name))

    const nonComposite = params.filter(p => !isCompositeParam(p))

    const compositeParams = params.filter(p => isCompositeParam(p))

    const fromGroups = compositeParamsToParas(
        compositeParams,
        customTypeDefs,
        paramPrefix
    )

    return arrayToObject('name', [...nonComposite, ...fromGroups]) as Filter
}
