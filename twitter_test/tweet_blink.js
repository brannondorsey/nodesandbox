var argv = require('optimist')
		   .usage('Usage: $0 --pin [num] --search [string] --speed [milliseconds] --ledoff')
		   .default({'pin': 12,
					 'search': "lightupchicago",
					 'speed': 500})
		   .alias({'pin': 'p',
				   'search': 'q',
				   'speed': 's',
				   'ledoff': 'l'})
		   .argv;

var led = argv.pin;
var track = argv.search;
var timeOn = argv.speed;
var isOn = false; //keeps track if led is on and doesn't allow new connection to be opened if it is

var gpio = require("pi-gpio");
var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'TroyIuC1l3i3laNlwl5mg',
    consumer_secret: 'qYRSTEHzHhTsL0CBcMnXxjqeY5UQ6U4C0kNvmPSG4K4',
    access_token_key: '1230084602-UtUB4QdlhNkv1aLqrjS3eYoZ96APon5IhjOqBFt',
    access_token_secret: 'wscl1nV8gFO4kMhtJy7DjhQKkpJHB1fW5Jzb4RXZq8'
});

twit.stream('filter', { track: track }, function(stream) {
	//event
    stream.on('data', function(data) {
    	if(output(data) &&
    	   !isOn &&
    	   !argv.ledoff){
	    	writePin(led, true);
	    	isOn = true;
	    	setTimeout(function(){
		    	writePin(led, false);
		    	isOn = false;
		    }, timeOn);
		}
	});
});

function output(data){
	if(typeof data !== 'undefined' &&
	   typeof data.user !== 'undefined'){
		printFragment("Created at", data.created_at);
		printFragment("Created by", data.user.name);
		printFragment("Tweet:", data.text);
		console.log("");
		return true;
	}else return false; //error receiving tweet	
}

function printFragment(prefixMessage, value){
	if(typeof value !== 'undefined') console.log(prefixMessage+" "+value);
}

function writePin(led, state){
	var output = state ? 1 : 0;
		gpio.open(led, "output", function(err) {  
		    gpio.write(led, output, function() {
		    	console.log("Wrote " + state + " to pin");     
		        gpio.close(led)
		    });
		});
}

