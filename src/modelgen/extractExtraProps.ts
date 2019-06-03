const regex = /(x-)(.*)/


export type ExtraProp = 'readOnly' | 'detailOnly' | 'ref' | 'refDataFor'

// TODO add ExtraProp to type system
export const extractExtraProps = (p: any): { [key: string]: any } => {
    const res = {}
    Object.keys(p)
        .map(k => k.match(regex))
        .filter(m => !!m)
        .forEach((m: any) => {
            const origProp = m[0]
            const newName = m[2]
            res[newName] = p[origProp]
        })


    return res
}


