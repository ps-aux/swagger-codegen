#!/usr/bin/env node
import { generateModelFiles } from 'src/modelgen/generateModelFiles'

const args = process.argv

const sourcePath = args[2]
const targetDir = args[3]

if (!sourcePath)
    throw new Error('Missing source path')

if (!targetDir)
    throw new Error('Missing target dir')


generateModelFiles(sourcePath, targetDir)
