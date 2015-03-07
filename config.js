'use strict';

var conf = require('rc')('benchmark', {
	ports: {
		restify: 3000,
		hapi: 4000
	},
	servers: {
		restify: 'http://localhost:3000/',
		hapi: 'http://localhost:4000/',
	},
	routes: 10
	
});

module.exports = conf;