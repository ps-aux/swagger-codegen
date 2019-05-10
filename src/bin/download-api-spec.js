#!/usr/bin/env node
const axios = require('axios/index')
const purifySpec = require('../purifySpec')

const url = process.argv[2]

if (!url)
    throw new Error('url not provided')

if (!url.startsWith('http'))
    throw new Error('url args it not an url')


axios.get(url)
    .then(r => {
        const spec = purifySpec(r.data)
        console.log(JSON.stringify(spec, null, 4))

    })
