#!/usr/bin/env node
import { generateModelFiles } from 'src/model/generateModelFiles'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'
import { CustomTypeDef } from 'src/types'

const args = process.argv

const sourcePath = args[2]
const targetDir = args[3]

if (!sourcePath) throw new Error('Missing source path')

if (!targetDir) throw new Error('Missing target dir')

const calcCustomTypeDefs = (strPath): CustomTypeDef[] => {
    if (!strPath) return []

    const p = path.resolve(strPath)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const r = require(p.toString())

    console.log('Using custom type defs', r)
    return r
}

const customTypeDefs = calcCustomTypeDefs(args[4])

console.log('Clearing dir')
rimraf.sync(targetDir)
fs.mkdirSync(targetDir)

generateModelFiles(sourcePath, targetDir, {
    log: console.log,
    customTypeDefs
})

fs.copyFileSync(
    path.resolve(__dirname, '../../src', 'types.d.ts'),
    path.resolve(targetDir, 'types.d.ts')
)
fs.copyFileSync(
    path.resolve(__dirname, '../../src', 'values.ts'),
    path.resolve(targetDir, 'values.d.ts')
)
