export const Bar = {
  entityName: 'Bar',
  path: '/api/bar-path',
  operations: ['detail', 'update'],
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
  filter: null,
  checksum: 'c80a84c9c6330f52e667dccaa00d32d2'
};
