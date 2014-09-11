var http = require('http');
http.createServer(function (req, res) { 
  console.log('!!');
  console.log(req);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '172.31.43.147');

console.log('Server running at http://172.31.43.147:1337');
