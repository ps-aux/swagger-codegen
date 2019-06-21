import fs, { PathLike } from 'fs'
import path from 'path'
import { modelToCode } from 'src/model/modelToCode'
import { createFilterModel } from 'src/filter/FilterModel'
import { EntityOperationsGroup, entityOperationsMap } from 'src/model/EntityOperationsGroup'
import { createAttributesModel } from 'src/attribute/AttributeModel'
import { CodeFormatter, FormatCode } from 'src/code/FormatCode'
import { Api, Model } from 'types'
import { printObject } from 'src/code/codePrint'
import { calcChecksumFromObj } from 'src/checksum'
import { SwaggerApiSpec, SwaggerDefinition } from 'src/swagger/types'

type Opts = {
    log?: (...a: any) => void
}

const filterModel = (opsGroup: EntityOperationsGroup, entityName: string) => {
    const ignoredParams = ['sort', 'page', 'size']
    return createFilterModel(entityName, opsGroup, ignoredParams)
}

const createModel = (
    entityName: string,
    def: SwaggerDefinition,
    opsGroup?: EntityOperationsGroup
): Model => {
    const data = {
        entityName,
        path: opsGroup ? opsGroup.path : null,
        operations: opsGroup ? opsGroup.operations
            .map(o => o.type) : [],
        attr: createAttributesModel(def, entityName),
        filter: opsGroup ? filterModel(opsGroup, entityName) : null
    }

    const checksum = calcChecksumFromObj(data)

    return {
        ...data,
        checksum
    }
}

export const generateModelFiles = (sourcePath, targetDir, opts: Opts = {}) => {
    const { log = () => null } = opts

    log('Generating model from ', sourcePath, 'to', targetDir)

    const apiSpec = JSON.parse(
        fs.readFileSync(sourcePath).toString()
    ) as SwaggerApiSpec

    const definitions = Object.values(apiSpec.definitions)

    const opsMap = entityOperationsMap(definitions, apiSpec)

    const formatCode = CodeFormatter({
        semicolons: true
    })

    const apiInfo: Api = {
        version: apiSpec.info.version
    }

    const allModels: Model[] = []

    definitions
        .filter(p => !p.title.startsWith('Page') || p.title === 'Sort')
        .forEach(def => {
            const entityName = def.title
            log(`Generating ${entityName} model`)
            const fileName = entityName + '.ts'
            const filePath = path.join(targetDir, fileName)

            const model = createModel(
                entityName,
                def,
                opsMap.get(def)
            )

            const code = modelToCode(model, { formatCode })

            fs.writeFileSync(filePath, code)

            allModels.push(model)
        })

    log('Generating index file')
    createIndex(
        allModels,
        path.join(targetDir, 'index.ts'),
        apiInfo,
        formatCode
    )
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
