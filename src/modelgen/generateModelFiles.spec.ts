import { generateModelFiles } from 'src/modelgen/generateModelFiles'
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

    generateModelFiles(schemaDir, outputDir)
    expectSameContent(outputDir + '/Foo.ts', testDir + '/Foo.expected.ts')
    expectSameContent(outputDir + '/Bar.ts', testDir + '/Bar.expected.ts')
    expectSameContent(outputDir + '/index.ts', testDir + '/index.expected.ts_')
})
