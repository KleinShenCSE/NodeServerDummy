var http = require('http');
var fs = require('fs');
var homePagePath = '../views/index.html';

http.createServer(function (req, res) { 
  fs.readFile(homePagePath, function () {
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
}).listen(1337, '172.31.43.147');

console.log('Server running at http://172.31.43.147:1337');
