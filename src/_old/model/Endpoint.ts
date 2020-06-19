import { SwaggerApiSpec, SwaggerOperation } from 'src/swagger/types'
import { HttpMethod } from '../../ops/types'

export type Endpoint = {
    path: string
    method: HttpMethod
    tags: string[]
    op: SwaggerOperation
}

export const specEndpoints = (spec: SwaggerApiSpec): Endpoint[] => {
    const endpoints: Endpoint[] = Object.entries(spec.paths).flatMap(
        ([path, val]) =>
            Object.entries(val).map(([method, op]) => ({
                path,
                method: method as HttpMethod,
                tags: op!.tags,
                op: op!
            }))
    )

    return endpoints
}
