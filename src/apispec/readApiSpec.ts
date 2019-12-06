import { SwaggerApiSpec } from 'src/swagger/types'
import fs from 'fs'

export const readApiSpec = (path: string): SwaggerApiSpec => {
    const apiSpec = JSON.parse(
        fs.readFileSync(path).toString()
    ) as SwaggerApiSpec

    return apiSpec
}
