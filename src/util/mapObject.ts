export const mapObject = <A, B, Obj1 = any>(
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
