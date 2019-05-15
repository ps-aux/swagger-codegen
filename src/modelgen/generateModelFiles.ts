import fs from 'fs'
import path from 'path'
import { modelToCode } from 'src/modelgen/modelToCode'
import { createFilterModel } from 'src/modelgen/FilterModel'
import { findEntityOperations, getEntityOperation } from 'src/modelgen/EntityOperationsGroup'
import { createEntityModel } from 'src/modelgen/EntityModel'


type Opts = {
    log?: (...a: any) => void
}

export const generateModelFiles = (sourcePath, targetDir, opts: Opts = {}) => {
    const { log = () => null } = opts

    log('Generating model from ', sourcePath, 'to', targetDir)

    const apiSpec = JSON.parse(fs.readFileSync(sourcePath).toString())

    const definitions = Object.values(apiSpec.definitions)
    const allEntityOps = getEntityOperation(apiSpec)


    definitions
        .filter((p: any) => !p.title.startsWith('Page'))
        .forEach((def: any) => {
            const entityName = def.title
            log(`Generating ${entityName} model`)
            const fileName = entityName + '.ts'
            const filePath = path.join(targetDir, fileName)


            const model = createEntityModel(def)

            const endpoint = findEntityOperations(entityName, allEntityOps)

            let filter: any = null
            const ignoredParams = ['sort', 'page', 'size']
            if (endpoint) {
                filter = createFilterModel(entityName, endpoint, ignoredParams)
            }


            const version = apiSpec.info.version
            const code = modelToCode({
                version,
                ...model,
                filter: filter
            }, {
                semicolons: true
            })

            fs.writeFileSync(filePath, code)
        })
}



