import { generateModelFiles } from 'src/modelgen/generateModelFiles'

const schemaDir = __dirname + '/../../test/testSchema.json'

it('works', () => {
    generateModelFiles(schemaDir, './build')
})
