import { Attribute, AttrType, Model } from 'src/neu/model'
import {
    isEnumType,
    isListType,
    isObjectType,
    isPrimitiveType,
    PrimitiveTypes
} from 'src/neu/model.consts'
import { Code } from 'src/neu/code/types'

const TsBuildInTypes = {
    string: 'string',
    boolean: 'boolean',
    number: 'number',
    date: 'Date',
    any: 'any',
    object: 'object'
}

class ImportedType {
    constructor(public name: string) {}
}

export type NamedType = string | ImportedType

export type StructureType = { [key: string]: TsType }

export type TsType = NamedType | StructureType

export type TypeDefRes = {
    name: string
    attrs: { [key: string]: TsType }
    imports: string[]
}

const arrayOf = (name: string) => `${name}[]`

const attrTypeToTsType = (attrType: AttrType): TsType => {
    if (isPrimitiveType(attrType))
        switch (attrType.name) {
            case PrimitiveTypes.string:
                return TsBuildInTypes.string
            case PrimitiveTypes.boolean:
                return TsBuildInTypes.boolean
            case PrimitiveTypes.integer:
            case PrimitiveTypes.double:
                return TsBuildInTypes.number
            case PrimitiveTypes.date:
                return TsBuildInTypes.date
        }

    if (isObjectType(attrType)) {
        return new ImportedType(attrType.of)
    }

    if (isEnumType(attrType)) return TsBuildInTypes.string

    if (isListType(attrType)) return arrayOf(TsBuildInTypes.any)

    return TsBuildInTypes.any
    // throw new Error(`Could not map ${attrType} to TS type`)
}

const mapObject = <A, B, Obj1 = any>(
    obj: Obj1,
    map: (a: A) => B
): { [key in keyof Obj1]: B } => {
    const r = {}

    Object.entries(obj).forEach(([key, val]) => {
        r[key] = map(val)
    })

    // @ts-ignore
    return r
}

export const modelToTypescriptTypeCode = (model: Model): Code =>
    typescriptTypeDefToCode(modelToTypescriptTypeDef(model))

export const modelToTypescriptTypeDef = (model: Model): TypeDefRes => {
    const imports = new Set<string>()
    const attrs = mapObject<Attribute, TsType>(model.attrs, attr => {
        const res = attrTypeToTsType(attr.type)

        // TODO hackity hack
        let str: string = res.toString()
        // TODO why idea highlights this ?
        if (res instanceof ImportedType) {
            str = res.name
            imports.add(res.name)
        }

        return str
    })
    return {
        name: model.name,
        attrs,
        imports: Array.from(imports)
    }
}

export const typescriptTypeDefToCode = (def: TypeDefRes): Code => {
    const imports = def.imports
        .map(name => `import {${name}} from './${name}.type'`)
        .join('\n')

    return `
    ${imports}
    export type ${def.name} = {
        ${Object.entries(def.attrs)
            .map(([key, type]) => `${key}: ${type}`)
            .join('\n')}
    }`
}
