"use strict"
process.env.NODE_ENV = 'test';

var Browser = require("zombie");
var assert = require("assert");
var http = require('http');

var Server = require('../controllers/Server');
var router = require('../controllers/Router').create();

var testPort = 5050;
var testServer = 'http://localhost:5050/';

process.on('uncaughtException', function (err) {
  console.log(err);
});

exports['server and router tests'] = {
	'should fill out the form on the index page and route to display': function(test) {
		var server = Server.create();
		server.start(testPort, router);
		var browser = new Browser();

		test.expect(2);

		browser.visit(testServer).then(function() {
			
			test.equal(browser.html('span'),'<span>input personal information</span>');
			
			browser.fill("#name",'dummyName')
			.pressButton("#submit", function() {
     			var browserHtml = browser.html('*');
     			test.equal(browserHtml, '<html><head></head><body>name=dummyName year=Freshman gender=male</body></html><head></head><body>name=dummyName year=Freshman gender=male</body>');
   				server.close();
				test.done();
   			});

		});
	}
}