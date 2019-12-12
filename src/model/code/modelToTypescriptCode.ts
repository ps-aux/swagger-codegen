import { printObject } from 'src/code/codePrint'
import { Model } from 'src/types'

export const modelToTypescriptCode = (model: Model) => {
    const objStr = printObject(model)
    const code = `export const ${model.entityName} = ${objStr}`

    return code
}
