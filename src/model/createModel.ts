import { CustomTypeDef, Model, Operation, Operations } from 'src/types'
import { SwaggerApiSpec, SwaggerDefinition } from 'src/swagger/types'
import { EntityOperation, entityOperationsMap } from 'src/model/EntityOperation'
import { createAttributesModel } from 'src/attribute/AttributeModel'
import { calcChecksumFromObj } from 'src/checksum'
import { createFilterModel } from 'src/filter/FilterModel'

const operations = (
    entityName: string,
    ops: EntityOperation[],
    customTypeDefs: CustomTypeDef[]
): Operations => {
    const operations = {}

    ops.forEach(o => {
        const opModel = {
            method: o.method,
            type: o.type
        } as Operation

        opModel.path = o.path
        operations[opModel.type] = opModel

        // Both have prefix 'filter' as requsted by frontend team
        if (opModel.type === 'listAll') {
            opModel.params = createFilterModel(
                entityName,
                o,
                [],
                'filter',
                customTypeDefs
            )
        }

        if (opModel.type === 'listByPage') {
            opModel.params = createFilterModel(
                entityName,
                o,
                ['sort', 'page', 'size'],
                'filter',
                customTypeDefs
            )
        }
    })

    return operations
}

const createModel = (
    entityName: string,
    def: SwaggerDefinition,
    customTypesDefs: CustomTypeDef[],
    ops?: EntityOperation[]
): Model => {
    const data = {
        entityName,
        attr: createAttributesModel(def, entityName),
        operations: ops
            ? operations(entityName, ops, customTypesDefs)
            : undefined
    }

    const checksum = calcChecksumFromObj(data)

    return {
        ...data,
        checksum
    }
}

export const createModels = (
    spec: SwaggerApiSpec,
    customTypeDefs: CustomTypeDef[]
): Model[] => {
    const definitions = Object.values(spec.definitions)

    const opsMap = entityOperationsMap(definitions, spec)

    const res: Model[] = []

    definitions
        .filter(p => !p.title.startsWith('Page') || p.title === 'Sort')
        .forEach(def => {
            const entityName = def.title

            const model = createModel(
                entityName,
                def,
                customTypeDefs,
                opsMap.get(def)
            )

            res.push(model)
        })

    return res
}
