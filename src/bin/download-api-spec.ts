#!/usr/bin/env node
import { downloadApiSpec } from 'src/download-api-spec'

const url = process.argv[2]

downloadApiSpec(url)
    .then(console.log)

