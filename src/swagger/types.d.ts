export type SwaggerParameterType = 'header' | 'body' | 'query'


export type SwaggerParameter = {
    name: string,
    in: SwaggerParameterType ,
    required: boolean
    type: string,
    enum: any
}


export type SwaggerOperation = {
    tags: string[],
    summary: string
    parameters: SwaggerParameter[]
}


// Swagger spec types
export type SwaggerApiSpec = {
    info: {
        version: string
        title: string
    }
    basePath: string
    tags: []
    paths: {
        [key: string]: {
            [key: string]: SwaggerOperation
        }
    }
    definitions: { [key: string]: SwaggerDefinition }
}

export type SwaggerDefinitionProperty = {
    type: string,
    pattern: string,
    required: string
    $ref: string,
    enum: string[],
    items: {
        $ref?: string,
        type?: string
    }
    minimum: number,
    maximum: number,
    minLength: number,
    maxLength: number
}

export type SwaggerDefinition = {
    type: string
    title: string
    required?: string[]
    properties?: { [key: string]: SwaggerDefinitionProperty }
}
