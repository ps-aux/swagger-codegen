import { CustomTypeDef } from 'src/types'

export const DateIntervalType: CustomTypeDef = {
    name: 'DateInterval',
    struct: {
        from: 'date',
        to: 'date'
    }
}
