'use strict';

var conf = require('rc')('benchmark', {
	ports: {
		restify: 3000,
		hapi: 4000,
		koa: 5000
	},
	servers: {
		restify: 'http://localhost:3000/',
		hapi: 'http://localhost:4000/',
		koa: 'http://localhost:5000/'
	},
	network: 'local',
	routes: 10
});

module.exports = conf;
