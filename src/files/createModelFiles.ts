import { modelToTypescriptCode } from 'src/code/typescript/modelToTypescriptCode'
import { CodeFormatter } from 'src/code/FormatCode'
import { indexFileContent } from 'src/files/indexFile'
import { opsTreeToTypescriptCode } from 'src/ops/opsTreeToTypescriptCode'
import {
    enumsToModelTsCode,
    enumsToTsTypesCode
} from 'src/enum/enumTsCodePrinter'
import { CodeFormatOpts } from '../code/types'
import { EnumType } from '../enum/types'
import { Api, CreateModelFiles, CodeFile } from './types'
import { OpsTree } from '../ops/types'
import { Entity } from '../entity/types'
import { TsTypeFileCreator } from '../types/TsTypeFileCreator'

export const createModelFiles: CreateModelFiles = (result, api, opts) => {
    const files: CodeFile[] = []

    const { models, enums, ops } = result

    files.push(...modelFiles(models, opts.removeDefaults))
    files.push(...tsTypesFiles(models, enums))
    files.push(indexFile(models, api))
    files.push(apiOpsFile(ops))
    files.push(...enumFiles(enums))

    const formatted = formatCode(files, opts.format)

    // metaTypingsFiles().forEach(f => formatted.push(f))
    return formatted
}

const modelFiles = (models: Entity[], removeDefaults: boolean): CodeFile[] =>
    models.map(m => {
        const code = modelToTypescriptCode(m, removeDefaults)

        return {
            name: m.name + '.model.ts',
            content: code
        }
    })

const tsTypesFiles = (models: Entity[], enums: EnumType<any>[]): CodeFile[] => {
    const c = new TsTypeFileCreator(enums)
    return models.map(c.for)
}

const indexFile = (models: Entity[], apiInfo: Api) => ({
    name: 'index.ts',
    content: indexFileContent(models, apiInfo)
})

const apiOpsFile = (opsTree: OpsTree) => ({
    name: 'apiOps.ts',
    content: opsTreeToTypescriptCode(opsTree)
})

const enumFiles = (enums: EnumType<any>[]): CodeFile[] => {
    enums.forEach(e => {
        if (!e.id)
            throw new Error(
                `Enum ${JSON.stringify(
                    e
                )} is missing the id prop. Cannot create code.`
            )
    })
    return [
        {
            name: 'enums.model.ts',
            content: enumsToModelTsCode(enums)
        },
        {
            name: 'enums.type.ts',
            content: enumsToTsTypesCode(enums)
        }
    ]
}

const formatCode = (files: CodeFile[], opts: CodeFormatOpts): CodeFile[] => {
    const formatCode = CodeFormatter(opts)
    files.forEach(f => {
        f.content = formatCode(f.content)
    })

    return files
}
