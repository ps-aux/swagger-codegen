import { objectToArray } from 'src/util'
import { SwaggerApiSpec } from 'src/swagger/types'

export const getEntityOperation = (apiSpec: SwaggerApiSpec): EntityOperationsGroup[] =>
    objectToArray('path', apiSpec.paths)
        .map(({ path, ...ops }) => ({
            path,
            operations: objectToArray('method', ops)
        }))


export const findEntityOperations = (name, endpoints: EntityOperationsGroup[]):
    EntityOperationsGroup | undefined =>
    endpoints.find(e =>
        e.operations.find(o => o.tags.includes(name)) )

export type EntityOperationsGroup = {
    path: string,
    operations: any[]
}
