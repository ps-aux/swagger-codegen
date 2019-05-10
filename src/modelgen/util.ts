export const arrayToObject = (nameAttr, props) => {
    const res = {}

    props.forEach(p => {
        res[p[nameAttr]] = p
    })

    return res
}
