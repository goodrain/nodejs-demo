var http = require("http");
var url = require("url");



function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for" + pathname + "received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });
    //route(handle,pathname,response);

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write("this is a demo");
    //response.end();
  }

  http.createServer(onRequest).listen(process.env.PORT || 5000, null);
}
function api(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for" + pathname + "received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });
    //route(handle,pathname,response);

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.write("this is a demo");
    //response.end();
    
  }

  http.createServer(onRequest).listen(process.env.PORT || 5000, null);
}
function env(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;

    request.setEncoding("utf8");
    
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function(data) {
      console.log(data)
      route(handle, pathname, response, postData);
    });
    //route(handle,pathname,response);

    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.write("this is a demo");
    // response.end();
  }

  http.createServer(onRequest).listen(process.env.PORT || 5000, null);
}

exports.start = start;
exports.api = api;
exports.env = env;
