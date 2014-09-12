"use strict"

var Browser = require("zombie");
var Router = require('../controllers/Router');
var localPort = 1337;
var testServer = 'http://localhost:' + localPort;

exports['route'] = {
	setUp: function(cb) {
        this.router = Router.create();
        this.wizard.start();
        MonkeyPatcher.setUp(cb);
    },

    tearDown: function(cb) {
        this.wizard.server.close();
        nock.cleanAll();
        MonkeyPatcher.tearDown(cb);
    },

	'should route to the routes matching index page GET': function(test) {
		var browser = new Browser();
		browser.visit(testServer + '\/').then(function() {
                test.equal(browser.location.href, testServer +'\/');
                test.done();
            })
		// test.expect(2);
		// var testRouter = Router.create();
		// var request = {'url' : '\/', method : 'GET'};
		// testRouter.displayIndexPage = function(req, res) {
		// 	test.deepEqual(req, request);
		// 	test.deepEqual(res, {});	
		// 	test.done();
		// }	
		// testRouter.route(request, {});
		test.done();
	}
}