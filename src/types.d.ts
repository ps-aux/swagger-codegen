export type Attribute = {
    name: string
    id: string,
    type: string,
    required: boolean
};

export type Model = {
    version: string,
    entityName: string,
    attr: {[key:string]: Attribute}
};
