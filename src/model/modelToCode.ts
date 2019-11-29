import { printObject } from 'src/code/codePrint'
import { FormatCode } from 'src/code/FormatCode'

export const modelToCode = (
    model,
    { formatCode }: { formatCode: FormatCode }
) => {
    const objStr = printObject(model)
    const code = `export const ${model.entityName} = ${objStr}`

    return formatCode(code)
}
