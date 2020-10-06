export const apiOps = {
  Bar: {
    detail: {
      path: '/api/bar-path/{id}',
      method: 'get'
    },
    update: {
      path: '/api/bar-path/{id}',
      method: 'put'
    },
    listAll: {
      path: '/api/bar-path',
      method: 'get'
    }
  },
  Foo: {
    create: {
      path: '/api/foo-path',
      method: 'post'
    }
  },
  foo: {
    path: '/api/foo-path',
    method: 'put'
  },
  listByPage: {
    listByPage: {
      path: '/api/foo-path',
      method: 'get'
    }
  }
};
