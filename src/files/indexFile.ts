import { printObject } from 'src/code/codePrint'
import { Api } from './types'
import { Entity } from '../entity/types'

export const indexFileContent = (models: Entity[], apiInfo: Api): string => {
    const importStatement = name => `import {${name}} from './${name}.model'`

    const imports = models.map(m => importStatement(m.name)).join('\n')

    const exports = `export {${models.map(m => m.name).join(',')}}`

    const all = `[${models.map(m => m.name).join(',')}]`

    const modelObj = `{
        ${models.map(m => m.name).join(',\n')}
     }`

    const code = `
        ${imports}
        ${exports}
        export const apiInfo = ${printObject(apiInfo)}
        export const api = ${modelObj}
        export const allModels = ${all}
    `
    return code
}
