export const Foo = {
  name: 'Foo',
  attrs: {
    barId: {
      name: 'barId',
      id: 'Foo.barId',
      type: {
        name: 'integer'
      },
      extra: {
        ref: 'Bar',
        refDataPath: 'bar'
      }
    },
    nonRefDataId: {
      name: 'nonRefDataId',
      id: 'Foo.nonRefDataId',
      type: {
        name: 'integer'
      },
      extra: {
        ref: 'Bar'
      }
    },
    bar: {
      name: 'bar',
      id: 'Foo.bar',
      type: {
        name: 'object',
        of: 'Bar'
      },
      required: true,
      extra: {
        refDataFor: 'barId'
      }
    },
    barNonRef: {
      name: 'barNonRef',
      id: 'Foo.barNonRef',
      type: {
        name: 'object',
        of: 'Bar'
      }
    },
    baz: {
      name: 'baz',
      id: 'Foo.baz',
      type: {
        name: 'integer'
      },
      required: true
    },
    aDate: {
      name: 'aDate',
      id: 'Foo.aDate',
      type: {
        name: 'date'
      }
    },
    detailOnly: {
      name: 'detailOnly',
      id: 'Foo.detailOnly',
      type: {
        name: 'string'
      },
      extra: {
        detailOnly: 'true'
      }
    },
    readOnly: {
      name: 'readOnly',
      id: 'Foo.readOnly',
      type: {
        name: 'string'
      },
      extra: {
        readOnly: 'true'
      }
    },
    status: {
      name: 'status',
      id: 'Foo.status',
      type: {
        name: 'enum',
        id: 'Foo$Status',
        of: ['a', 'b', 'c']
      },
      extra: {
        enumId: 'Foo$Status'
      }
    },
    withValidations: {
      name: 'withValidations',
      id: 'Foo.withValidations',
      type: {
        name: 'string'
      },
      validationRules: [
        {
          name: 'pattern',
          value: /^abc.*$/
        },
        {
          name: 'length',
          value: {
            min: 2,
            max: 5
          }
        },
        {
          name: 'minMax',
          value: {
            min: 123,
            max: 456
          }
        }
      ]
    },
    withExtra: {
      name: 'withExtra',
      id: 'Foo.withExtra',
      type: {
        name: 'string'
      },
      extra: {
        foo: 'extra',
        bar: true,
        baz: 123
      }
    },
    withArray: {
      name: 'withArray',
      id: 'Foo.withArray',
      type: {
        name: 'list',
        of: {
          name: 'object',
          of: 'Bar'
        }
      }
    },
    arrayOfPrimitives: {
      name: 'arrayOfPrimitives',
      id: 'Foo.arrayOfPrimitives',
      type: {
        name: 'list',
        of: {
          name: 'string'
        }
      }
    },
    arrayOfDates: {
      name: 'arrayOfDates',
      id: 'Foo.arrayOfDates',
      type: {
        name: 'list',
        of: {
          name: 'date'
        }
      }
    }
  }
};
