export const Bar = {
    entityName: 'Bar',
    attr: {
        number: {
            type: {
                name: 'integer'
            },
            name: 'number',
            id: 'Bar.number',
            required: true
        },
        name: {
            type: {
                name: 'string'
            },
            name: 'name',
            id: 'Bar.name',
            required: true
        }
    },
    operations: {
        detail: {
            method: 'get',
            type: 'detail',
            path: '/api/bar-path/{id}'
        },
        listAll: {
            method: 'get',
            type: 'listAll',
            path: '/api/bar-path',
            params: {
                bar: {
                    id: 'Bar.filter.bar',
                    name: 'bar',
                    type: {
                        name: 'string'
                    }
                }
            }
        },
        update: {
            method: 'put',
            type: 'update',
            path: '/api/bar-path/{id}'
        }
    },
    checksum: '5ebf14dcbfd26f0368145f0326401ab9'
}
