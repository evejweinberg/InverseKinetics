/*
  To Do:
    Finish Limb Definitions
    
    Angles from previous limb angles, not always 0
    
    Pass in "end point" into each limb's update rather than angle
      Need to derive angle from ideal end point (this will be kinect data)
      
    Better Illustration
*/

var headLimb;
var torsoLimb;
var rightShoulderLimb;
var leftShoulderLimb;
var rightUpperArmLimb;
var rightLowerArmLimb;
var leftUpperArm;
var leftLowerArm;
var leftUpperLeg;
var leftLowerLeg;
var rightUpperLeg;
var rightLowerLeg;

function setup() {
  createCanvas(windowWidth,windowHeight);
  neckLimb = new Limb("Neck", 0, 100, 100, 90, 90);
  headLimb = new Limb("Head", 50, 100, 100, 200, 340, neckLimb);
  torsoLimb = new Limb("Torso", 100, 100, 100, 90, 90, neckLimb);
  rightShoulderLimb = new Limb("Right Shoulder", 50, 0, 0, -20, 20, neckLimb);
  rightUpperArmLimb = new Limb("Right Upper Arm", 50, 0, 0, -180, 180, rightShoulderLimb);
  rightLowerArmLimb = new Limb("Right Lower Arm", 50, 0, 0, 0, 90, rightUpperArmLimb)
  
  leftShoulderLimb =  new Limb("Left Shoulder", 50, 0, 0, 180-20, 180+20, neckLimb);
}

function draw() {
  background(255);
  
  if (mouseIsPressed) {
    neckLimb.startJointX = mouseX;
    neckLimb.startJointY = mouseY;
  }
  
  neckLimb.draw();
  headLimb.draw();
  torsoLimb.draw();
  rightShoulderLimb.draw();
  leftShoulderLimb.draw();
  rightUpperArmLimb.draw();
  rightLowerArmLimb.draw();
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
                    _startJointMinDegrees, _startJointMaxDegrees, _limbEndJointStartJoint) 
{
  this.label = _label;
  this.limbLength = _length; // In pixels, angled off startJoint
  this.limbEndJointStartJoint = _limbEndJointStartJoint;
  this.startJointX = _startJointX;
  this.startJointY = _startJointY;
  this.startJointMinDegrees = _startJointMinDegrees;
  this.startJointMaxDegrees = _startJointMaxDegrees;
  
  this.update((this.startJointMinDegrees + this.startJointMaxDegrees)/2);
}

Limb.prototype.update = function(_currentDegrees) {
  if (typeof _currentDegrees != "undefined") {
    this.currentDegrees = _currentDegrees;
  }

  if (typeof this.limbEndJointStartJoint !== 'undefined' || this.limbEndJointStartJoint != null) {
    this.startJointX = this.limbEndJointStartJoint.endJointX;
    this.startJointY = this.limbEndJointStartJoint.endJointY;
  }

  this.endJointX = this.startJointX + cos(radians(this.currentDegrees)) * this.limbLength;
  this.endJointY = this.startJointY + sin(radians(this.currentDegrees)) * this.limbLength;  

}

Limb.prototype.draw = function() {
  this.update();
  
  //print("line("+this.startJointX+", "+this.startJointY+", "+this.endJointX+", "+this.endJointY+")");
  stroke(0);
  fill(0,255,0);
  ellipse(this.startJointX, this.startJointY, 10, 10);
  line(this.startJointX, this.startJointY, this.endJointX, this.endJointY);  
  fill(255,0,0);
  ellipse(this.endJointX, this.endJointY, 10, 10);
  text(this.label, this.endJointX, this.endJointY+10);
}