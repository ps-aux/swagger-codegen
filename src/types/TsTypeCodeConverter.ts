import { Code } from '../code/types'
import {
    isNativeType,
    isReferenceType,
    isStructureType,
    TsType,
    StructureTsType,
    TsTypeReference
} from './TsType'
import { ImportRegistry } from './ImportRegistry'

const findRefTypes = (
    t: TsType,
    refs: TsTypeReference[],
    uniqCheck: { [key: string]: boolean }
) => {
    if (isReferenceType(t)) {
        const ref = t.value
        if (!uniqCheck[ref.id]) {
            refs.push(ref)
            uniqCheck[ref.id] = true
        }
    }

    if (isStructureType(t)) {
        Object.values(t.value).forEach(val =>
            findRefTypes(val, refs, uniqCheck)
        )
    }

    if (isNativeType(t) && t.value === 'array') {
        findRefTypes(t.__meta.genericFor!, refs, uniqCheck)
    }
}

export class TsTypeCodeConverter {
    constructor(private importRegistry: ImportRegistry) {}

    toCode = (name: string, def: StructureTsType): Code => {
        const refs: TsTypeReference[] = []
        findRefTypes(def, refs, {})
        console.log('refs', refs, def)
        const imports = this.importsCode(refs)
        return `
        ${imports}
        export type ${name} = ${typeToStr(def)}
        `
    }

    importsCode = (refs: TsTypeReference[]): string =>
        refs
            .map(r => {
                const imp = this.importRegistry.importFor(r)

                return `import {${r.name}} from '${imp}'`
            })
            .join('\n')
}

const structureTypeToStr = (t: StructureTsType): string => {
    return `{
        ${Object.entries(t.value)
            .map(([key, type]) => {
                const optionalSign = type.__meta.nullable ? '?' : ''
                return `${key}${optionalSign}: ${typeToStr(type)}`
            })
            .join('\n')}
     }`
}

const typeToStr = (t: TsType): string => {
    if (isNativeType(t)) {
        if (t.value === 'array') return typeToStr(t.__meta.genericFor!) + '[]'

        return t.value
    }
    if (isStructureType(t)) return structureTypeToStr(t)

    if (isReferenceType(t)) return t.value.name

    throw new Error('Unsupported ts type to print ' + JSON.stringify(t))
}
