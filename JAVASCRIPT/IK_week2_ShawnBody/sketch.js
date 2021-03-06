var headLimb;
var torso;
var LShoulderLimb, LUpperArmLimb, LLowerArmLimb;
var RShoulderLimb, RUpperArmLimb, RLowerArmLimb;
var leftUpperLeg;
var leftLowerLeg;
var rightUpperLeg;
var rightLowerLeg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //_label, _length, _startJointX, _startJointY, _startJointMinDegrees, _startJointMaxDegrees, _limbEndJointStartJoint
  neckLimb = new StLimb("Neck", 0, 40, 100, 90, 90);
  headLimb = new StLimb("Head", 50, 40, 100, 200, 340, neckLimb);
  torso = new StLimb("Torso", 100, 100, 100, 90, 90, neckLimb);
  RShoulderLimb = new StLimb("R \nShoulder", 50, 0, 0, -20, 20, neckLimb);
  RUpperArmLimb = new StLimb("R\n Upper Arm", 50, 0, 0, -180, 180, RShoulderLimb);
  RLowerArmLimb = new BendLimb("R \nLower Arm", 50, 0, 0, 0, 90, RUpperArmLimb);
  LShoulderLimb = new BendLimb("L \nShoulder", 50, 0, 0, 180 - 20, 180 + 20, neckLimb);
  LUpperArmLimb = new BendLimb("L \nUpper Arm", -50, 10, 0, -10, 90, LShoulderLimb);
  LLowerArmLimb = new BendLimb("L \nLower Arm", -50, 10, 0, -10, 90, LUpperArmLimb);
  Lthight = new BendLimb('L thigh', -70, 20, -40, -20, 0, torso);
  Rthight = new BendLimb('R thigh', 70, 20, -40, -20, 0, torso);
  Lshin = new BendLimb('L knee', -70, 20, -40, -20, 0, Lthight);
  Rshin = new BendLimb('R knee', 70, 20, -40, -20, 0, Rthight);
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
  RShoulderLimb.draw();
  LShoulderLimb.draw();
  RUpperArmLimb.draw();
  RLowerArmLimb.draw();
  LUpperArmLimb.draw();
  LLowerArmLimb.draw();
  Lthight.draw();
  Rthight.draw();
  Lshin.draw();
  Rshin.draw();
}


// Construct a limb, it will be the length staring at the start joing position, towards the end joint position, not to exceed the min and max degree parameters
var StLimb = function(_label, _length, _startJointX, _startJointY,
  _startJointMinDegrees, _startJointMaxDegrees, _parentEnd) {
  this.label = _label;
  this.limbLength = _length; // In pixels, angled off startJoint
  this.parentEnd = _parentEnd;
  this.startJointX = _startJointX;
  this.startJointY = _startJointY;
  this.startJointMinDegrees = _startJointMinDegrees;
  this.startJointMaxDegrees = _startJointMaxDegrees;

  this.update((this.startJointMinDegrees + this.startJointMaxDegrees) / 2);
  //start at the average
  //if reaches beyond min or max, equals min max
}

StLimb.prototype.update = function(_currentDegrees) {
  if (typeof _currentDegrees != "undefined") {
    this.currentDegrees = _currentDegrees;
  }

  if (typeof this.parentEnd !== 'undefined' || this.parentEnd != null) { //if it exists
    this.startJointX = this.parentEnd.endJointX; //start this joint at the parent's end 
    this.startJointY = this.parentEnd.endJointY;
  }

  this.endJointX = this.startJointX + cos(radians(this.currentDegrees)) * this.limbLength;
  this.endJointY = this.startJointY + sin(radians(this.currentDegrees)) * this.limbLength;

  //dont go beyond min and max
  if (this.currentDegrees < this.startJointMinDegrees) {
    this.currentDegrees = this.currentDegrees;
  }
  if (this.currentDegrees > this.startJointMaxDegrees) {
    this.currentDegrees = this.currentDegrees;
  }

}

StLimb.prototype.draw = function() {
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

//////CONSTRUCTOR OF A BEND LIMB//////////////
//////////2 BONES AND A JOINT ///////////////
// Construct a limb, it will be the length staring at the start joing position, towards the end joint position, not to exceed the min and max degree parameters
var BendLimb = function(_label, _length, _startJointX, _startJointY,
  _startJointMinDegrees, _startJointMaxDegrees, _parentEnd) {
  this.label = _label;
  this.limbLength = _length; // In pixels, angled off startJoint
  this.parentEnd = _parentEnd;
  this.startJointX = _startJointX;
  this.startJointY = _startJointY;
  this.startJointMinDegrees = _startJointMinDegrees;
  this.startJointMaxDegrees = _startJointMaxDegrees;
  this.elbowX;
  this.elbowY;

  this.update((this.startJointMinDegrees + this.startJointMaxDegrees) / 2);
  //start at the average

}

BendLimb.prototype.dJoints = function(parentEnd, leaderPt) {
  return dist(parentEnd.x, parentEnd.y, leaderPt.x, leaderPt.y);
}

BendLimb.prototype.update = function(_currentDegrees) {
  if (typeof _currentDegrees != "undefined") {
    this.currentDegrees = _currentDegrees;
  }

  if (typeof this.parentEnd !== 'undefined' || this.parentEnd != null) { //if it exists
    this.startJointX = this.parentEnd.endJointX; //start this joint at the parent's end 
    this.startJointY = this.parentEnd.endJointY;
  }

  this.endJointX = this.startJointX + cos(radians(this.currentDegrees)) * this.limbLength;
  this.endJointY = this.startJointY + sin(radians(this.currentDegrees)) * this.limbLength;

  //dont go beyond min and max
  if (this.currentDegrees < this.startJointMinDegrees) {
    this.currentDegrees = this.currentDegrees;
  }
  if (this.currentDegrees > this.startJointMaxDegrees) {
    this.currentDegrees = this.currentDegrees;
  }

}

BendLimb.prototype.draw = function() {
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