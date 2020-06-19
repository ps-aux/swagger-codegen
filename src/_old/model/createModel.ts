import { Attribute, Model, Operation, Operations } from 'src/_old/model'
import { SwaggerDefinition } from 'src/swagger/types'
import {
    EntityOperation,
    entityOperationsMap
} from 'src/_old/model/EntityOperation'
import { calcChecksumFromObj } from 'src/checksum'
import { createFilterModel } from 'src/_old/filter/FilterModel'
import { parseSwaggerModel } from 'src/model-parsing/ModelParser'
import { toAttr } from 'src/_old/model/toAttribute'
import { CreateModels, CustomTypeDef } from 'src/_old/types'

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
    const p = parseSwaggerModel(def)

    if (p.unparsed.length > 0)
        throw new Error(
            `Some attributes could not be parsed:\n ${JSON.stringify(
                p.unparsed
            )}`
        )

    const attrs: { [key: string]: Attribute } = {}

    p.parsed.forEach(pAttr => {
        // Do not include refData props
        if (pAttr.extra.refDataFor) return
        const a = toAttr(pAttr, entityName)
        attrs[pAttr.name] = a
    })

    const data = {
        entityName,
        attr: attrs,
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

export const createModels: CreateModels = (spec, customTypeDefs) => {
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
