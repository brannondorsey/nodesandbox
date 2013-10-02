var gpio = require("pi-gpio");
//var piblaster = require('pi-blaster.js');
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

// var twitter = require('twitter');
// var twit = new twitter({
//     consumer_key: 'TroyIuC1l3i3laNlwl5mg',
//     consumer_secret: 'qYRSTEHzHhTsL0CBcMnXxjqeY5UQ6U4C0kNvmPSG4K4',
//     access_token_key: '1230084602-UtUB4QdlhNkv1aLqrjS3eYoZ96APon5IhjOqBFt',
//     access_token_secret: 'wscl1nV8gFO4kMhtJy7DjhQKkpJHB1fW5Jzb4RXZq8'
// });

// twit.stream('filter', { track: track }, function(stream) {
//   //event
//     stream.on('data', function(data) {
//       if(output(data) &&
//          !isOn &&
//          !argv.ledoff){
//         writePin(led, true);
//         isOn = true;
//         setTimeout(function(){
//           writePin(led, false);
//           isOn = false;
//         }, timeOn);
//     }
//   });
// });

// function output(data){
//   if(typeof data !== 'undefined' &&
//      typeof data.user !== 'undefined'){
//     printFragment("Created at", data.created_at);
//     printFragment("Created by", data.user.name);
//     printFragment("Tweet:", data.text);
//     console.log("");
//     return true;
//   }else return false; //error receiving tweet 
// }

// function printFragment(prefixMessage, value){
//   if(typeof value !== 'undefined') console.log(prefixMessage+" "+value);
// }

// function writePin(led, state){
//   var output = state ? 1 : 0;
//     gpio.open(led, "output", function(err) {  
//         gpio.write(led, output, function() {
//           //console.log("Wrote " + state + " to pin");     
//             gpio.close(led)
//         });
//     });
// }
var receivedTweet = true; //keeps track of if tweet is blinking
var colorsChanging = false;
var constValue = .3; //light values at lamp's dormant state
var speed = 1000; //length of time to ranbow
var increment = 0.01;
var threshold = 0.01;
var r, g, b, tR, tB, tG;

//init r, g, b as constVal
setDormant();

//start the loop
setInterval(loop, 500);

function loop(){
    // if tweet just came in
    if(receivedTweet){
      console.log("Received a new tweet");
      setTargetValues();
      receivedTweet = false;
      colorsChanging = true;
    }else if(colorsChanging){ //if colors are still changing from last tweet
      console.log("Colors are still changing");
      //if colors are finished changing set colorsChanging to false for next loop
      if(isFinished()){
        console.log("Colors finished changing");
        setDormant(); //reset r, g, b to dormant. This shouldn't actually be needed
        colorsChanging = false;
      } 
      else{
        r = gain(r, tR, increment, threshold);
        g = gain(g, tG, increment, threshold);
        b = gain(b, tB, increment, threshold);

        //if the targets were reached...
        if(reachedTargets()){
          //make the new targets the default state of the lamp
          tR = constValue;
          tG = constValue; 
          tB = constValue;
        }
      }
    }
    console.log("Finished loop cycle");
    // else{ //if listening for tweet
    //   r = constValue;
    //   g = constValue;
    //   b = constValue;
    // }
    
    // set R G B with current values
    //piblaster.setPwm(0, r);
    //piblaster.setPwm(1, g);
    //piblaster.setPwm(2, b);
    console.log("The value of r is: " + r);
    console.log("The value of g is: " + g);
    console.log("The value of b is: " + b);
    
}

function mapRange(value, low1, high1, low2, high2){
  return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}

function setTargetValues(){ 
  tR = Math.random();
  tG = Math.random();
  tB = Math.random();
}

//returns true if colors are back to their original states
function isFinished(){
  return (r == constValue && g == constValue && b == constValue) ? true : false;
}

function gain(value, targetValue, increment, threshold){
  //if the value is close enough to the target return the target
  if(Math.abs(value - targetValue) < threshold ){
    return targetValue;
  }else{//otherwise return a value that is increment closer to the target
    if(value < targetValue) value += increment;
    else value -= increment;
    return value;
  }
}

function reachedTargets(){
  return (r == tR && g == tG && b == tB) ? true : false;
}

function setDormant(){
  r = constValue;
  g = constValue;
  b = constValue;
}
