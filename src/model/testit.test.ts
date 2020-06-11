import { readApiSpec } from 'src/_old/apispec/readApiSpec'
import { createModels } from 'src/model/entity/createModels'
import path from 'path'
import fs from 'fs'
import { createModelFiles } from 'src/files/createModelFiles'

it('test', () => {
    // eslint-disable-next-line no-path-concat
    const root = __dirname + '/../..'

    const schemaDir = root + '/test/testSchema.json'

    const apiSpec = readApiSpec(schemaDir)
    const res = createModels(apiSpec)

    const files = createModelFiles(
        res,
        { version: '123' },
        {
            format: {
                semicolons: true,
                singleQuote: true
            },
            removeDefaults: true
        }
    )

    const targetDir = root + '/tst'

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir)
    files.forEach(f => {
        const p = path.join(targetDir, f.name)
        fs.writeFileSync(p, f.content)
    })
})
