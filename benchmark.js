var fs = require('fs'),
	apiBenchmark = require('api-benchmark'),
	config = require('./config');



var services = {	
	restify: 'http://localhost:3000/',
	hapi: 'http://localhost:4000/',
};


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
	}
}




apiBenchmark.measure(services, routes, function(err, results) {

	apiBenchmark.getHtml(results, function(error, html) {

		fs.writeFile('./report.html', html, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('The file was saved!');
			}
		});

	});

});