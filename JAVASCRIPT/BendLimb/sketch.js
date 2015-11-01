function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  BendLimb();
}




function BendLimb() {
  var bicep = new Link('A', 230, 600, 600, -45, 45, true);
  var forearm = new Link('B', 230, mouseX, mouseY, -95, 95, false);
  
  //i need to get these lines of code into the 'Link' constructor
  forearm.linkStart(bicep);//ref on line 59 and 82
  bicep.linkEnd(forearm);
}




function Link(label, _length, x, y, mindeg, maxdeg, endofchain, _parent) {
  this.x = x;
  this.y = y;
  this.l = label;
  this.elbowX;
  this.elbowY;
  this.length = _length;
  this.mindeg = mindeg;
  this.maxdeg = maxdeg;
  this.endofchain = true; //true means it's the static end 
  this.parent = _parent;
  
  // if (this.endofchain === true){
  // run this.linkStart()
  // your x,y becomes the 
  
  // if (typeof this.parentEnd !== 'undefined' || this.parentEnd != null) { //if it exists
  //   this.startJointX = this.parentEnd.endJointX; //start this joint at the parent's end 
  //   this.startJointY = this.parentEnd.endJointY;
  // }
  //   this.x = start
  //   this.y = start
  // } else if (this.endofchain === false){
  //run this.linkEnd()
    
  // }
  

}

function dJoints(IKend, IKlead) {
  return dist(IKend.x, IKend.y, IKlead.x, IKlead.y);
}

Link.prototype.display = function() {
  fill(255, 0, 0); //red
  noStroke();
  rect(this.x, this.y, 20, 20);
  strokeWeight(5);
  stroke(255, 0, 0)
  line(this.x, this.y, this.elbowX, this.elbowY); //draw a line from this x,y to
  //Add a letter in the box
  fill(255); //white
  textAlign(CENTER);
  textSize(22);
  noStroke();
  text(this.l, this.x + 10, this.y + 18);
}



Link.prototype.linkStart = function(IKlead) {
  var distance = dJoints(this, IKlead);
  // console.log("distance of joints" + dJoints(forearm, wrist))

  var a = (Math.pow(this.length, 2) - Math.pow(this.length, 2) + Math.pow(distance, 2) / (2 * distance));
  var h = Math.sqrt(Math.pow(this.length, 2) - Math.pow(a, 2));
  console.log("LINK START| a:  " + a + " || " + "h:  " + h);

  //Now that we have (a) and (h) we can work out the coordinates of point P:
  var px = this.x + a * (IKlead.x - this.x) / distance;
  var py = this.y + a * (IKlead.y - this.y) / distance;

  fill(0);
  noStroke();
  text('P', px, py - 6);
  ellipse(px, py, 5, 5);

  this.elbowX = px + h * (IKlead.y - this.y) / distance;
  this.elbowY = py - h * (IKlead.x - this.x) / distance;

  this.display();
}

Link.prototype.linkEnd = function(IKlead) {
  var dist = -dJoints(this, IKlead);//'this is....what?'
  var a = (Math.pow(this.length, 2) - Math.pow(this.length, 2) + Math.pow(dist, 2) / (2 * dist));
  var h = Math.sqrt(Math.pow(this.length, 2) - Math.pow(a, 2));
  console.log("LINK END| a:  " + a + " || " + "h:  " + h);


  var px = this.x + a * (IKlead.x - this.x) / dist;
  var py = this.y + a * (IKlead.y - this.y) / dist;

  this.elbowX = px + h * (IKlead.y - this.y) / dist;
  this.elbowY = py - h * (IKlead.x - this.x) / dist;
  //draw a circle at the elbow
  fill(0, 0, 255); //blue
  ellipse(this.elbowX, this.elbowY, 25, 25);
  noStroke();
  textSize(22);
  text('C', this.elbowX - 15, this.elbowY - 15)
  textSize(12);
  text('elbow', this.elbowX - 30, this.elbowY - 35)

  this.display();
}