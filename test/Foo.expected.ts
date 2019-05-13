export const Foo = {
  version: '1.2.3',
  entityName: 'Foo',
  attr: {
    id: {
      type: 'integer',
      name: 'id',
      id: 'Foo.id',
      required: false
    },
    bar: {
      type: 'string',
      name: 'bar',
      id: 'Foo.bar',
      required: true
    },
    baz: {
      type: 'integer',
      name: 'baz',
      id: 'Foo.baz',
      required: true
    },
    aDate: {
      type: 'date',
      name: 'aDate',
      id: 'Foo.aDate',
      required: false
    },
    status: {
      type: 'enum',
      name: 'status',
      id: 'Foo.status',
      required: false,
      values: ['a', 'b', 'c']
    }
  },
  filter: {
    bar: {
      id: 'Foo.filter.bar',
      name: 'bar',
      type: 'string',
      required: false
    },
    status: {
      id: 'Foo.filter.status',
      name: 'status',
      type: 'enum',
      required: false,
      values: ['a', 'b', 'c']
    },
    arr: {
      id: 'Foo.filter.arr',
      name: 'arr',
      type: 'array',
      required: false
    }
  }
};