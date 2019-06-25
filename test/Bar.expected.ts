export const Bar = {
  entityName: 'Bar',
  path: '/api/bar-path',
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
      type: 'update'
    },
    detail: {
      type: 'detail'
    },
    listAll: {
      type: 'listAll',
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
  checksum: '474a79e5d9795ba4fe985afcea4a94a5'
};
