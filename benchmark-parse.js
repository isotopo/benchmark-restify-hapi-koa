'use strict';

var fs = require('fs'),
	_ = require('underscore'),
	packagejson = require('./package.json'),
	config = require('./config'),
	benchmarkParse;

benchmarkParse = {



	// -
	//
	// Return only the object with property 
	// isSlowest
	//
	getSlowest: function(results) {
		for (var servers in results) {
			if (typeof(results[servers].isSlowest) !== 'undefined') {
				return servers;
			}
		}
	},



	// -
	//
	// Return only the object with property 
	// isFastest
	//
	getFastest: function(results) {
		for (var servers in results) {
			if (typeof(results[servers].isFastest) !== 'undefined') {
				return servers;
			}
		}
	},


	// -
	//
	// Get duration average for all request by server
	// and for each methods
	//
	getDurationAverage: function(results) {

		var durations = {},
			total = 0;

		for (var servers in results) {

			durations[servers] = {};
			durations[servers].total = 0;


			for (var routes in results[servers]) {

				var route = results[servers][routes],
					difference = 0;

				if (!route.name) {
					break;
				}

				if (typeof(durations[servers][route.options.method]) === 'undefined') {
					durations[servers][route.options.method] = 0;
				}

				difference = (new Date(route.options.end) - new Date(route.options.start)) / 1e3;

				durations[servers][route.options.method] = durations[servers][route.options.method] + difference;
				durations[servers].total = durations[servers].total + difference;

			}

			total += durations[servers].total;

		}



		return durations;

	},



	// -
	//
	// Set Extra infomation
	//
	getInfo: function(results, routes) {
		var data = {};

		data.totalRequest = Object.keys(routes).length;

		data.fastest = this.getFastest(results);

		data.slowest = this.getSlowest(results);

		data.duration = this.getDurationAverage(results);

		data.servers = _.object(_.map(results, function(num, key) {
			return [key, {
				version: packagejson.dependencies[key],
				url: config.servers[key]
			}];
		}));

		data.originalResults = results;

		return data;

	},


	// -
	//
	//
	createReport: function(resultsBenchmarkParse) {

		var compiler = _.template(fs.readFileSync('templates/template-benchmark-parse.html', 'utf8'));

		compiler = compiler({
			data: JSON.stringify(resultsBenchmarkParse)
		});


		// -
		// Write json
		//
		fs.writeFile('reports/report-' + config.routes + '-' + config.network + '.html', compiler, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('The report html file was saved!');
			}
		});

	},

	// -
	//
	//
	createJsonReport: function(results) {

		fs.writeFile('./report-request-' + config.routes + '-' + config.network +  '.json', JSON.stringify(results), function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('The json file was saved!');
			}
		});
	}


};


module.exports = benchmarkParse;