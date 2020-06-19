import { Model } from 'src/_old/model'
import { printObject } from 'src/code/codePrint'
import { Api } from '../../../files/types'

export const indexFileContent = (models: Model[], apiInfo: Api): string => {
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
