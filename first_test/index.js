var server = require("./server");
var router = require("./router");

server.start(router.route);
console.log("The port was " + server.port);