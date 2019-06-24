export const Foo = {
  entityName: 'Foo',
  path: '/api/foo-path',
  operations: ['create', 'list-by-page'],
  attr: {
    barId: {
      type: {
        name: 'ref',
        type: 'Bar'
      },
      name: 'barId',
      id: 'Foo.barId',
      refDataPath: 'bar'
    },
    barNonRef: {
      type: {
        name: 'object',
        type: 'Bar'
      },
      name: 'barNonRef',
      id: 'Foo.barNonRef'
    },
    baz: {
      type: {
        name: 'integer'
      },
      name: 'baz',
      id: 'Foo.baz',
      required: true
    },
    aDate: {
      type: {
        name: 'date'
      },
      name: 'aDate',
      id: 'Foo.aDate'
    },
    status: {
      type: {
        name: 'enum'
      },
      name: 'status',
      id: 'Foo.status',
      values: ['a', 'b', 'c']
    },
    withValidations: {
      type: {
        name: 'string'
      },
      name: 'withValidations',
      id: 'Foo.withValidations',
      validations: [
        {
          type: 'pattern',
          value: /^abc.*$/
        },
        {
          type: 'length',
          value: {
            min: 2,
            max: 5
          }
        },
        {
          type: 'minMax',
          value: {
            min: 123,
            max: 456
          }
        }
      ]
    },
    withExtra: {
      type: {
        name: 'string'
      },
      name: 'withExtra',
      id: 'Foo.withExtra'
    },
    withArray: {
      type: {
        name: 'array',
        type: 'Foo'
      },
      name: 'withArray',
      id: 'Foo.withArray'
    },
    arrayOfPrimitives: {
      type: {
        name: 'array',
        type: 'string'
      },
      name: 'arrayOfPrimitives',
      id: 'Foo.arrayOfPrimitives'
    }
  },
  filter: {
    bar: {
      id: 'Foo.filter.bar',
      name: 'bar',
      type: {
        name: 'string'
      }
    },
    status: {
      id: 'Foo.filter.status',
      name: 'status',
      type: {
        name: 'enum'
      },
      values: ['a', 'b', 'c']
    },
    arr: {
      id: 'Foo.filter.arr',
      name: 'arr',
      type: {
        name: 'array'
      }
    },
    anInterval: {
      id: 'Foo.filter.anInterval',
      name: 'anInterval',
      type: {
        name: 'interval',
        type: {
          name: 'date'
        }
      }
    }
  },
  checksum: 'b0862e30eb17c9b8f8bd7e75ea06c21a'
};
