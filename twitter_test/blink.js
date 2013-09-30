var gpio = require("pi-gpio");

var led = 18;
var rate = 1000;
var state = true;

setInterval(loop, 1000);

function loop(){
	blink(state);
	state = !state;
}

function blink(state){
	console.log("Blinking " + state);
	var output = state ? 1 : 0;
	gpio.open(led, "output", function(err) {  
	    gpio.write(led, output, function() {     
	        gpio.close(led)
	    });
	});
}