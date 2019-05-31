import { objectToArray } from 'src/modelgen/util'

export const getEntityOperation = (apiSpec: any): EntityOperationsGroup[] =>
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
