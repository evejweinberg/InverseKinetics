var armLength;
var arms = [];
var correctSpeed;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  stroke(255);
  strokeWeight(2);
  ellipseMode(CENTER);
  armLength = random(300,500);
  correctSpeed = .05;

}

function draw() {
  background(0);
  fill(255);
  textSize(20);
  text('press Z to undo a joint', 0, 30)

  for (ar in arms) { //run through them all, for loop
    if (ar > 0) {
      console.log(ar);
      if (abs(dist(arms[ar].x, arms[ar].y, arms[ar - 1].x, arms[ar - 1].y)) > 40) { //if you are not on a ball, make a hinge
        arms[ar].hingeStart(arms[ar - 1]);
        arms[ar - 1].hingeEnd(arms[ar]);
      }
      if (abs(dist(arms[ar].x, arms[ar].y, arms[ar - 1].x, arms[ar - 1].y)) > armLength * 2) {
        var correct = createVector(arms[ar].x - arms[ar - 1].x, arms[ar].y - arms[ar - 1].y);
        correct.normalize();
        arms[ar].x -= correct.x * correctSpeed * (abs(dist(arms[ar].x, arms[ar].y, arms[ar - 1].x, arms[ar - 1].y)) - (armLength * 2));
        arms[ar].y -= correct.y * correctSpeed * (abs(dist(arms[ar].x, arms[ar].y, arms[ar - 1].x, arms[ar - 1].y)) - (armLength * 2));
        line(arms[ar].x, arms[ar].y, arms[ar - 1].x, arms[ar - 1].y);
      }
    } else {
      arms[ar].display();
    }

    arms[ar].update();
  }
}

function keyTyped() {
  if (key === 'z') {
    arms.pop();
  }
  return false; // prevent any default behavior
}


function mousePressed() {
 
  var newArm = new drawArm(mouseX, mouseY); //spawn new object at mousex,y
  var makeNew = false; //default
  for (ar in arms) {
    if (arms.length > 0) { //if there are any in the chain
      //
      if (abs(dJoints(arms[ar], newArm)) > 100) { //if a bone is longer than 100
        makeNew = true; //true
      }

    }
  }
  if (arms.length == 0) {
    makeNew = true; //you can make new objects
  }

  if (makeNew) {
    arms.push(newArm);
  }
}

function drawArm(x, y) { //this is set to MouseX, mouseY
  this.x = x;
  this.y = y;
  this.hingeX;
  this.hingeY;
  this.colrand = color(random(255), random(255), random(255))
}

drawArm.prototype.update = function() {
  if (mouseIsPressed) {
    if (dist(mouseX, mouseY, this.x, this.y) < 40) {//this should be looping through all balls?
      this.x = mouseX;
      this.y = mouseY;
    }
  }
}
drawArm.prototype.display = function() {
  fill(this.colrand);
  noStroke();
  ellipse(this.x, this.y, 20, 20);
  strokeWeight(5);
  stroke(this.colrand);
  line(this.x, this.y, this.hingeX, this.hingeY);
}

function dJoints(armA, armB) {
  return dist(armA.x, armA.y, armB.x, armB.y);
}

drawArm.prototype.hingeStart = function(armB) { //IK math 
  var dist = dJoints(this, armB);
  var a = (Math.pow(armLength, 2) - Math.pow(armLength, 2) + Math.pow(dist, 2) / (2 * dist));
  var h = Math.sqrt(Math.pow(armLength, 2) - Math.pow(a, 2));

  var px = this.x + a * (armB.x - this.x) / dist;
  var py = this.y + a * (armB.y - this.y) / dist;

  this.hingeX = px + h * (armB.y - this.y) / dist;
  this.hingeY = py - h * (armB.x - this.x) / dist;

  this.display();
}

drawArm.prototype.hingeEnd = function(armB) {
  var dist = -dJoints(this, armB);
  var a = (Math.pow(armLength, 2) - Math.pow(armLength, 2) + Math.pow(dist, 2) / (2 * dist));
  var h = Math.sqrt(Math.pow(armLength, 2) - Math.pow(a, 2));

  var px = this.x + a * (armB.x - this.x) / dist;
  var py = this.y + a * (armB.y - this.y) / dist;

  this.hingeX = px + h * (armB.y - this.y) / dist;
  this.hingeY = py - h * (armB.x - this.x) / dist;

  this.display();
}