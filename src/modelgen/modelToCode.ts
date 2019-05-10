import prettier from 'prettier'
import {printObject} from 'src/modelgen/codePrint'

export const modelToCode = (model, { semicolons = false } = {}) => {
    const objStr = printObject(model)
    const code = `export const ${model.entityName} = ${objStr}`

    const prettified = prettier.format(code,
        { semi: semicolons, parser: 'babel', singleQuote: true })
    return prettified
}
