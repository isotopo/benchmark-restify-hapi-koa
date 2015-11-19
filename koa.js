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
  api.get(route, regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.status = 200;
            this.body = this.params || {};

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};

var createPutRoute = function createPutRoute(route) {
  console.log('Route PUT [' + route + ']');
  api.put(route, regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            this.status = 200;
            this.body = this.params || {};

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
};

var createPostRoute = function createPostRoute(route) {
  console.log('Route POST [' + route + ']');
  api.post(route, regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            this.status = 201;
            this.body = this.params || {};

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
};

var createDeleteRoute = function createDeleteRoute(route) {
  console.log('Route DELETE [' + route + ']');
  api.del(route, regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            this.status = 204;

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
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
