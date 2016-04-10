'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

var server = new _koa2.default();
var api = new _koaRouter2.default();

server.use((0, _koaBodyparser2.default)());

var createGetRoute = function createGetRoute(route) {
  console.log('Route GET [' + route + ']');
  api.get(route, function (ctx) {
    ctx.status = 200;
    ctx.body = ctx.params || {};
  });
};

var createPutRoute = function createPutRoute(route) {
  console.log('Route PUT [' + route + ']');
  api.put(route, function (ctx) {
    ctx.status = 200;
    ctx.body = ctx.params || {};
  });
};

var createPostRoute = function createPostRoute(route) {
  console.log('Route POST [' + route + ']');
  api.post(route, function (ctx) {
    ctx.status = 201;
    ctx.body = ctx.params || {};
  });
};

var createDeleteRoute = function createDeleteRoute(route) {
  console.log('Route DELETE [' + route + ']');
  api.del(route, function (ctx) {
    ctx.status = 204;
  });
};

for (var i = 1; i <= _config2.default.routes; i++) {
  createGetRoute('/api/' + i);
  createPutRoute('/api/' + i);
  createPostRoute('/api/' + i);
  createDeleteRoute('/api/' + i);
}

server.use(api.routes()).use(api.allowedMethods());

server.listen(process.env.PORT || _config2.default.ports.koa, function () {
  console.log('Koa listening at port %s', process.env.PORT || _config2.default.ports.koa);
});

