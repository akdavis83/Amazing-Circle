//Variables
var canvas = document.querySelector('canvas');
var swirl = false;
var load = document.getElementById('loading');
var btn = document.getElementById('btn');
var p = document.getElementById('p');
//Declare sizes and stuff
load.innerHTML = 'Click To Toggle Mouse Tracking';
canvas.width = innerWidth - 30;
canvas.height = innerHeight - 200;
function resize() {
  canvas.width = innerWidth - 30;
  canvas.height = innerHeight - 200;
  w = {
  width: canvas.width,
  height: canvas.height
};
}
//More variables
//change 'amount' to alter the amount of particles, the code will do the rest of the work
var amount = 200;
var c = canvas.getContext('2d');
var w = {
  width: canvas.width,
  height: canvas.height
};
var slowvar = {
  x: w.width / 2,
  y: w.height / 2
};
var colors = ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'];
var mouse = {
x: w.width / 2,
y: w.height / 2
};
var doGo = true;
//mouse tracking functions and stuff
addEventListener("mousemove", function(event) {
mouse.x = event.clientX;
mouse.y = event.clientY;
});
function follow() {
  if (doGo === false) {
      doGo = true;
  }
  else {
    slowvar = {
      x: mouse.x,
      y: mouse.y
    };
    doGo = false;
  }
}
//switch between modes
function switch1() {
  if (swirl === false) {
    swirl = true;
    check = 0;
    noShadow = false;
    btn.innerHTML = 'Start Trailing';
    p.innerHTML = 'Currently: Painting';
  }
  else {
    swirl = false;
    c.clearRect(0, 0, w.width, w.height);
    btn.innerHTML = 'Start Painting';
    p.innerHTML = 'Currently: Trailing';
  }
}
//Just some boilerplate stuff I made
circArr = [];
c.clearRect(0, 0, w.width, w.height);
circArr.length = 0;
function Line () {
  this.newLine = function(fromx, fromy, tox, toy, color) {
  c.beginPath();
  c.moveTo(fromx, fromy);
  c.lineTo(tox, toy);
  c.strokeStyle = color;
  c.stroke();
  }
  this.contLine = function(tox, toy) {
    c.lineTo(tox, toy);
    c.stroke();
  }
}
//Utility functions
function randomFrom(a, b, floor) {
  if (floor == true || floor == undefined) {
  return Math.floor(Math.random() * (b - a) + a);
}
else {
  return Math.random() * (b - a) + a;
}
}
//Beginning of the confusion - prepare you brain
function Circle(x, y, radius, color) {
  //variables specific to individual particles
  this.x = x;
  this.y = y;
  this.radians = Math.random() * Math.PI * 2;
  this.size = randomFrom(50, 100);
  this.radius = randomFrom(3, 7);
  this.color = color;
  this.velocity = randomFrom(0.03, 0.04, false);
  this.lastM = {x: x, y: y};
  //update function; conditionals and x and y variations, etc.
  this.update = function(lastM, slowvarx, slowvary) {
    const last = {x: this.x, y: this.y};
    if (doGo === true) {
//How to follow the mouse
    this.lastM.x += (mouse.x - this.lastM.x) * 0.05;
    this.lastM.y += (mouse.y - this.lastM.y) * 0.05;
    this.x = lastM.x + Math.cos(this.radians) * this.size;
    this.y = lastM.y + Math.sin(this.radians) * this.size;
  } else if (doGo === false) {
    //how to stay still, but go to where you need to go first (arghhh, took me forever)
    this.lastM.x += (slowvarx - this.lastM.x) * 0.05;
    this.lastM.y += (slowvary - this.lastM.y) * 0.05;
    this.x = lastM.x + Math.cos(this.radians) * this.size;
    this.y = lastM.y + Math.sin(this.radians) * this.size;
  }
  //how to move
    this.radians += this.velocity;
    this.draw(last);
  }
  //how to exist
  this.draw = function(last) {
    c.font = '20px Georgia';
    if (swirl == false) {
      c.fillStyle = 'white';
  } else {
      c.fillStyle = 'black';
  }
    c.fillText('Ephesians 3:20', 0, 20)
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(last.x, last.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }
}
//MORE variables
var line = new Line();
var check = 0;
var noShadow = false;
//exist-ify those particles
for (let i = 0; i < amount; i++) {
  circArr.push(new Circle(mouse.x, mouse.y, 5, colors[randomFrom(0, colors.length)]));
}
var x = 100;
//animate those particles
function animate() {
  requestAnimationFrame(animate);
  //more confusion (took me ages); how to trail and transition to trailing
  if (swirl == true) {
    if (check < 30) {
      load.innerHTML = 'Loading...';
      check += 1;
      c.fillStyle = 'rgba(255, 255, 255, 0.05)';
      c.fillRect(0, 0, w.width, w.height);
    }
    else {
      //how to paint and transition to painting
      load.innerHTML = 'Click To Toggle Mouse Tracking';
      c.fillStyle = 'rgba(255, 255, 255, 0)';
        if (noShadow == false) {
          c.fillStyle = 'rgba(255, 255, 255, 1)'
          c.clearRect(0, 0, w.width, w.height);
          noShadow = true;
        }
    }
  }
  else if (swirl == false) {
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  }
  //how to stop existing
  c.fillRect(0, 0, w.width, w.height);
    for (let i = 0; i < circArr.length; i++) {
      circArr[i].update(circArr[i].lastM, slowvar.x, slowvar.y);
  }
}
//actually do the stuff described
animate();
//BTW i used 'color' instead of 'colour' in variable names just because its quicker and i dont care.
//FINALLY FINISHED!!!!