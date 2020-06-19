import { SwaggerOperation, SwaggerPath, SwaggerPaths } from 'src/swagger/types'
import { Entry, unflatten } from 'src/util/flatten'
import { ApiOperation, HttpMethod, OpsTree } from './types'
import { parseParams } from './parameter/parseParams'

const getTagVal = (prefix: string, tags: string[]): string | null => {
    const ops = tags.filter(t => t.startsWith(`${prefix}.`))

    if (ops.length === 0) return null
    if (ops.length > 1)
        throw new Error(
            `Multiple '${prefix}*' tags detected in ${JSON.stringify(tags)}`
        )

    return ops[0].split('.')[1]
}

const getOperationName = (tags: string[]): string | null => {
    const opTag = getTagVal('operation', tags)

    if (!opTag) return null

    const opGroupTag = getTagVal('opGroup', tags)

    if (opGroupTag) return opGroupTag + '.' + opTag

    return opTag
}

const toApiOperation = (
    path: string,
    method: string,
    op: SwaggerOperation
): ApiOperation => {
    const params = op.parameters

    if (!params) console.log(path, method, op, 'doe snot have params')
    return {
        path,
        method: method as HttpMethod, // TODO handle in typesystem somehow ?,
        params: parseParams(params)
    }
}

const getNamedOperations = (
    path: string,
    sp: SwaggerPath
): [string, ApiOperation][] => {
    const processed: [string | null, ApiOperation][] = Object.entries(sp).map(
        ([method, op]) => [
            getOperationName(op!.tags),
            toApiOperation(path, method, op!)
        ]
    )

    // Filter out unnamed ones
    // @ts-ignore
    return processed.filter(([name]) => !!name)
}

/**
 * TODO prevent overwriting in case of conflicts in path - throw exception instead
 */
export const createOpsTree = (paths: SwaggerPaths): OpsTree => {
    const res = Object.entries(paths).flatMap(([path, swaggerPath]) =>
        getNamedOperations(path, swaggerPath)
    )

    const entries: Entry[] = res.map(([name, val]) => [name.split('.'), val])

    return unflatten(entries) as OpsTree
}
