'use strict';


var fs = require('fs'),
	apiBenchmark = require('api-benchmark'),
	config = require('./config'),
	benchmarkParse = require('./benchmark-parse'),
	services = config.servers,
	routes = {};



for (var i = 1; i <= config.routes; i++) {
	routes['GET/api/' + i] = {
		method: 'get',
		route: '/api/' + i,
		maxConcurrentRequests: 1
	};
	routes['POST/api/' + i] = {
		method: 'post',
		data: {
			test: true,
			moreData: 'aString'
		},
		route: '/api/' + i,
		maxConcurrentRequests: 1
	};
	routes['PUT/api/' + i] = {
		method: 'put',
		data: {
			test: true,
			moreData: 'aString'
		},
		route: '/api/' + i,
		maxConcurrentRequests: 1
	};
	routes['DELETE/api/' + i] = {
		method: 'delete',
		route: '/api/' + i,
		maxConcurrentRequests: 1
	};
}



apiBenchmark.measure(services, routes, function(err, results) {

	var wrapResults = benchmarkParse.getInfo(results, routes);

	// -
	//
	benchmarkParse.createReport(wrapResults);

	// -
	//
	apiBenchmark.getHtml(results, function(error, html) {

		fs.writeFile('./reports/report-all-routes-' + config.routes + '-' + config.network + '.html', html, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('The json file was saved!');
			}

		});

	});


});