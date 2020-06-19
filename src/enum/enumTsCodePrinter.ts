import { arrayToObject } from 'src/util'
import { printObject } from 'src/code/codePrint'
import { EnumType } from './types'

export const enumsToModelTsCode = (enums: EnumType<any>[]): string => {
    const obj = arrayToObject('id', enums)
    return `export const apiEnums = ${printObject(obj)}`
}

const enumToTsEnumCode = (enm: EnumType<any>): string => {
    const name = enm.id!
    return `enum ${name} {
        ${enm.of.map(val => `${val} = '${val}'`)}
     }
    `
}

export const enumsToTsTypesCode = (enums: EnumType<any>[]): string => {
    return enums.map(e => 'export ' + enumToTsEnumCode(e)).join('\n')
}
