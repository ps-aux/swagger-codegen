#!/usr/bin/env node
import { generateModelFiles } from 'src/model/generateModelFiles'
import path from 'path'
import fs from 'fs'

const args = process.argv

const sourcePath = args[2]
const targetDir = args[3]

if (!sourcePath)
    throw new Error('Missing source path')

if (!targetDir)
    throw new Error('Missing target dir')


if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
}
generateModelFiles(sourcePath, targetDir, {
    log: console.log
})

fs.copyFileSync(path.resolve(__dirname, '../..', 'types.d.ts'), path.resolve(targetDir, 'types.d.ts'))
fs.copyFileSync(path.resolve(__dirname, '../..', 'values.ts'), path.resolve(targetDir, 'values.d.ts'))
