import { Attribute } from '../attribute/types'

export type Entity = {
    name: string
    attrs: { [key: string]: Attribute }
}
