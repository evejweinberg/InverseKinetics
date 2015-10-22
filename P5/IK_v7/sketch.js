var arm1;
var arm2;
var armLength = 200;
var sliderBlength, gui, bButton, aButton;
var bisOn = false;
var aisOn = false;
var disOn = false;

function setup() {
  var canvas = createCanvas(800, 800);
  canvas.position(200, 100);
  noFill();
  stroke(0);
  rect(0, 0, 798, 798);


  gui = new Gui();
  gui.setup();
  stroke(255);
  strokeWeight(5);

  //set some variables to start
  arm2 = new drawArm(400, 100, 'a'); //bottom of chain x,y,l
  arm1 = new drawArm(600, 400, 'b'); //head of chain x,y,l

  arm3 = new drawArm(300, 100, 'c'); //bottom of chain x,y,l
  arm4 = new drawArm(200, 400, 'd'); //head of chain x,y,l

  // 	arm3 = new drawArm(50,400,'c');//why do I need this?

  // arm2.x = 500;
  // arm2.y = 100;
  // arm1.x = arm2.x+100;
  // arm1.y = arm2.y+100;
}

function draw() {
  background(0);

  arm1.hingeStart(arm2); //call function, give it elbow joint
  arm2.hingeEnd(arm1);

  arm3.hingeStart(arm4); //call function, give it elbow joint
  arm4.hingeEnd(arm3);
  aworking();
  bworking();
  dworking();

  // 	arm2.hingeStart(arm3);
  // 	arm3.hingeEnd(arm2);




}



function drawArm(x, y, l) {
  this.x = x;
  this.y = y;
  this.l = l;
  this.hingeX;
  this.hingeY;
}

drawArm.prototype.display = function() {
  fill(255);
  rect(this.x, this.y, 20, 20);
  strokeWeight(5);
  stroke(255)
  line(this.x + 10, this.y + 10, this.hingeX, this.hingeY); //draw a line from this x,y to
  //Add a letter in the box
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(25);
  noStroke();
  text(this.l, this.x + 10, this.y + 13);
}

function dJoints(armA, armB) {
  //draw a green line to show it
  stroke(0, 255, 0);
  strokeWeight(.5);
  line(armA.x, armA.y, armB.x, armB.y);
  //find dist from pt A to B
  return dist(armA.x, armA.y, armB.x, armB.y);
}

drawArm.prototype.hingeStart = function(armB) {
  var dist = dJoints(this, armB); //new var dist = ?? what is this syntax?
  var a = (Math.pow(armLength, 2) - Math.pow(armLength, 2) + Math.pow(dist, 2) / (2 * dist));
  var h = Math.sqrt(Math.pow(armLength, 2) - Math.pow(a, 2));

  var px = this.x + a * (armB.x - this.x) / dist;
  var py = this.y + a * (armB.y - this.y) / dist;

  this.hingeX = px + h * (armB.y - this.y) / dist;
  this.hingeY = py - h * (armB.x - this.x) / dist;
  // 	//draw a circle at the elbow
  // 	fill(255,0,0);
  // 	ellipse(this.hingeX, this.hingeY,20,20);

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
  //draw a circle at the elbow
  fill(0, 0, 255);
  ellipse(this.hingeX, this.hingeY, 20, 20);

  this.display();
}