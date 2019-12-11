import { printObject } from 'src/code/codePrint'

export const modelToTypescriptCode = model => {
    const objStr = printObject(model)
    const code = `export const ${model.entityName} = ${objStr}`

    return code
}
