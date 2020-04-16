import { Api, CodeFormatOpts, CreateModelFiles, ModelFile } from 'src/types'
import { modelToTypescriptCode } from 'src/neu/code/modelToTypescriptCode'
import { CodeFormatter } from 'src/code/FormatCode'
import { indexFileContent } from 'src/neu/files/indexFile'
import { definitionFiles } from 'src/neu/files/definitionFiles'
import { opsTreeToTypescriptCode } from 'src/neu/ops/opsTreeToTypescriptCode'
import { Model, OpsTree } from 'src/neu/model'
import { modelToTypescriptTypeCode } from 'src/neu/code/modelToTypescripTypeDef'

export const createModelFiles: CreateModelFiles = (models, api, ops, opts) => {
    const files: ModelFile[] = []

    files.push(...modelFiles(models, opts.removeDefaults))
    files.push(...tsTypesFiles(models))
    files.push(indexFile(models, api))
    files.push(apiOpsFile(ops))

    const formatted = formatCode(files, opts.format)

    // We cannot format ts files for now
    definitionFiles().forEach(f => formatted.push(f))
    return formatted
}

const modelFiles = (models: Model[], removeDefaults: boolean): ModelFile[] =>
    models.map(m => {
        const code = modelToTypescriptCode(m, removeDefaults)

        return {
            name: m.name + '.model.ts',
            content: code
        }
    })

const tsTypesFiles = (models: Model[]): ModelFile[] =>
    models.map(m => {
        const code = modelToTypescriptTypeCode(m)

        return {
            name: m.name + '.type.ts',
            content: code
        }
    })

const indexFile = (models: Model[], apiInfo: Api) => ({
    name: 'index.ts',
    content: indexFileContent(models, apiInfo)
})

const apiOpsFile = (opsTree: OpsTree) => ({
    name: 'apiOps.ts',
    content: opsTreeToTypescriptCode(opsTree)
})

const formatCode = (files: ModelFile[], opts: CodeFormatOpts): ModelFile[] => {
    const formatCode = CodeFormatter(opts)
    files.forEach(f => {
        f.content = formatCode(f.content)
    })

    return files
}
