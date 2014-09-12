var url = require("url");
var fs = require('fs');
var indexPagePath = '../views/index.html';

function route(request, response) {
  // get path to the request handler accodringly
  var pathname = url.parse(request.url, true).pathname;

  switch (true) {
    case (/\/set-cookie/.test(pathname) && request.method === 'GET'):
      setCookie(request, response);
      break;

    case (/\/read-cookie/.test(pathname) && request.method === 'GET'):
      viewCookie(request, response);
      break;

    case (/\//.test(pathname) && request.method === 'GET'):
      displayIndexPage(request, response);
      break;

    case (/\//.test(pathname) && request.method === 'POST'):
      displayInput(request, response);
      break;

    default:
      // route to 404 page, not match the url
      response.writeHeader(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
  }
}

// read index.html from server fs
function displayIndexPage(req, res) {
  fs.readFile(indexPagePath, function (err, data) {
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
}


function displayInput(req, res) {
  req.on('data', function(chunk) {
    var content = chunk.toString().split("&").join(" ");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(content);
    res.end();
  });
}


function setCookie(req, res) {
  var d = new Date();
  d.setMinutes(d.getMinutes() + 1);
  res.writeHead(200, {
    'Set-Cookie':'dummyCookieMessage; expires='+d.toUTCString()
  });
  res.end();
}

function viewCookie(req, res) {
  var cookies = req.headers.cookie;
  res.writeHead(200, {'Content-Type': 'text/html','Content-Length':cookies.length});
  res.write(cookies);
  res.end();
}
exports.route = route;

