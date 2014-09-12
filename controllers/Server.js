var http = require('http');
var router = require("./Router").create();
var fs = require('fs');

var hostport = 1337;


var __ = function () {
};

__.create = function create() {
    var instance = new __();
    return instance;
};


__.prototype.start = function() {
	http.createServer(function (req, res) { 
	router.route(req, res);
  
	}).listen(hostport);
}

module.exports = __;