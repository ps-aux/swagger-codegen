export type Attribute = {
    name: string
    id: string,
    type: string,
    required: boolean,
    values?: string[]
}

export type Model = {
    version: string,
    entityName: string,
    attr: {[key:string]: Attribute}
}

export type FilterParam = {
    name: string
    id: string,
    type: string,
    required: boolean,
    values?: string[]
}
