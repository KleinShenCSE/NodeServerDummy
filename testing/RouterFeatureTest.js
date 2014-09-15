"use strict"
process.env.NODE_ENV = 'test';

var Browser = require("zombie");
var assert = require("assert");

var server = require('../controllers/Server').create();

var testPort = 5000;
var testServer = 'http://localhost:' + testPort;

process.on('uncaughtException', function (err) {
  console.log(err);
});

exports['server and router tests'] = {
	// setUp: function() {
 //       // this.server = Server.create();
 //       // this.server.start(testPort);
 //       // server.start(testPort);
 //    },

 //    tearDown: function() {
 //    	// this.server.close();
 //    },

	'should fill out the form on the index page and route to display': function(test) {
		server.start(3000);
		var browser = new Browser();
		test.expect(1);
		
		browser.visit("http://localhost:3000/").then(function() {
			test.ok(true);
		// 	test.done();
		// // 	// test.equal(browser.location.href, testServer +'/');

		// // 	test.done();
		// // }, function() {
		// // 	test.done();
			
		});
		// test.done();
		test.done();
		server.close();
	}
	// ,
	// 'should manually set the cookie and display when route to /read-cookie within one min': function(test) {

	// }
}