import { CodeFormatOpts, CreateModelFiles, ModelFile } from 'src/types'
import { modelToTypescriptCode } from 'src/neu/code/modelToTypescriptCode'
import { CodeFormatter } from 'src/code/FormatCode'
import { indexFileContent } from 'src/neu/files/indexFile'
import { definitionFiles } from 'src/neu/files/definitionFiles'
import { opsTreeToTypescriptCode } from 'src/neu/ops/opsTreeToTypescriptCode'

export const createModelFiles: CreateModelFiles = (
    models,
    api,
    opsTree,
    opts
) => {
    const files = models.map(m => {
        const code = modelToTypescriptCode(m, opts.removeDefaults)

        return {
            name: m.name + '.ts',
            content: code
        }
    })

    files.push({
        name: 'index.ts',
        content: indexFileContent(models, api)
    })
    files.push({
        name: 'apiOps.ts',
        content: opsTreeToTypescriptCode(opsTree)
    })

    const formatted = formatCode(files, opts.format)

    // We cannot format ts files for now
    definitionFiles().forEach(f => formatted.push(f))
    return formatted
}

const formatCode = (files: ModelFile[], opts: CodeFormatOpts): ModelFile[] => {
    const formatCode = CodeFormatter(opts)
    files.forEach(f => {
        f.content = formatCode(f.content)
    })

    return files
}
