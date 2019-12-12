import { Api } from 'src/types'
import { printObject } from 'src/code/codePrint'
import { Model } from 'src/neu/model'

export const indexFileContent = (models: Model[], apiInfo: Api): string => {
    const importStatement = name => `import {${name}} from './${name}'`

    const imports = models.map(m => importStatement(m.name)).join('\n')

    const exports = `export {${models.map(m => m.name).join(',')}}`

    const all = `[${models.map(m => m.name).join(',')}]`

    const code = `
        ${imports}
        ${exports}
        export const api = ${printObject(apiInfo)}
        export const allModels = ${all}
    `
    return code
}
