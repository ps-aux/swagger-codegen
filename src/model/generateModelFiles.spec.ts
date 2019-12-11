import { generateModelFiles } from 'src/model/generateModelFiles'
import fs from 'fs'
import { readApiSpec } from 'src/apispec/readApiSpec'
import { createModels } from 'src/model/createModel'

// eslint-disable-next-line no-path-concat
const schemaDir = __dirname + '/../../test/testSchema.json'

const testDir = './test'
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

    generateModelFiles(
        models,
        { version: apiSpec.info.version },
        outputDir,
        () => null
    )

    expectSameContent(outputDir + '/Foo.ts', testDir + '/Foo.expected.ts')
    expectSameContent(outputDir + '/Bar.ts', testDir + '/Bar.expected.ts')
    expectSameContent(outputDir + '/index.ts', testDir + '/index.expected.ts_')
})
