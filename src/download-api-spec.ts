#!/usr/bin/env node
import axios from 'axios'
import { purifySpec } from 'src/purifySpec'

export const downloadApiSpec = async url => {

    if (!url)
        throw new Error('url not provided')

    if (!url.startsWith('http'))
        throw new Error('url args it not an url')


    return axios.get(url)
        .then(r => {
            const spec = purifySpec(r.data)
            return JSON.stringify(spec, null, 4)
        })
}
