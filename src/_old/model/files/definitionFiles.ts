import path from 'path'
import fs from 'fs'
import { CodeFile } from '../../../files/types'

export const definitionFiles = (): CodeFile[] => {
    // NOTE this file is in build in lib dir not in src !
    const srcDir = path.resolve(__dirname, '../../')

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
