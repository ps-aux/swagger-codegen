import { EnumType } from '../enum/types'
import { Entity } from '../entity/types'
import { CodeFile } from '../files/types'
import { ImportRegistry } from './ImportRegistry'
import { TsTypeCodeConverter } from './TsTypeCodeConverter'
import { ApiModelTsTypeCreator } from './ApiModelTsTypeCreator'

export class TsTypeFileCreator {
    private codeConverter: TsTypeCodeConverter
    private tsTypeCreator: ApiModelTsTypeCreator

    constructor(enums: EnumType<any>[]) {
        this.codeConverter = new TsTypeCodeConverter(new ImportRegistry(enums))
        this.tsTypeCreator = new ApiModelTsTypeCreator()
    }

    for = (entity: Entity): CodeFile => {
        const name = entity.name

        const tsType = this.tsTypeCreator.fromEntity(entity)

        return {
            name: name + '.model.ts',
            content: this.codeConverter.toCode(name, tsType)
        }
    }
}
