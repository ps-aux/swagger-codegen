#!/usr/bin/env node
import { generateModelFiles } from 'src/_old/model/files/generateModelFiles'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'
import { createModels } from 'src/_old/model/createModel'
import { readApiSpec } from 'src/_old/apispec/readApiSpec'
import { CustomTypeDef } from 'src/_old/types'

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

const log = console.log

log('Generating model from ', sourcePath, 'to', targetDir)

const apiSpec = readApiSpec(sourcePath)
const models = createModels(apiSpec, customTypeDefs)

const files = generateModelFiles(
    models,
    { version: apiSpec.info.version },
    {
        log,
        codeFormat: {
            singleQuote: true,
            semicolons: true
        }
    }
)

files.forEach(f => {
    const p = path.join(targetDir, f.name)
    fs.writeFileSync(p, f.content)
})
