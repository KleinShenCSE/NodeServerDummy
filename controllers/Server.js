"use strict"

var http = require('http');
var router = require("./Router").create();
var fs = require('fs');


var __ = function () {
};


__.create = function create() {
    var instance = new __();
    return instance;
};



__.prototype.start = function(hostport) {
	console.log('creating a server on ' + hostport);
	this.server = http.createServer(function (req, res) {
		router.route(req, res);
	}).listen(hostport);
}

__.prototype.close = function() {
	this.server.close();
}

module.exports = __;