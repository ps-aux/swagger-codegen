import { FilterParam } from 'types'
import { detectType } from 'src/modelgen/detectType'
import { arrayToObject, groupBy } from 'src/modelgen/util'
import { EntityOperationsGroup } from 'src/modelgen/EntityOperationsGroup'

const isCompositeParam = p => p.name.includes('.')

const paramGroupToParam = (name, params, entityName): FilterParam => {
    // for now we support only intervals

    const handleError = reason => {
        throw new Error(
            `Unsupported param group, name:'${name}', params: ${JSON.stringify(
                params
            )}. ${reason}`
        )
    }

    if (params.length !== 2) handleError('Expecting exactly 2 params')

    const from = params.find(p => p.name === `${name}.from`)
    const to = params.find(p => p.name === `${name}.to`)

    if (!from || !to) {
        handleError('Missing either from or to')
    }

    if (from.type.name !== to.type.name) handleError('Type of from and to does not match')

    if (from.required !== to.required)
        handleError('Required value of from and to does not match')

    const res: FilterParam = {
        id: `${entityName}.filter.${name}`,
        name,
        type: {
            name: 'interval',
            type: from.type
        }
    }
    if (from.required)
        res.required = from.required

    return res
}

export const createFilterModel = (
    entityName,
    opsGroup: EntityOperationsGroup,
    ignoredParams: string[] = []
): any => {
    const getOp = opsGroup.operations.find(o => o.method === 'get')

    const params: FilterParam[] = getOp.parameters
        .filter(p => p.in === 'query')
        .map(p => {
            const type = detectType(p)
            const name = p.name

            const param: FilterParam = {
                id: `${entityName}.filter.${name}`,
                name,
                type: {
                    name: type
                }
            }
            if (p.required)
                param.required = true

            if (type === 'enum') param.values = p.enum

            return param
        })
        .filter(p => !ignoredParams.includes(p.name))

    const nonComposite = params.filter(p => !isCompositeParam(p))

    const compositeParams = params.filter(p => isCompositeParam(p))

    const groups = groupBy(i => i.name.split('.')[0], compositeParams)

    const fromGroups = Object.entries(groups).map(([name, items]: any[]) =>
        paramGroupToParam(name, items, entityName)
    )

    return arrayToObject('name', [...nonComposite, ...fromGroups])
}
