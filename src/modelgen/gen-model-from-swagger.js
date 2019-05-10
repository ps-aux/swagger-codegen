const fs = require('fs')
const path = require('path')
const { genModelCode } = require('./swaggerModelGen')

const args = process.argv

const sourcePath = args[2]
const targetDir = args[3]

console.log('Generating model from ', sourcePath, 'to', targetDir)

const apiSpec = JSON.parse(fs.readFileSync(sourcePath).toString())

const definitions = Object.values(apiSpec.definitions)

if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir)
}

fs.copyFileSync(path.resolve(__dirname, 'types.d.ts'), path.resolve(targetDir, 'types.d.ts'))

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

