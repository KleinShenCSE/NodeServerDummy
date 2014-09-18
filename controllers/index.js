var hostport = 1337;
var server = require('./Server').create();
var router = require("./Router").create();

server.start(hostport, router);