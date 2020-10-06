import { createModels } from 'src/model-parsing/createModels'
import Path from 'path'
import fs from 'fs'
import { createModelFiles } from 'src/files/createModelFiles'
import { SwaggerApiSpec } from 'src/swagger/types'

const readApiSpec = (path: string): SwaggerApiSpec => {
    const apiSpec = JSON.parse(
        fs.readFileSync(path).toString()
    ) as SwaggerApiSpec

    return apiSpec
}

const expectedDir = Path.resolve(__dirname, '../../test/expected')
const outputDir = Path.resolve(__dirname, '../../tst')

const expectSameContent = fileName => {
    const content = fs
        .readFileSync(Path.resolve(outputDir, fileName))
        .toString()
    const expectedContent = fs
        .readFileSync(Path.resolve(expectedDir, fileName))
        .toString()
    expect(content).toEqual(expectedContent)
}

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
        const p = Path.join(targetDir, f.name)
        fs.writeFileSync(p, f.content)
    })

    // TODO Typecheck files !!
    expectSameContent('apiOps.ts')
    expectSameContent('Bar.model.ts')
    expectSameContent('Bar.type.ts')
    expectSameContent('enums.model.ts')
    expectSameContent('enums.type.ts')
    expectSameContent('Foo.model.ts')
    expectSameContent('Foo.type.ts')
    expectSameContent('index.ts')
    expectSameContent('WithNoProperties.model.ts')
    expectSameContent('WithNoProperties.type.ts')
})
