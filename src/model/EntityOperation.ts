import 'core-js/features/array/flat-map'
import { SwaggerApiSpec, SwaggerDefinition, SwaggerOperation } from 'src/swagger/types'
import { OperationType } from 'src/values'
import { Endpoint, specEndpoints } from 'src/model/Endpoint'

const entityEndpoints = (defs: SwaggerDefinition[], spec: SwaggerApiSpec) => {
    const allEndpoints = specEndpoints(spec)
    return new Map(
        defs.map(d => {
            const endpoints = allEndpoints.filter(e => e.tags.includes(d.title))
            return [d, endpoints] as [SwaggerDefinition, Endpoint[]]
        })
    )
}

const toEntityOperation = (e: Endpoint): EntityOperation | null => {
    const type = getOperationType(e.tags)

    if (!type) return null

    return {
        type,
        path: e.path,
        swaggerOp: e.op
    }
}

export const entityOperationsMap = (
    defs: SwaggerDefinition[],
    spec: SwaggerApiSpec
): Map<SwaggerDefinition, EntityOperation[]> => {
    const endpointmap: Map<SwaggerDefinition, Endpoint[]> = entityEndpoints(
        defs,
        spec
    )

    return new Map(
        Array.from(endpointmap.entries()).map(([d, endpts]) => {
            const operations = endpts
                .map(toEntityOperation)
                .filter(op => op != null) as EntityOperation[]

            operations.sort((a, b) => a.type.localeCompare(b.type))

            return [d, operations]
        })
    )
}

const opPrefix = 'operation'

/**
 * Type is detected if tags contain either one of supported OperationType or 'operation.<name>'
 */
const getOperationType = (tags: string[]): string | null => {
    for (let t of tags) {
        if (Object.values(OperationType).includes(t)) return t
    }

    const startExpr = `${opPrefix}.`

    const prefixed = tags.filter(t => t.startsWith(startExpr))

    if (prefixed.length === 0) return null

    if (prefixed.length > 1)
        throw new Error(
            `Multiple tags with '${opPrefix}' prefix. Cannot determine operation name`
        )

    const opTag = prefixed[0]

    return opTag.split(startExpr)[1]!
}

export type EntityOperation = {
    type: string
    path: string
    swaggerOp: SwaggerOperation
}
