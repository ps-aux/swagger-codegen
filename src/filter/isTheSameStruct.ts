const isSameVal = (defVal, structVal) => {
    if (typeof defVal === 'string')
        return defVal == structVal.type.name

    return isTheSameStruct(defVal, structVal)
}

export const isTheSameStruct = (def: {}, struct: {}): boolean => {

    const defEntries = Object.entries(def)
    const structEntries = Object.entries(struct)


    if (defEntries.length !== structEntries.length)
        return false

    for (let e of defEntries) {
        const [name, val] = e
        const sVal = struct[name]
        if (sVal == undefined)
            return false

        if (!isSameVal(val, sVal))
            return false

    }


    return true
}
