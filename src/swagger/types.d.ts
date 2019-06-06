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

export type SwaggerDefinitionProperty = {
    type: string,
    pattern: string,
    required: string
    $ref: string,
    enum: string[],
    items: {
        $ref: string
    }
    minimum: number,
    maximum: number,
    minLength: number,
    maxLength: number
}

export type SwaggerDefinition = {
    type: string
    title: string
    required: string[]
    properties: { [key: string]: SwaggerDefinitionProperty }
}
