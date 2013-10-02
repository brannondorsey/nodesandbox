var gpio = require("pi-gpio");
var piblaster = require('pi-blaster.js');

var cRed = Math.floor(Math.random());
var cGreen = Math.floor(Math.random());
var cBlue = Math.floor(Math.random());

var tRed = Math.floor(Math.random());
var tGreen = Math.floor(Math.random());
var tBlue = Math.floor(Math.random());

var signRed;
var signGreen;
var signBlue;

  if (cRed > tRed) {
    signRed = -0.05;
  } 
  else {
    signRed = 0.05;
  }

  if (cGreen > tGreen) {
    signGreen = -0.05;
  } 
  else {
    signGreen = 0.05;
  }

  if (cBlue > tBlue) {
    signBlue = -0.05;
  } 
  else {
    signBlue = 0.05;
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
    piblaster.setPwm(2, test);
    piblaster.setPwm(3, test);
    piblaster.setPwm(4, test);
    console.log(test);
    
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
        signRed = 0.05;
    } else {
      signRed = -0.05;
    }
  
    // GREEN
    // check to see if current = target
    if (cGreen == tGreen) {
        tGreen = Math.floor(Math.random());
    }
    // decide to fade up or down, depending where target is
    if (cGreen < tGreen) {
      signGreen = 0.05;
    } else {
      signGreen = -0.05;
    }
  
    // BLUE
    // check to see if current = target
    if (cBlue == tBlue) {
        tBlue = Math.floor(Math.random());
    }
    // decide to fade up or down, depending where target is
    if (cBlue < tBlue) {
      signBlue = 0.05;
    } else {
      signBlue = -0.05;
    }

}
