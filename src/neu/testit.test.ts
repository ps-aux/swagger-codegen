import { readApiSpec } from 'src/apispec/readApiSpec'
import { createModels } from 'src/neu/createModels'
import path from 'path'
import fs from 'fs'
import { createModelFiles } from 'src/neu/files/createModelFiles'

it('test', () => {
    // eslint-disable-next-line no-path-concat
    const root = __dirname + '/../..'

    const schemaDir = root + '/test/testSchema.json'

    const apiSpec = readApiSpec(schemaDir)
    const models = createModels(apiSpec)

    const files = createModelFiles(
        models,

        { version: '123' },
        {
            format: {
                semicolons: true,
                singleQuote: true
            },
            removeDefaults: true
        }
    )

    // console.log('models', files)
    const targetDir = root + '/tst'

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir)
    files.forEach(f => {
        const p = path.join(targetDir, f.name)
        fs.writeFileSync(p, f.content)
    })
})
