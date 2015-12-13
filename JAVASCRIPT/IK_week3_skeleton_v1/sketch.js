//http://www.mathworks.com/help/fuzzy/examples/modeling-inverse-kinematics-in-a-robotic-arm.html?requestedDomain=www.mathworks.com
var headLimb;
var torso;
var LShoulderLimb, LUpperArmLimb, LLowerArmLimb, Lhip;
var RShoulderLimb, RUpperArmLimb, RLowerArmLimb, Rhip, Rknee;
var leftUpperLeg;
var leftLowerLeg;
var rightUpperLeg;
var rightLowerLeg;
var body = [];
var globalspeed = 1;
var BodycenterX = 100;
var BodycenterY = 600;
var hipWidth = 40;
var rotationspeed = 1;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //_label, _length, _startJointX, _startJointY,
  //_startJointMinDegrees, _startJointMaxDegrees, _parentEnd
  torso = new StLimb("Torso", 0, BodycenterX, BodycenterY, -90, -90, -90);
  neckLimb = new StLimb("Neck", 100, 0, 0, 0, 0, 0, torso); //leader of everything
  headLimb = new StLimb("Head", 50, 0, 0, 0, 0, 0, neckLimb);

  RShoulderLimb = new StLimb("R \nShoulder", hipWidth, 0, 0, 90, 90, 90, neckLimb);
  LShoulderLimb = new StLimb("L \nShoulder", hipWidth, 0, 0, -90, -90, -90, neckLimb);
  RUpperArmLimb = new StLimb("R\n Upper Arm", 50, 0, 0, -90, 90, 0, RShoulderLimb);
  LUpperArmLimb = new StLimb("L \nUpper Arm", 50, 0, 0, 90, 270, 180, LShoulderLimb);

  RLowerArmLimb = new StLimb("R \nLower Arm", 50, 0, 0, 90, -90, 0, RUpperArmLimb);
  LLowerArmLimb = new StLimb("L \nLower Arm", 50, 10, 0, -10, 0,0, LUpperArmLimb);
  
  Lhip = new StLimb('L hip', hipWidth, 0, 0, -90, -50, -90, torso);
  Rhip = new StLimb('R hip', hipWidth, 0, 0, 50, 100, 90, torso);
  Lshin = new StLimb('L knee', 70, 0, 0, -90, 0, -90, Lhip);
  Rknee = new StLimb('R knee', 70, 0, 0, -20, 70, -180, Rhip);

  // body.push([neckLimb, headLimb,torso,RShoulderLimb,LShoulderLimb,LUpperArmLimb,LLowerArmLimb,Lthight,Rthight,Lshin,Rshin]);
  // console.log(body)
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    LLowerArmLimb.move();
    RLowerArmLimb.move();
    RUpperArmLimb.move();
    LUpperArmLimb.move();
    // Rthight.move();
    Lhip.move();
    Rhip.move();
    Rknee.move();
    Lshin.move();
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
  Lhip.draw();
  Rhip.draw();
  Lshin.draw();
  Rknee.draw();
}


// Construct a static limb, it will be the length staring at the start joing position, 
//towards the end joint position, not to exceed the min and max degree parameters
var StLimb = function(_label, _length, _startJointX, _startJointY,
  _startJointMinDegrees, _startJointMaxDegrees, _startingPossition, _parentEnd) {

  this.relativeDegrees = _startingPossition; //start at a halfway pt

  this.label = _label;
  this.limbLength = _length; // In pixels, angled off startJoint
  this.parentEnd = _parentEnd;
  this.startJointX = _startJointX;
  this.startJointY = _startJointY;
  this.startJointMinDegrees = _startJointMinDegrees;
  this.startJointMaxDegrees = _startJointMaxDegrees;
  this.speed = 1;
  if (this.parentEnd != undefined) { //if you have a parent
    this.currentDegrees = this.parentEnd.currentDegrees + this.relativeDegrees; //
    console.log("parent" + this.parentEnd.currentDegrees);
  } else {
    this.currentDegrees = this.relativeDegrees;
  }




  this.update(this.startJointMinDegrees); //current degree is min+max /2


};

StLimb.prototype.move = function(_x, _y) {
  //console.log(this.label + this.speed);

  this.update(this.relativeDegrees + rotationspeed * this.speed);
  if (this.relativeDegrees < this.startJointMinDegrees || this.relativeDegrees > this.startJointMaxDegrees) {
    this.speed = -1 * this.speed;
  }
  console.log(this.relativeDegrees);
  if (this.parentEnd != null) {
    this.currentDegrees = this.parentEnd.currentDegrees + this.relativeDegrees;
  } else {
    this.currentDegrees = this.relativeDegrees;
  }
  // console.log(abs(this.currentDegrees-this.startJointMinDegrees))
  //clamp the degree of rotation here?
};

StLimb.prototype.update = function(_currentDegrees) {
  if (typeof _currentDegrees != "undefined") {
    this.relativeDegrees = _currentDegrees;
  }

  if (typeof this.parentEnd !== 'undefined' || this.parentEnd != null) { //if it exists
    this.startJointX = this.parentEnd.endJointX; //start this joint at the parent's end 
    this.startJointY = this.parentEnd.endJointY;

    // this.endJointX = this.startJointX + cos(this.currentDegrees) * this.limbLength;
    // this.endJointY = this.startJointY + sin(this.currentDegrees) * this.limbLength;
  }

  if (this.parentEnd != null) {
    this.currentDegrees = this.parentEnd.currentDegrees + this.relativeDegrees;
  } else {
    this.currentDegrees = this.relativeDegrees;
  }


  this.endJointX = this.startJointX + cos((this.currentDegrees)) * this.limbLength;
  this.endJointY = this.startJointY + sin((this.currentDegrees)) * this.limbLength;


  //dont go beyond min and max
  if (this.relativeDegrees < this.startJointMinDegrees) {
    this.relativeDegrees = this.relativeDegrees;
  }
  if (this.relativeDegrees > this.startJointMaxDegrees) {
    this.relativeDegrees = this.relativeDegrees;
  }

};

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

  this.update((this.startJointMinDegrees + this.startJointMaxDegrees) / 2); //start at this degree


}

BendLimb.prototype.dJoints = function(leaderPt) { //distance from parent to IKlead
  return dist(this.startJointX, this.startJointX, leaderPt.x, leaderPt.y);
}

BendLimb.prototype.update = function(_currentDegrees) {
  if (typeof _currentDegrees != "undefined") {
    this.currentDegrees = _currentDegrees;
  }

  if (typeof this.parentEnd !== 'undefined' || this.parentEnd != null) { //if it exists
    this.startJointX = this.parentEnd.endJointX; //start this joint at the parent's end 
    this.startJointY = this.parentEnd.endJointY;
  }

  // this.endJointX = this.startJointX + cos(radians(this.currentDegrees)) * this.limbLength;
  // this.endJointY = this.startJointY + sin(radians(this.currentDegrees)) * this.limbLength;

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
  fill(255, 0, 0); //red
  noStroke();
  rect(this.x, this.y, 20, 20);
  strokeWeight(5);
  stroke(0);
  line(this.startJointX, this.startJointY, this.elbowX, this.elbowY); //draw a line from this x,y to
  // noStroke();
  // text(this.label, this.endJointX, this.endJointY + 10);
  // this.linkStart(this.parentEnd);//add limbstart here?
}


BendLimb.prototype.linkStart = function(leaderPt) { //where do I call this?
  var distance = dJoints(this, leaderPt); //itself to what you pass it later. Where do I pass this?

  var a = (Math.pow(this.limbLength, 2) - Math.pow(this.limbLength, 2) + Math.pow(distance, 2) / (2 * distance));
  var h = Math.sqrt(Math.pow(this.limbLength, 2) - Math.pow(a, 2));


  var px = this.startJointX + a * (leaderPt.x - this.startJointX) / distance;
  var py = this.startJointY + a * (leaderPt.y - this.startJointY) / distance;

  this.elbowX = px + h * (leaderPt.y - this.startJointY) / distance;
  this.elbowY = py - h * (leaderPt.x - this.startJointX) / distance;


}

BendLimb.prototype.linkEnd = function(leaderPt) { //where do I call this?
  var distance = -dJoints(this, leaderPt); //itself to what you pass it later. Where do I pass this?

  var a = (Math.pow(this.limbLength, 2) - Math.pow(this.limbLength, 2) + Math.pow(distance, 2) / (2 * distance));
  var h = Math.sqrt(Math.pow(this.limbLength, 2) - Math.pow(a, 2));


  var px = this.startJointX + a * (leaderPt.x - this.startJointX) / distance;
  var py = this.startJointY + a * (leaderPt.y - this.startJointY) / distance;

  this.elbowX = px + h * (leaderPt.y - this.startJointY) / distance;
  this.elbowY = py - h * (leaderPt.x - this.startJointX) / distance;

  // this.draw();//can I just call this here?
}