export type SwaggerParameterType = 'header' | 'body' | 'query' | 'path'

export type SwaggerParameter = {
    name: string
    in: SwaggerParameterType
    required: boolean
    description: string
    type?: string
    enum?: any
    schema?: {
        $ref: string
    }
    format?: string
}

export type SwaggerOperation = {
    tags: string[]
    summary: string
    parameters: SwaggerParameter[]
}

export type SwaggerHttpMethod = 'get' | 'post' | 'delete' | 'put'

// TODO why is the val possible undefined according to TS ?
export type SwaggerPath = { [key in SwaggerHttpMethod]?: SwaggerOperation }
export type SwaggerPaths = {
    [key: string]: SwaggerPath
}

// Swagger spec types
export type SwaggerApiSpec = {
    info: {
        version: string
        title: string
    }
    basePath: string
    tags: []
    paths: SwaggerPaths
    definitions: { [key: string]: SwaggerDefinition }
}

export type SwaggerTypeInfoBearer = {
    type: string
    enum?: string[]
    $ref?: string
    format?: string
    items?: SwaggerTypeInfoBearer
}

export type SwaggerDefinitionProperty = {
    type: string
    pattern?: string
    $ref?: string
    enum?: string[]
    format?: string
    items?: SwaggerTypeInfoBearer
    minimum?: number
    maximum?: number
    minLength?: number
    maxLength?: number
}

export type SwaggerDefinition = {
    type: string
    title: string
    required?: string[]
    properties?: { [key: string]: SwaggerDefinitionProperty }
}
