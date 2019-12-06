import fs, { PathLike } from 'fs'
import path from 'path'
import { modelToCode } from 'src/model/modelToCode'
import { CodeFormatter, FormatCode } from 'src/code/FormatCode'
import { Api, Model } from 'src/types'
import { printObject } from 'src/code/codePrint'

export const generateModelFiles = (
    models: Model[],
    apiInfo: {
        version: string
    },
    targetDir,
    log
) => {
    const formatCode = CodeFormatter({
        semicolons: true
    })

    models.forEach(m => {
        log(`Writing ${m.entityName} model`)

        const fileName = m.entityName + '.ts'
        const filePath = path.join(targetDir, fileName)

        const code = modelToCode(m, { formatCode })
        fs.writeFileSync(filePath, code)
    })

    log('Generating index file')
    createIndex(models, path.join(targetDir, 'index.ts'), apiInfo, formatCode)
}

const createIndex = (
    models: Model[],
    path: PathLike,
    apiInfo: Api,
    formatCode: FormatCode
) => {
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

    fs.writeFileSync(path, formatCode(code))
}
