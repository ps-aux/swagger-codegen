import { ParsedModelAttribute, parseSwaggerModel } from 'src/neu/ModelParser'
import { Attribute, Model } from 'src/neu/model'
import { CreateModels2 } from 'src/types'
import { createOpsTree } from 'src/neu/ops/createOpsTree'

const toAttr = (p: ParsedModelAttribute, entityName: string): Attribute => ({
    name: p.name,
    id: `${entityName}.${p.name}`,
    type: p.type,
    required: p.required,
    validationRules: p.validationRules,
    extra: p.extra
})

export const createModels: CreateModels2 = apiSpec => {
    const models: Model[] = Object.entries(apiSpec.definitions).map(
        ([entityName, def]) => {
            const res = parseSwaggerModel(def)

            if (res.unparsed.length > 0)
                throw new Error(
                    'Coudl not parse definition:\n ' + JSON.stringify(def)
                )

            const attrs: { [key: string]: Attribute } = {}

            res.parsed.forEach(r => {
                attrs[r.name] = toAttr(r, entityName)
            })

            return {
                name: entityName,
                attrs
            }
        }
    )

    return { models, ops: createOpsTree(apiSpec.paths) }
}
