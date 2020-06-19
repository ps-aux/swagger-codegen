import { ObjectType, PrimitiveType } from '../../attribute/types'

type ParamAttribute = {
    type: PrimitiveType
}

type PrimitiveParamDict = {
    [key: string]: PrimitiveType
}

export type OpParameterModel = {
    body?: ObjectType
    query?: PrimitiveParamDict
    path?: PrimitiveParamDict
}
