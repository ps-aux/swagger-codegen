import { SwaggerPaths } from 'src/swagger/types'
import { ApiOperation, OpsTree } from 'src/model'
import { Entry, unflatten } from 'src/util/flatten'

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

/**
 * TODO prevent overwriting in case of conflicts in path - throw exception instead
 */
export const createOpsTree = (paths: SwaggerPaths): OpsTree => {
    const res: [string, ApiOperation][] = Object.entries(paths)
        .flatMap(([path, ops]) => {
            return Object.entries(ops).map(
                ([method, op]) =>
                    [getOperationName(op!.tags), { method, path }] as [
                        string,
                        ApiOperation
                    ]
            )
        })
        .filter(([name]) => !!name)

    const entries: Entry[] = res.map(([name, val]) => [name.split('.'), val])

    return unflatten(entries) as OpsTree
}
