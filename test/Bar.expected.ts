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
    },
    update: {
      type: 'update',
      path: '/api/bar-path/{id}'
    }
  },
  checksum: '9676cba9f84436fee71f46e6b9bd7050'
};
