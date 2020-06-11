import {
    ParsedModelAttribute,
    parseSwaggerModel
} from 'src/model/entity/ModelParser'
import { Attribute, EnumType, Entity } from 'src/model'
import { createOpsTree } from 'src/ops/createOpsTree'
import { CreateModels } from 'src/types'

const toAttr = (p: ParsedModelAttribute, entityName: string): Attribute => ({
    name: p.name,
    id: `${entityName}.${p.name}`,
    type: p.type,
    required: p.required,
    validationRules: p.validationRules,
    extra: p.extra
})

const enumCollector = () => {
    const data: any = {}

    return {
        add: (e: EnumType<any>) => {
            if (!e.id)
                throw new Error(
                    `Enum ${JSON.stringify(
                        e
                    )} is missing the id prop. Cannot collect it.`
                )

            data[e.id] = e
        },
        collect: (): EnumType<any>[] => {
            return Object.values(data)
        }
    }
}

export const createModels: CreateModels = apiSpec => {
    const enums = enumCollector()

    const models: Entity[] = Object.entries(apiSpec.definitions).map(
        ([entityName, def]) => {
            const res = parseSwaggerModel(def)

            if (res.unparsed.length > 0)
                throw new Error(
                    'Coudl not parse definition:\n ' + JSON.stringify(def)
                )

            const attrs: { [key: string]: Attribute } = {}

            res.enums.forEach(enums.add)

            res.parsed.forEach(r => {
                attrs[r.name] = toAttr(r, entityName)
            })

            return {
                name: entityName,
                attrs
            }
        }
    )

    return {
        models,
        ops: createOpsTree(apiSpec.paths),
        enums: enums.collect()
    }
}
