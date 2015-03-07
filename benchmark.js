'use strict';


var fs = require('fs'),
	apiBenchmark = require('api-benchmark'),
	config = require('./config');



var services = config.servers;



var routes = {};


for (var i = 1; i <= config.routes; i++) {
	routes['GET/api/' + i] = {
		method: 'get',
		route: '/api/' + i
	};
	routes['POST/api/' + i] = {
		method: 'post',
		route: '/api/' + i
	};
	routes['PUT/api/' + i] = {
		method: 'put',
		route: '/api/' + i
	};
	routes['DELETE/api/' + i] = {
		method: 'delete',
		route: '/api/' + i
	};
}



apiBenchmark.measure(services, routes, function(err, results) {

	console.log('API benchmark results (total request: %s): ', config.routes);

	var wrapResults = {
		info: {
			totalRequest: config.routes
		},
		results: results
	};


	if (typeof(results.restify.isFastest) !== 'undefined') {
		console.log('Restify is Fastest');
		wrapResults.info.fastest = 'Restify';
		wrapResults.info.slowest = 'Hapi';
	}

	if (typeof(results.hapi.isFastest) !== 'undefined') {
		console.log('Hapi is Fastest');
		wrapResults.info.fastest = 'Hapi';
		wrapResults.info.slowest = 'Restify';
	}


	//	apiBenchmark.getHtml(results, function(error, html) {

	fs.writeFile('./report-request-' + config.routes + '.json', JSON.stringify(wrapResults), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('The file was saved!');
		}
	});

	//	});

});