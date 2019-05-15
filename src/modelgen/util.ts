export const arrayToObject = (nameAttr, props) => {
    const res = {}

    props.forEach(p => {
        res[p[nameAttr]] = p
    })

    return res
}

export const objectToArray = (nameAttr, obj): any[] =>
    Object.entries(obj).map(([k, v]) => ({
        [nameAttr]: k,
        ...v
    }))

export const groupBy = (getKey, items) => {
    const groups = {}

    const addToBucket = (key, val) => {
        const bucket = groups[key]
        if (bucket) bucket.push(val)
        else {
            groups[key] = [val]
        }
    }

    items.forEach(i => {
        addToBucket(getKey(i), i)
    })

    return groups
}
