import { SwaggerApiSpec } from '../swagger/types'
import { OpsTree } from '../ops/types'
import { EnumType } from '../enum/types'
import { Entity } from '../entity/types'

export type ModelsParsingResult = {
    models: Entity[]
    ops: OpsTree
    enums: EnumType<any>[]
}

export type CreateModels = (spec: SwaggerApiSpec) => ModelsParsingResult
