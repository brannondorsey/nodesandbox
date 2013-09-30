//var http = require("http");
var gpio = require("pi-gpio");

var led = 3;
var rate = 1000;
var state = true;

setInterval(loop, 1000);

function loop(){
	blink(state);
	state = !state;
}


function blink(state){
	var output = state ? 1 : 0;
	gpio.open(led, "output", function(err) {  
	    gpio.write(led, output, function() {     
	        gpio.close(led)
	    });
	});
}






// var port = 8080;

// var server = http.createServer(function(request, response){
// 	response.writeHead(200, {"Content-Type": "text/plain"});
// 	response.write("Hello World");
// 	response.end();
// });

// server.listen(port);

// console.log("Server started at port " + port);
