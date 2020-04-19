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

type TsTypeName = {
    name: string
    imports?: string[]
}

export type TsType = {
    name: string
    optional: boolean
}

export type TypeDefRes = {
    name: string
    attrs: { [key: string]: TsType }
    imports: string[]
}

const arrayOf = (name: string) => `${name}[]`

const primitiveTsTypeName = (name: string): string => {
    switch (name) {
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

    throw new Error(`Could not map primitive type ${name} to TS type`)
}

const attrTypeToTsType = (attrType: AttrType): TsTypeName => {
    const name = attrType.name

    // Cannot use returns for some reasons bcs TS guard marks attrType as never after 1st typeguard
    let r: TsTypeName | null = null
    if (isPrimitiveType(attrType)) {
        r = {
            name: primitiveTsTypeName(name)
        }
    }

    if (isObjectType(attrType)) {
        r = {
            name: attrType.of,
            imports: [attrType.of]
        }
    }

    // TODO invoke primitive types contructor here, duplicate logic
    if (isEnumType(attrType))
        r = {
            name: TsBuildInTypes.string
        }

    if (isListType(attrType)) {
        const itemType = attrTypeToTsType(attrType.of)
        r = {
            // TODO this support only one level
            name: arrayOf(itemType.name),
            imports: itemType.imports
        }
    }

    if (!r) r = { name: TsBuildInTypes.any }
    return r
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

        if (res.imports) res.imports.forEach(i => imports.add(i))

        return {
            name: res.name,
            optional: !attr.required
        }
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
            .map(([key, type]) => {
                const optionalSign = type.optional ? '?' : ''
                return `${key}${optionalSign}: ${type.name}`
            })
            .join('\n')}
    }`
}
