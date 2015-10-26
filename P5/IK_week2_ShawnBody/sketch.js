/*
  To Do:
    Finish Limb Definitions
    
    Angles from previous limb angles, not always 0
    
    Pass in "end point" into each limb's update rather than angle
      Need to derive angle from ideal end point (this will be kinect data)
      
    Better Illustration
*/

var headLimb;
var torso;
var rightShoulderLimb;
var leftShoulderLimb, leftLowerArmLimb;
var rightUpperArmLimb, leftUpperArmLimb;
var rightLowerArmLimb;
var leftUpperArm;
var leftLowerArm;
var leftUpperLeg;
var leftLowerLeg;
var rightUpperLeg;
var rightLowerLeg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //_label, _length, _startJointX, _startJointY, _startJointMinDegrees, _startJointMaxDegrees, _limbEndJointStartJoint
  neckLimb = new Limb("Neck", 0, 40, 100, 90, 90);
  headLimb = new Limb("Head", 50, 40, 100, 200, 340, neckLimb);
  torso = new Limb("Torso", 100, 100, 100, 90, 90, neckLimb);
  rightShoulderLimb = new Limb("R \nShoulder", 50, 0, 0, -20, 20, neckLimb);
  rightUpperArmLimb = new Limb("R\n Upper Arm", 50, 0, 0, -180, 180, rightShoulderLimb);
  rightLowerArmLimb = new Limb("R \nLower Arm", 50, 0, 0, 0, 90, rightUpperArmLimb);


  leftShoulderLimb = new Limb("L \nShoulder", 50, 0, 0, 180 - 20, 180 + 20, neckLimb);
  leftUpperArmLimb = new Limb("L \nLower Arm", -50, 10, 0, -10, 90, leftShoulderLimb);
  Lthight = new Limb('L thigh', -70, 20, -40, -20, 0, torso);
  Rthight = new Limb('R thigh', 70, 20, -40, -20, 0, torso);
    Lshin = new Limb('L knee', -70, 20, -40, -20, 0, Lthight);
  Rshin = new Limb('R knee', 70, 20, -40, -20, 0, Rthight);
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    neckLimb.startJointX = mouseX;
    neckLimb.startJointY = mouseY;
  }

  neckLimb.draw();
  headLimb.draw();
  torso.draw();
  rightShoulderLimb.draw();
  leftShoulderLimb.draw();
  rightUpperArmLimb.draw();
  rightLowerArmLimb.draw();
  leftUpperArmLimb.draw();
  Lthight.draw();
  Rthight.draw();
  Lshin.draw();
  Rshin.draw();
}

/*
function Joint(_x, _y, _minDegrees, _maxDegrees) {
  this.minDegrees = _minDegrees;
  this.maxDegrees = _maxDegrees;
  this.x = _x;
  this.y = _y;
}
*/

// Construct a limb, it will be the length staring at the start joing position, towards the end joint position, not to exceed the min and max degree parameters
var Limb = function(_label, _length, _startJointX, _startJointY,
  _startJointMinDegrees, _startJointMaxDegrees, _parentEnd) {
  this.label = _label;
  this.limbLength = _length; // In pixels, angled off startJoint
  this.parentEnd = _parentEnd;
  this.startJointX = _startJointX;
  this.startJointY = _startJointY;
  this.startJointMinDegrees = _startJointMinDegrees;
  this.startJointMaxDegrees = _startJointMaxDegrees;

  this.update((this.startJointMinDegrees + this.startJointMaxDegrees) / 2);
}

Limb.prototype.update = function(_currentDegrees) {
  if (typeof _currentDegrees != "undefined") {
    this.currentDegrees = _currentDegrees;
  }

  if (typeof this.parentEnd !== 'undefined' || this.parentEnd != null) { //if it exists
    this.startJointX = this.parentEnd.endJointX; //start this joint at the parent's end 
    this.startJointY = this.parentEnd.endJointY;
  }

  this.endJointX = this.startJointX + cos(radians(this.currentDegrees)) * this.limbLength;
  this.endJointY = this.startJointY + sin(radians(this.currentDegrees)) * this.limbLength;

}

Limb.prototype.draw = function() {
  this.update();

  //print("line("+this.startJointX+", "+this.startJointY+", "+this.endJointX+", "+this.endJointY+")");
  stroke(0);
  fill(0, 255, 0); //green at start
  ellipse(this.startJointX, this.startJointY, 10, 10);
  line(this.startJointX, this.startJointY, this.endJointX, this.endJointY);
  fill(255, 0, 0); //red to end
  ellipse(this.endJointX, this.endJointY, 10, 10);
  text(this.label, this.endJointX, this.endJointY + 10);
}