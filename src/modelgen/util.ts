export const arrayToObject = (nameAttr, props) => {
    const res = {}

    props.forEach(p => {
        res[p[nameAttr]] = p
    })

    return res
}

export const objectToArray = (nameAttr, obj):any[] =>
    Object.entries(obj).map(([k, v]) => ({
        [nameAttr]: k,
        ...v
    }))
