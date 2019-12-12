import { ModelFile } from 'src/types'
import path from 'path'
import fs from 'fs'

export const definitionFiles = (): ModelFile[] => {
    // NOTE this file is in build in lib dir not in src !
    const srcDir = path.resolve(__dirname, '../../../src')

    const types = fs
        .readFileSync(path.resolve(srcDir, 'neu', 'model.d.ts'))
        .toString()

    return [
        {
            name: 'model.d.ts',
            content: types
        }
    ]
}
