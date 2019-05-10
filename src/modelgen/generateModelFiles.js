import fs from 'fs'
import path from 'path'
const { genModelCode } = require('./swaggerModelGen')


export const generateModelFiles = (sourcePath, targetDir) => {

    console.log('Generating model from ', sourcePath, 'to', targetDir)

    const apiSpec = JSON.parse(fs.readFileSync(sourcePath).toString())

    const definitions = Object.values(apiSpec.definitions)

    definitions
        .filter((p) => !p.title.startsWith('Page'))
        .forEach((def) => {
            const name = def.title
            const fileName = name + '.ts'
            console.log('Generating model for', name)
            const filePath = path.join(targetDir, fileName)
            const code = genModelCode(def, apiSpec.info.version, {
                semicolons: true
            })
            fs.writeFileSync(filePath, code)
        })
}
