"use strict"

var Router = require('../controllers/Router');
var url = require("url");
var fs = require('fs');


exports['route'] = {
	'should route to the routes matching index page GET': function(test) {
		test.expect(2);
		var testRouter = Router.create();
		var request = {'url' : '\/', method : 'GET'};
		testRouter.displayIndexPage = function(req, res) {
			test.deepEqual(req, request);
			test.deepEqual(res, {});	
			test.done();
		}	
		testRouter.route(request, {});
	},
	'should route to the routes matching index page POST': function(test) {
		test.expect(2);
		var testRouter = Router.create();
		var request = {'url' : '\/', method : 'POST'};
		testRouter.displayInput = function(req, res) {
			test.deepEqual(req, request);
			test.deepEqual(res, {});	
			test.done();
		}	
		testRouter.route(request, {});
	},
	'should route to set cookie as a GET request when path is set-cookie': function(test) {
		test.expect(2);
		var testRouter = Router.create();
		var request = {'url' : '\/set-cookie/', method : 'GET'};
		testRouter.setCookie = function(req, res) {
			test.deepEqual(req, request);
			test.deepEqual(res, {});	
			test.done();
		}	
		testRouter.route(request, {});
	},
	'should route to view cookie as a GET request when path is read-cookie': function(test) {
		test.expect(2);
		var testRouter = Router.create();
		var request = {'url' : '\/read-cookie/', method : 'GET'};
		testRouter.viewCookie = function(req, res) {
			test.deepEqual(req, request);
			test.deepEqual(res, {});	
			test.done();
		}	
		testRouter.route(request, {});
	},
	'should route to 404 when request is not valiad': function(test) {
		test.expect(4);
		var testRouter = Router.create();
		var request = {'url' : 'Dummy', method : 'GET'};
		
		var response = {
			writeHeader : function(statusCode, content) {
				test.equal(statusCode, 404);
				test.deepEqual(content, {"Content-Type": "text/plain"});
				},
			write : function(msg) {
				test.equal(msg, "404 Not Found\n");
			},
			end : function() {
				test.ok(true);
				test.done();
			}
		};
		testRouter.route(request, response);
	}
};

exports['viewCookie'] = {
	'should read the cookie and display in the response': function(test) {
		test.expect(3);
		var testRouter = Router.create();
		var request = {'headers' : {'cookie': 'dummyCookie'}};
		var response = {
			writeHead: function(statusCode, headerContent) {
							test.equal(statusCode, 200);				
			},
			write: function(cookieContent) {
				test.equal(cookieContent, 'dummyCookie');
			},
			end: function() {
				test.ok(true);
				test.done();
			}
		};	

		testRouter.viewCookie(request, response);
	}
};

exports['setCookie'] = {
	'should set dummy cookie message that expires in 1 min': function(test) {
		test.expect(3);
		var testRouter = Router.create();
		
		var d = new Date();
  		d.setMinutes(d.getMinutes() + 1);

		var response = {
			writeHead: function(statusCode, headerContent) {
							test.equal(statusCode, 200);
							var content = 'dummyCookieMessage; expires='+d.toUTCString();
							test.deepEqual(headerContent, {'Set-Cookie': content});				
			},
			end: function() {
				test.ok(true);
				test.done();
			}
		};	

		testRouter.setCookie({}, response);
	}
};

exports['displayInput'] = {
	'should read the cookie and display in the response': function(test) {
		test.expect(5);
		var testRouter = Router.create();
		var request = {'on' : function(input, callBackFun) {
			test.equal(input, 'data');
			callBackFun('dummyOne&dummyTwo');
		}};
		
		var response = {
			writeHead: function(statusCode, headerContent) {
							test.equal(statusCode, 200);
							test.deepEqual(headerContent, {'Content-Type': 'text/plain'});
			},
			write: function(cookieContent) {
				test.equal(cookieContent, 'dummyOne dummyTwo');
			},
			end: function() {
				test.ok(true);
				test.done();
			}
		};	

		testRouter.displayInput(request, response);
	}
};

exports['displayIndexPage'] = {
	'should read the cookie and display in the response': function(test) {
		test.expect(4);
		
		var testRouter = Router.create();
		var dataLength;
		
		var response = {
			writeHead: function(statusCode, headerContent) {
							test.equal(statusCode, 200);
							test.equal(headerContent['Content-Type'], 'text/html');
							dataLength = headerContent['Content-Length'];
			},
			write: function(cookieContent) {
				test.equal(cookieContent.length, dataLength);
			},
			end: function() {
				test.ok(true);
				test.done();
			}
		};	

		testRouter.displayIndexPage({}, response);
	}
};
