import { TsTypeReference } from './TsType'
import { EnumType } from '../enum/types'
import { arrayToObject } from '../util'

export class ImportRegistry {
    constructor(private enums: EnumType<any>[]) {}

    private isEnum = (name): boolean => {
        const enumsDic = arrayToObject('id', this.enums)
        return !!enumsDic[name]
    }

    importFor = (ref: TsTypeReference): string => {
        const id = ref.id
        if (this.isEnum(id)) return './enums.type'
        return `./${ref.name}.type`
    }
}
