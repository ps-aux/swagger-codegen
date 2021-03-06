import crypto from 'crypto'

export const calcChecksum = (str: string) =>
    crypto
        .createHash('md5')
        .update(str)
        .digest('hex')

export const calcChecksumFromObj = (obj: Record<string, unknown>) =>
    crypto
        .createHash('md5')
        .update(JSON.stringify(obj))
        .digest('hex')
