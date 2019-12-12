import { printObject } from 'src/code/codePrint'
import { Model } from 'src/neu/model'
import { removeDefaultsNoise } from '../files/removeDefaultsNoise'

export const modelToTypescriptCode = (
    model: Model,
    shouldRemoveDefaultsNoise?: boolean
) => {
    let modelObj: any = model

    if (shouldRemoveDefaultsNoise) {
        modelObj = removeDefaultsNoise(modelObj)
    }

    const objStr = printObject(modelObj)
    const code = `export const ${model.name} = ${objStr}`

    return code
}
