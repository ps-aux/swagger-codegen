import fs from 'fs'
import path from 'path'
import { createModel } from 'src/modelgen/createModel'
import { modelToCode } from 'src/modelgen/modelToCode'

type Opts = {
    log?: (...a: any) => void
}

export const generateModelFiles = (sourcePath, targetDir, opts: Opts = {}) => {
    const { log = () => null } = opts

    log('Generating model from ', sourcePath, 'to', targetDir)

    const apiSpec = JSON.parse(fs.readFileSync(sourcePath).toString())

    const definitions = Object.values(apiSpec.definitions)

    definitions
        .filter((p: any) => !p.title.startsWith('Page'))
        .forEach((def: any) => {
            const name = def.title
            log(`Generating ${name} model`)
            const fileName = name + '.ts'
            const filePath = path.join(targetDir, fileName)

            const model = {
                version: apiSpec.info.version,
                ...createModel(def)
            }

            const code = modelToCode(model, {
                semicolons: true
            })

            fs.writeFileSync(filePath, code)
        })
}
