import 'core-js/features/array/flat-map'
import { SwaggerApiSpec, SwaggerDefinition, SwaggerOperation } from 'src/swagger/types'
import { OperationType } from 'src/values'

const beforeId = /(.*)\/\{id\}/

const removeIdParam = (path: string) => {
    if (!path.includes('{id}'))
        return path

    return path.match(beforeId)!![1]
}

export const entityOperationsMap = (defs: SwaggerDefinition[],
                                    spec: SwaggerApiSpec): Map<SwaggerDefinition, EntityOperationsGroup> => {

    const byPath = Object.entries(spec.paths)
        .flatMap(([path, val]) =>
            Object.values(val)
                .map(val => ({
                    path: removeIdParam(path),
                    swaggerOp: val
                }))
        )


    // TODO why no type inference ?
    const m = new Map<SwaggerDefinition, EntityOperationsGroup>()
    defs.forEach(d => {
        const thisOps = byPath.filter(
            o => o.swaggerOp.tags.includes(d.title))

        if (thisOps.length < 1)
            return

        const operations: EntityOperation[] = thisOps
            .map(so => ({
                type: getOperationType(so.swaggerOp.tags),
                swaggerOp: so.swaggerOp
            }))
            .filter(op => op.type) as EntityOperation[]

        const opsGroup = {
            path: thisOps[0].path,
            operations
        }
        m.set(d, opsGroup)
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
    swaggerOp: SwaggerOperation
}

export type EntityOperationsGroup = {
    path: string,
    operations: EntityOperation[]
}
