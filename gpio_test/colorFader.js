var gpio = require("pi-gpio");
var piblaster = require('pi-blaster.js');

var cRed = getRandomInt(0, 255);
var cGreen = getRandomInt(0, 255);
var cBlue = getRandomInt(0, 255);

var tRed = getRandomInt(0, 255);
var tGreen = getRandomInt(0, 255);
var tBlue = getRandomInt(0, 255);

var signRed;
var signGreen;
var signBlue;

var maxRed;
var minRed;
var maxGreen;
var minGreen;
var maxBlue;
var minBlue;

setInterval(loop, 1);

function loop(){
    colorPick();
    
    // set R G B with current values
    piblaster.setPwm(2, cRed);
    piblaster.setPwm(3, cGreen);
    piblaster.setPwm(4, cBlue);
    console.log(cRed + "," + signRed);  
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function colorPick(){

    cRed = cRed + (1 * signRed);
    cGreen = cGreen + (1 * signGreen);
    cBlue = cBlue + (1 * signBlue);
  
    // RED
    // check to see if current = target
    if (int(cRed) == int(tRed)) {
        tRed = getRandomInt(0, 255);
    }
    // decide to fade up or down, depending where target is
    if (cRed < tRed) {
        signRed = 1;
    } else {
      signRed = -1;
    }
  
    // GREEN
    // check to see if current = target
    if (int(cGreen) == int(tGreen)) {
        tGreen = getRandomInt(0, 255);
    }
    // decide to fade up or down, depending where target is
    if (cGreen < tGreen) {
      signGreen = 1;
    } else {
      signGreen = -1;
    }
  
    // BLUE
    // check to see if current = target
    if (int(cBlue) == int(tBlue)) {
        tBlue = getRandomInt(0, 255);
    }
    // decide to fade up or down, depending where target is
    if (cBlue < tBlue) {
      signBlue = 1;
    } else {
      signBlue = -1;
    }

}
