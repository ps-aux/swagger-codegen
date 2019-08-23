import 'core-js/features/array/flat-map'
import { SwaggerApiSpec, SwaggerDefinition, SwaggerOperation } from 'src/swagger/types'
import { OperationType } from 'src/values'

const beforeId = /(.*)\/\{id\}/

// we might use later
// eslint-ignore
const removeIdParam = (path: string) => {
    if (!path.includes('{id}'))
        return path

    return path.match(beforeId)!![1]
}


const sortOrder = {
    [OperationType.CREATE]: 0,
    [OperationType.UPDATE]: 1,
    [OperationType.DELETE]: 2,
    [OperationType.DETAIL]: 3,
    [OperationType.LIST_BY_PAGE]: 4,
    [OperationType.LIST_ALL]: 5
}

export const entityOperationsMap = (defs: SwaggerDefinition[],
                                    spec: SwaggerApiSpec): Map<SwaggerDefinition, EntityOperation[]> => {

    const byPath = Object.entries(spec.paths)
        .flatMap(([path, val]) =>
            Object.values(val)
                .map(val => ({
                    path,
                    swaggerOp: val
                }))
        )


    // TODO why no type inference ?
    const m = new Map<SwaggerDefinition, EntityOperation[]>()
    defs.forEach(d => {
        const thisOps = byPath.filter(
            o => o.swaggerOp.tags.includes(d.title))

        if (thisOps.length < 1)
            return

        const operations: EntityOperation[] = thisOps
            .map(so => ({
                type: getOperationType(so.swaggerOp.tags),
                path: so.path,
                swaggerOp: so.swaggerOp,
            }))
            .filter(op => op.type) as EntityOperation[]

        // Sort them in predictable order
        operations.sort((a, b) => sortOrder[a.type] - sortOrder[b.type])


        m.set(d, operations)
    })

    return m
}

const getOperationType = (tags: string[]): OperationType | null => {
    for (let t of tags) {
        if (Object.values(OperationType).includes(t))
            return t as OperationType
    }

    return null
}

export type EntityOperation = {
    type: OperationType,
    path: string,
    swaggerOp: SwaggerOperation
}

