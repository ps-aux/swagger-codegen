import { printObject } from 'src/code/codePrint'
import { removeDefaultsNoise } from 'src/files/removeDefaultsNoise'
import { Code } from 'src/code/types'
import { Entity } from '../../entity/types'

export const modelToTypescriptCode = (
    model: Entity,
    shouldRemoveDefaultsNoise: boolean
): Code => {
    let modelObj: any = model

    if (shouldRemoveDefaultsNoise) {
        modelObj = removeDefaultsNoise(modelObj)
    }

    const objStr = printObject(modelObj)
    const code = `export const ${model.name} = ${objStr}`

    return code
}
