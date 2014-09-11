var url = require("url");
var fs = require('fs');
var indexPagePath = '../views/index.html';

function route(request, response) {
  // get path to the request handler accodringly
  var pathname = url.parse(request.url, true).pathname;
  switch (true) {
    case (/\//.test(pathname)):
      if (request.method === 'GET') {
        displayIndexPage(request, response);
      } else if (request.method === 'POST') {
        displayInput(request, response);
      }
      break;
    case (/\/set-cookie/.test(pathname)): 
    
      break;
    case (/\/read-cookie/.test(pathname)):

      break;
    default:
      // route to 404 page, not match the url
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
exports.route = route;

