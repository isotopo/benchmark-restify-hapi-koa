var config = require('./config');
var restify = require('restify');
var server = restify.createServer({
  name: config.name
});

server.use(restify.fullResponse());
server.use(restify.bodyParser());

var createGetRoute = function (route) {
  console.log('Route GET [' + route + ']');
  server.get(route, function (req, res) {
    res.send(200, req.params || {});
  });
};

var createPutRoute = function (route) {
  console.log('Route PUT [' + route + ']');
  server.post(route, function (req, res) {
    res.send(200, req.params || {});
  });
};

var createPostRoute = function (route) {
  console.log('Route POST [' + route + ']');
  server.post(route, function (req, res) {
    res.send(201, req.params || {});
  });
};

var createDeleteRoute = function (route) {
  console.log('Route DELETE [' + route + ']');
  server.del(route, function (req, res) {
    res.send(204);
  });
};

for (var i = 1; i <= config.routes; i++) {
  createGetRoute('/api/' + i);
  createPutRoute('/api/' + i);
  createPostRoute('/api/' + i);
  createDeleteRoute('/api/' + i);
}

server.listen(process.env.PORT || config.ports.restify, function () {
  console.log('%s listening at %s', server.name, server.url);
});

