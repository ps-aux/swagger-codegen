import { modelToTypescriptCode } from 'src/model/code/modelToTypescriptCode'
import { CodeFormatter } from 'src/code/FormatCode'
import { Api, GenerateModelFiles, Model, ModelFile } from 'src/types'
import { printObject } from 'src/code/codePrint'

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

    log('Generating index file content')

    files.push({
        name: 'index.ts',
        content: createIndex(models, apiInfo)
    })

    const formatCode = CodeFormatter(opts.codeFormat)
    files.forEach(f => {
        f.content = formatCode(f.content)
    })

    return files
}

const createIndex = (models: Model[], apiInfo: Api) => {
    const importStatement = name => `import {${name}} from './${name}'`

    const imports = models.map(m => importStatement(m.entityName)).join('\n')

    const exports = `export {${models.map(m => m.entityName).join(',')}}`

    const all = `[${models.map(m => m.entityName).join(',')}]`

    const code = `
        ${imports}
        ${exports}
        export const api = ${printObject(apiInfo)}
        export const allModels = ${all}
    `
    return code
}
