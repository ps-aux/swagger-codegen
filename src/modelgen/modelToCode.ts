import { printObject } from 'src/modelgen/codePrint'
import { FormatCode } from 'src/modelgen/FormatCode'

export const modelToCode = (model, { formatCode }:{formatCode:FormatCode}) => {
    const objStr = printObject(model)
    const code = `export const ${model.entityName} = ${objStr}`

    return formatCode(code)
}
