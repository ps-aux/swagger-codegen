import { Code } from '../../types'
import {
    isNativeType,
    isReferenceType,
    isStructureType,
    MyTsType,
    TsStructureType
} from './MyTsType'

export const structureTypeToStr = (t: TsStructureType): string => {
    return `{
        ${Object.entries(t.value)
            .map(([key, type]) => {
                const optionalSign = type.__meta.nullable ? '?' : ''
                return `${key}${optionalSign}: ${typeToStr(type)}`
            })
            .join('\n')}
     }`
}

export const typeToStr = (t: MyTsType): string => {
    if (isNativeType(t)) {
        if (t.value === 'array') return typeToStr(t.__meta.genericFor!) + '[]'

        return t.value
    }
    if (isStructureType(t)) return structureTypeToStr(t)

    if (isReferenceType(t)) return t.value.name

    throw new Error('Unsupported ts type to print ' + JSON.stringify(t))
}

export const exportTypeCode = (name: string, def: TsStructureType): Code => {
    return ` export type ${name} = ${typeToStr(def)} `
}
