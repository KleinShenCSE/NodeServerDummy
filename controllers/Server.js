"use strict"

var http = require('http');
var fs = require('fs');


var __ = function () {
};


__.create = function create() {
    var instance = new __();
    return instance;
};


__.prototype.start = function(hostport, router) {
	console.log('server listening on on ' + hostport);
	this.server = http.createServer(function (req, res) {
		console.log('one request');
		router.route(req, res);
	}).listen(hostport);
}

__.prototype.close = function() {	
	this.server.close();
	console.log('server shut down');
}

module.exports = __;