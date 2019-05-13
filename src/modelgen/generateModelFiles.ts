import fs from 'fs'
import path from 'path'
import { createModel } from 'src/modelgen/createModel'
import { modelToCode } from 'src/modelgen/modelToCode'
import { objectToArray, arrayToObject } from 'src/modelgen/util'
import { FilterParam } from 'types'
import { detectType } from 'src/modelgen/detectType'

type Opts = {
    log?: (...a: any) => void
}

const findEndpoint = (name, endpoints: Endpoint[]) => {
    return endpoints.find(e =>
        e.operations.find(o => o.tags.includes(name))
    )
}

type Endpoint = {
    path: string,
    operations: any[]
}


const getEndpoints = (apiSpec: any): Endpoint[] =>
    objectToArray('path', apiSpec.paths)
        .map(({ path, ...ops }) => ({
            path,
            operations: objectToArray('method', ops)
        }))

export const generateModelFiles = (sourcePath, targetDir, opts: Opts = {}) => {
    const { log = () => null } = opts

    log('Generating model from ', sourcePath, 'to', targetDir)

    const apiSpec = JSON.parse(fs.readFileSync(sourcePath).toString())

    const definitions = Object.values(apiSpec.definitions)
    const endpoints = getEndpoints(apiSpec)


    definitions
        .filter((p: any) => !p.title.startsWith('Page'))
        .forEach((def: any) => {
            const entityName = def.title
            log(`Generating ${entityName} model`)
            const fileName = entityName + '.ts'
            const filePath = path.join(targetDir, fileName)


            const model = createModel(def)

            const endpoint = findEndpoint(entityName, endpoints)

            let filter: any = null
            if (endpoint) {
                filter = calcFilterModel(entityName, endpoint)
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


const calcFilterModel = (entityName, endpoint: Endpoint): any => {
    const getOp = endpoint.operations.find(o => o.method === 'get')

    const params: FilterParam[] = getOp.parameters.filter(p => p.in === 'query')
        .map(p => {

            const type = detectType(p)
            const name = p.name

            const res: FilterParam = {
                id: `${entityName}.filter.${name}`,
                name,
                type,
                required: p.required,
            }

            if (type === 'enum')
                res.values = p.enum

            return res
        })

    return arrayToObject('name', params)

}
