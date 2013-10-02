var track = "Obama"

var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'TroyIuC1l3i3laNlwl5mg',
    consumer_secret: 'qYRSTEHzHhTsL0CBcMnXxjqeY5UQ6U4C0kNvmPSG4K4',
    access_token_key: '1230084602-UtUB4QdlhNkv1aLqrjS3eYoZ96APon5IhjOqBFt',
    access_token_secret: 'wscl1nV8gFO4kMhtJy7DjhQKkpJHB1fW5Jzb4RXZq8'
});

// twit.search('nodejs OR #node', function(data) {
//     console.log(util.inspect(data,{colors: true}));
// });

// twit.stream('filter', { track: track }, function(stream) {
// 	//event
//     stream.on('data', function(data) {
//     	output(data);
//     });
// });

twit.search("test", {result_type: "recent",
					   count: 1}, function(data){
	var tweetData = data.statuses[0];
	console.log(util.inspect(tweetData, {colors: true}));
	output(tweetData);
});

function output(data){
	if(typeof data !== 'undefined' &&
	   typeof data.user !== 'undefined'){
		printFragment("Created at", data.created_at);
		printFragment("Created by", data.user.name);
		printFragment("Tweet:", data.text);
		console.log("");
	}else console.log("Error receiving tweet");
	
}

function printFragment(prefixMessage, value){
	if(typeof value !== 'undefined') console.log(prefixMessage+" "+value);
}
