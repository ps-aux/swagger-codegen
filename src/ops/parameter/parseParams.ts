import { OpParameterModel, PrimitiveParamDict } from './types'
import { SwaggerParameter } from '../../swagger/types'
import { AttrType, ObjectType } from '../../types'
import { defNameFromRef } from '../../model-parsing/attribute/type/defNameFromRef'
import { tryDetectPrimitiveType } from '../../model-parsing/attribute/type/TypeParser'
import set from 'lodash/set'

const toObjectType = (bodyParams: SwaggerParameter[]): ObjectType | null => {
    if (bodyParams.length > 1) throw new Error('Body can max  one param')

    if (bodyParams.length === 0) return null

    const param = bodyParams[0]

    // assertion
    if (param.in !== 'body') throw new Error('Illegal state. Bad param type')

    const schema = param.schema
    if (!schema) throw new Error('Body param must have schema')

    return {
        name: 'object',
        of: defNameFromRef(schema.$ref)
    }
}

const pathParams = (params: SwaggerParameter[]): PrimitiveParamDict | null => {
    if (params.length === 0) return null

    const res: PrimitiveParamDict = {}

    params.forEach(p => {
        if (p.in !== 'path') throw new Error('Illegal state. Bad param type')

        if (!p.type) throw new Error('Path param must have specified type')

        const type = tryDetectPrimitiveType({
            type: p.type,
            format: p.format
        })

        if (!type)
            throw new Error(
                `Failed to detect type from path param ${JSON.stringify(p)}`
            )
        res[p.name] = type
    })

    return res
}

const queryParams = (params: SwaggerParameter[]): PrimitiveParamDict | null => {
    if (params.length === 0) return null

    const res: PrimitiveParamDict = {}

    params.forEach(p => {
        // if (p.name.includes('.'))
        //     throw new Error('Only root params (no paths) are supported for now')
        if (p.in !== 'query')
            throw new Error(
                `Illegal state. Bad param type. ${JSON.stringify(p)}`
            )

        if (!p.type) throw new Error('Query param must have specified type')

        let type: AttrType | null = tryDetectPrimitiveType({
            type: p.type,
            format: p.format
        })

        if (!type) {
            if (p.type === 'array') {
                const itemType = tryDetectPrimitiveType({
                    type: p.items!.type,
                    format: p.format
                })

                if (!itemType)
                    throw new Error(
                        `Could not detect item type for ${JSON.stringify(p)}`
                    )

                type = {
                    name: 'list',
                    of: itemType
                }
            }
        }

        if (!type)
            throw new Error(
                `Failed to detect type from query param ${JSON.stringify(p)}`
            )
        // res[p.name] = type

        set(res, p.name, type)
    })

    return res
}

export const parseParams = (params: SwaggerParameter[]): OpParameterModel => {
    const names = new Set<string>()

    const query: SwaggerParameter[] = []
    const path: SwaggerParameter[] = []
    const body: SwaggerParameter[] = []
    const header: SwaggerParameter[] = []

    const ensureUnique = (n: string) => {
        if (names.has(n))
            throw new Error(
                `Params must be unique accross all transport methods. Violator:${n}, Params: ${JSON.stringify(
                    params
                )}`
            )

        names.add(n)
    }

    params.forEach(p => {
        const name = p.name
        ensureUnique(name)
        const inType = p.in

        if (inType === 'query') {
            query.push(p)
        } else if (inType === 'path') {
            path.push(p)
        } else if (inType === 'body') {
            body.push(p)
        } else if (inType === 'header') {
            header.push(p)
        } else {
            throw new Error(`Unsupported 'in' type of ${JSON.stringify(p)}`)
        }
    })

    const res: OpParameterModel = {}

    const bodyParam = toObjectType(body)
    const pathParam = pathParams(path)
    const queryParam = queryParams(query)

    if (bodyParam) res.body = bodyParam
    if (pathParam) res.path = pathParam
    if (queryParam) res.query = queryParam

    return res
}
