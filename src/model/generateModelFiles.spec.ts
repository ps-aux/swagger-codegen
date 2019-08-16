import { generateModelFiles } from 'src/model/generateModelFiles'
import fs from 'fs'

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

    generateModelFiles(schemaDir, outputDir, {
        customTypeDefs
    })
    expectSameContent(outputDir + '/Foo.ts', testDir + '/Foo.expected.ts')
    expectSameContent(outputDir + '/Bar.ts', testDir + '/Bar.expected.ts')
    expectSameContent(outputDir + '/index.ts', testDir + '/index.expected.ts_')
})
