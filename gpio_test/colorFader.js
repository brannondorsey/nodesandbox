var gpio = require("pi-gpio");
var piblaster = require('pi-blaster.js');

var rate = 1000;
var output = .1;
var direction = .1;

setInterval(loop, 300);

function loop(){
        blink();
}

function blink(){        
        piblaster.setPwm(2, output);
        piblaster.setPwm(3, output);
        piblaster.setPwm(4, output);

        if(output >= .9){
            direction = -.1;
        }
        if(output <= .1){
            direction = .1;
        }
        output += direction;
        console.log(output + "," + direction);       
}
