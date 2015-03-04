var config = require('./config');
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: process.env.PORT || config.ports.hapi });

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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

var methods = [createGetRoute, createPostRoute, createPutRoute, createDeleteRoute];

for (var i = 0; i < config.routes; i++) {

  var number = getRandomNumber(0, 10000000);
  var method = getRandomNumber(0, 3);

  methods[method]('/api/' + number);
}

server.start(function () {
  console.log('%s listening at %s', config.name, server.info.uri);
});
