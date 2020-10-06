import flat from 'flat'
import { equals } from 'ramda'

const doUnflatten = flat.unflatten

export type Path = string[]
export type Entry = [Path, any]

const isSubPath = (child: Path, parent: Path) => {
    if (child.length >= parent.length) return false

    for (let i = 0; i < child.length; i++) {
        if (child[i] !== parent[i]) return false
    }
    return true
}

const allPairs = <T>(arr1: T[], arr2: T[]): [T, T][] => {
    const res: [T, T][] = []

    for (let i = 0; i < arr1.length; i++) {
        for (let j = i + 1; j < arr2.length; j++) {
            res.push([arr1[i], arr2[j]])
        }
    }

    return res
}

const hasConlict = (p1: Path, p2: Path) => {
    if (equals(p1, p2)) return true

    if (isSubPath(p1, p2) || isSubPath(p2, p1)) return true
    return false
}

const ensureNoConflits = (paths: Path[]) => {
    const pairs = allPairs(paths, paths)

    pairs.forEach(([p1, p2]) => {
        if (hasConlict(p1, p2))
            throw new Error(
                `Paths ${JSON.stringify(p1)} and ${JSON.stringify(
                    p2
                )} are in conflict`
            )
    })
}

export const unflatten = (entries: Entry[]): Record<string, unknown> => {
    const input = {}

    ensureNoConflits(entries.map(e => e[0]))

    entries.forEach(([path, val]) => {
        const key = path.join('.')
        input[key] = val
    })

    return doUnflatten(input)
}
