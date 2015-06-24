var http = require('http');
var url = require("url"),
    path = require("path"),
    fs = require("fs");

// pages to route
var pages = [
  {
    route: '/env',
    output: function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
      res.write("System Environment:\n\n");
      for(var env in process.env) {
        res.write(env + ": " + process.env[env] + "\n");
      }
    }
  }
];

http.createServer(function(request, response) {

 //get url from request
  var lookup = decodeURI(request.url);
  pages.forEach(function(page){
    //find a match route
    if (page.route === lookup) {
      if (typeof page.output === 'function') {
        page.output(request, response);
        response.end();
      } else {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.end(page.output);
      }
    }
  });
 
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += './static/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(process.env.PORT || 5000, null);
