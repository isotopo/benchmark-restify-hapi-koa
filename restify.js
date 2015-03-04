var config = require('./config');
var restify = require('restify');
var server = restify.createServer({
  name: config.name
});

server.use(restify.fullResponse());
server.use(restify.bodyParser());

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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

var methods = [createGetRoute, createPostRoute, createPutRoute, createDeleteRoute];

for (var i = 0; i < config.routes; i++) {

  var number = getRandomNumber(0, 10000000);
  var method = getRandomNumber(0, 3);

  methods[method]('/api/' + number);
}

server.listen(process.env.PORT || config.ports.restify, function () {
  console.log('%s listening at %s', server.name, server.url);
});

