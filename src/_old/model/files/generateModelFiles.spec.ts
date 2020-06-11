import { generateModelFiles } from 'src/_old/model/files/generateModelFiles'
import fs from 'fs'
import { readApiSpec } from 'src/_old/apispec/readApiSpec'
import { createModels } from 'src/_old/model/createModel'
import path from 'path'

// eslint-disable-next-line no-path-concat
const schemaDir = __dirname + '/../../_test/testSchema.json'

const testDir = './src/_old/_test'
const outputDir = testDir + '/build'

const expectSameContent = (file, expected) => {
    const content = fs.readFileSync(file).toString()
    const expectedContent = fs.readFileSync(expected).toString()
    expect(content).toEqual(expectedContent)
}

it('model code generated properly', () => {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

    const customTypeDefs = [
        {
            name: 'DateInterval',
            struct: {
                from: 'date',
                to: 'date'
            }
        }
    ]

    const apiSpec = readApiSpec(schemaDir)
    const models = createModels(apiSpec, customTypeDefs)

    const files = generateModelFiles(
        models,
        { version: apiSpec.info.version },
        {
            codeFormat: {
                singleQuote: true,
                semicolons: true
            }
        }
    )

    files.forEach(f => {
        const p = path.join(outputDir, f.name)
        fs.writeFileSync(p, f.content)
    })

    expectSameContent(outputDir + '/Foo.ts', testDir + '/Foo.expected.ts')
    expectSameContent(outputDir + '/Bar.ts', testDir + '/Bar.expected.ts')
    expectSameContent(outputDir + '/index.ts', testDir + '/index.expected.ts_')
})
