import { ModelFile } from 'src/types'
import path from 'path'
import fs from 'fs'

export const definitionFiles = (): ModelFile[] => {
    // NOTE this file is in build in lib dir not in src !
    const srcDir = path.resolve(__dirname, '../../../src')

    const types = fs.readFileSync(path.resolve(srcDir, 'model.d.ts')).toString()
    const values = fs.readFileSync(path.resolve(srcDir, 'values.ts')).toString()

    return [
        {
            name: 'types.d.ts',
            content: types
        },
        {
            name: 'values.ts',
            content: values
        }
    ]
}
