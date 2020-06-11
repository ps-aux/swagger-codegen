import { printObject } from 'src/code/codePrint'
import { OpsTree } from 'src/model'

export const opsTreeToTypescriptCode = (ops: OpsTree) => {
    const objStr = printObject(ops)
    const code = `export const apiOps = ${objStr}`

    return code
}
