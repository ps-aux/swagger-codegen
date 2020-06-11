import { ModelFile } from 'src/types'
import path from 'path'
import fs from 'fs'

export const definitionFiles = (): ModelFile[] => {
    // NOTE this file is in build in lib dir not in src !
    const srcDir = path.resolve(__dirname, '..')

    const types = fs.readFileSync(path.resolve(srcDir, 'model.d.ts')).toString()

    const constants = fs
        .readFileSync(path.resolve(srcDir, 'model.consts.ts'))
        .toString()

    return [
        {
            name: 'model.d.ts',
            content: types
        },
        {
            name: 'model.consts.ts',
            content: constants
        }
    ]
}
