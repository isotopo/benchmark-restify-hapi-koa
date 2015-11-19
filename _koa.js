require('babel-polyfill')

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import config from './config'

let server = new Koa()
let api = new Router()

server.use(bodyParser())

let createGetRoute = function (route) {
  console.log('Route GET [' + route + ']')
  api.get(route, function *() {
    this.status = 200
    this.body = this.params || {}
  })
}

let createPutRoute = function (route) {
  console.log('Route PUT [' + route + ']')
  api.put(route, function *() {
    this.status = 200
    this.body = this.params || {}
  })
}

let createPostRoute = function (route) {
  console.log('Route POST [' + route + ']')
  api.post(route, function *() {
    this.status = 201
    this.body = this.params || {}
  })
}

let createDeleteRoute = function (route) {
  console.log('Route DELETE [' + route + ']')
  api.del(route, function *() {
    this.status = 204
  })
}

for (let i = 1; i <= config.routes; i++) {
  createGetRoute('/api/' + i)
  createPutRoute('/api/' + i)
  createPostRoute('/api/' + i)
  createDeleteRoute('/api/' + i)
}

server
  .use(api.routes())
  .use(api.allowedMethods())

server.listen(process.env.PORT || config.ports.koa, function () {
  console.log('Koa listening at port %s', process.env.PORT || config.ports.koa)
})
