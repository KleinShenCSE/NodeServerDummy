var http = require('http');
var router = require("./Router").create();
var fs = require('fs');

var hostport = 1337;
http.createServer(function (req, res) { 
  router.route(req, res);
  
}).listen(hostport);
