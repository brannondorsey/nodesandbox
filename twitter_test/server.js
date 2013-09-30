var http = require("http");

var port = 8080;

function start() {
  http.createServer(function(){
  	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }).listen(port);
  console.log("Server started at port " + port);
}

exports.start = start;