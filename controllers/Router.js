"use strict"

var url = require("url");
var fs = require('fs');
var indexPagePath = '../views/index.html';

var __ = function () {
};

__.create = function create() {
    var instance = new __();
    return instance;
};

__.prototype.route = function(request, response) {
  // get path to the request handler accodringly
  var pathname = url.parse(request.url, true).pathname;
  
  switch (true) {
    case (/\/set-cookie/.test(pathname) && request.method === 'GET'):
      this.setCookie(request, response);
      break;

    case (/\/read-cookie/.test(pathname) && request.method === 'GET'):
      this.viewCookie(request, response);
      break;

    case (/\//.test(pathname) && request.method === 'GET'):
      this.displayIndexPage(request, response);
      break;

    case (/\//.test(pathname) && request.method === 'POST'):
      this.displayInput(request, response);
      break;

    default:
      // route to 404 page, not match the url
      response.writeHeader(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
  }
}

// read index.html from server fs
__.prototype.displayIndexPage = function(req, res) {
  fs.readFile(indexPagePath, function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
}


__.prototype.displayInput = function(req, res) {
  req.on('data', function(chunk) {
    var content = chunk.toString().split("&").join(" ");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(content);
    res.end();
  });
}


__.prototype.setCookie = function(req, res) {
  var d = new Date();
  d.setMinutes(d.getMinutes() + 1);
  res.writeHead(200, {
    'Set-Cookie':'dummyCookieMessage; expires='+d.toUTCString()
  });
  res.end();
}

__.prototype.viewCookie = function(req, res) {
  var cookies = req.headers.cookie;
  res.writeHead(200, {'Content-Type': 'text/html','Content-Length':cookies.length});
  res.write(cookies);
  res.end();
}

module.exports = __;
