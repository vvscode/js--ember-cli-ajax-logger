// todo import configs for tests and for dummy app from single place

const methods = ['get', 'post', 'del', 'put'];

export default function() {
  this.namespace = 'fake-api';    // make this `api`, for example, if your API is namespaced
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  // to track success
  methods.forEach((method) => {
    this[method]('/success', function(/* db, request */) {
      return { body: `${method} is ok `};
    });
  });

  // to track errors
  methods.forEach((method) => {
    this[method]('/fail', function(/* db, request */) {
      return { body: `${method} is failed `};
    });
  });
  // These comments are here to help you get started. Feel free to delete them.
  /*
   Shorthand cheatsheet:

   this.get('/posts');
   this.post('/posts');
   this.get('/posts/:id');
   this.put('/posts/:id'); // or this.patch
   this.del('/posts/:id');
   */
}
