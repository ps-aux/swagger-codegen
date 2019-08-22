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
    update: {
      type: 'update',
      path: '/api/bar-path/{id}'
    },
    detail: {
      type: 'detail',
      path: '/api/bar-path/{id}'
    },
    listAll: {
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
    }
  },
  checksum: '4489b211a356f78377f8e52e1cd51c40'
};
