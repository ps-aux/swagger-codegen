export type BasicType =
    | 'integer'
    | 'double'
    | 'string'
    | 'boolean'
    | 'date'
    | 'enum'
    | 'object'
    | 'ref'
    | 'interval'
    | 'array'

export type Type = {
    name: BasicType | string
    type?: Type | string
}

export type Attribute = {
    name: string
    id: string
    type: Type
    required?: boolean
    values?: string[]
    readOnly?: boolean
    detailOnly?: boolean
    pattern?: RegExp
    refDataPath?: string
}

export interface Model {
    entityName: string
    path: string | null
    attr: { [key: string]: Attribute }
    filter: any // TODO
    checksum: string
}

export type FilterParam = {
    name: string
    id: string
    type: Type
    required?: boolean
    values?: string[]
}

export type Api = {
    version: string
}


// Swagger spec types
export type SwaggerApiSpec = {
    info: {
        version: string
        title: string
    }
    basePath: string
    tags: []
    paths: { [key: string]: any }
    definitions: { [key: string]: SwaggerDefinition }
}

export type SwaggerProperty = {
    type: string
}

export type SwaggerDefinition = {
    type: string,
    title: string,
    required: string[],
    properties: { [key: string]: SwaggerProperty }

}



