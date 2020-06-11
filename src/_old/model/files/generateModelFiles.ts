import { modelToTypescriptCode } from 'src/_old/model/code/modelToTypescriptCode'
import { CodeFormatter } from 'src/code/FormatCode'
import { CodeFormatOpts, ModelFile } from 'src/types'
import { indexFileContent } from 'src/_old/model/files/indexFile'
import { definitionFiles } from 'src/_old/model/files/definitionFiles'
import { GenerateModelFiles } from 'src/_old/types'

export const generateModelFiles: GenerateModelFiles = (
    models,
    apiInfo,
    opts
) => {
    const log =
        opts.log ||
        (() => {
            return undefined
        })

    const files: ModelFile[] = models.map(m => {
        log(`Generating ${m.entityName} model`)

        const fileName = m.entityName + '.ts'
        // const filePath = path.join(targetDir, fileName)

        const code = modelToTypescriptCode(m)

        return {
            content: code,
            name: fileName
        }
    })

    files.push({
        name: 'index.ts',
        content: indexFileContent(models, apiInfo)
    })

    const formatted = formatCode(files, opts.codeFormat)

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
