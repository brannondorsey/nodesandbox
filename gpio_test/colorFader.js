var gpio = require("pi-gpio");
var piblaster = require('pi-blaster.js');

var cRed = Math.random();
var cGreen = Math.random();
var cBlue = Math.random();
var changePerLoop = 0.05;
var threshold = 0.1;

var tRed = Math.random();
var tGreen = Math.random();
var tBlue = Math.random();

var signRed;
var signGreen;
var signBlue;

  if (cRed > tRed) {
    signRed = -changePerLoop;
  } 
  else {
    signRed = changePerLoop;
  }

  if (cGreen > tGreen) {
    signGreen = -changePerLoop;
  } 
  else {
    signGreen = changePerLoop;
  }

  if (cBlue > tBlue) {
    signBlue = -changePerLoop;
  } 
  else {
    signBlue = changePerLoop;
  }

var maxRed;
var minRed;
var maxGreen;
var minGreen;
var maxBlue;
var minBlue;
var test = 0.9;

setInterval(loop, 1);

function loop(){
    colorPick();
    
    // set R G B with current values
    piblaster.setPwm(0, cRed);
    piblaster.setPwm(2, cGreen);
    piblaster.setPwm(3, cBlue);
    console.log("The value of cRed is: " + cRed);
    console.log("The value of cGreen is: " + cGreen);
    console.log("The value of cBlue is: " + cBlue);
    var difference = Math.abs(cRed - tRed);
    console.log("The difference between cRed and tRed is " + difference);
    
    
}

function mapRange(value, low1, high1, low2, high2){
    return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}

function colorPick(){

    cRed += (1 * signRed);  
    cGreen += (1 * signGreen);
    cBlue += (1 * signBlue);
  
    // RED
    // check to see if current = target
    if (cRed == tRed) {
        tRed = Math.floor(Math.random());
    }
    // decide to fade up or down, depending where target is
    if (cRed < tRed) {
        signRed = changePerLoop;
    } else {
      signRed = -changePerLoop;
    }
  
    // GREEN
    // check to see if current = target
    if (cGreen == tGreen) {
        tGreen = Math.floor(Math.random());
    }
    // decide to fade up or down, depending where target is
    if (cGreen < tGreen) {
      signGreen = changePerLoop;
    } else {
      signGreen = -changePerLoop;
    }
  
    // BLUE
    // check to see if current = target
    if (cBlue == tBlue) {
        tBlue = Math.floor(Math.random());
    }
    // decide to fade up or down, depending where target is
    if (cBlue < tBlue) {
      signBlue = changePerLoop;
    } else {
      signBlue = -changePerLoop;
    }

}
