var config = require('./config');
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: process.env.PORT || config.ports.hapi });

var createRoute = function (method, route) {
  var statusCode = 200;

  if (method === 'POST') {
    statusCode = 201;
  }

  if (method === 'DELETE') {
    statusCode = 204;
  }

  console.log('Route ' + method + ' [' + route + ']');
  server.route({
    method: method,
    path: route,
    handler: function (request, reply) {
      var response = reply(request.payload || {});
      response.statusCode = statusCode;
    },
  });
};

var createGetRoute = function (route) {
  createRoute('GET', route);
};

var createPostRoute = function (route) {
  createRoute('POST', route);
};

var createPutRoute = function (route) {
  createRoute('PUT', route);
};

var createDeleteRoute = function (route) {
  createRoute('DELETE', route);
};

for (var i = 1; i <= config.routes; i++) {
  createGetRoute('/api/' + i);
  createPutRoute('/api/' + i);
  createPostRoute('/api/' + i);
  createDeleteRoute('/api/' + i);
}

server.start(function () {
  console.log('%s listening at %s', config.name, server.info.uri);
});
