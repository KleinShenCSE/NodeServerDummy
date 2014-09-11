var hostdomain = 'http://172.31.43.147';
var hostport = 1337;

var http = require('http');
// set up a sever
http.createServer(function (req, res) { 
  console.log(req);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(hostport, hostdomain);

console.log('Server running at ' + hostdomain + ':' + hostport);
