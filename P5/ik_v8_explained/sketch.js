var armLength = 200;

function setup() {
createCanvas(800, 800);


}

function draw() {
  background(255);

  bicep = new drawLink(200, 200, 'A'); 
  forearm = new drawLink(mouseX, mouseY, 'B'); 
  forearm.linkStart(bicep); 
  bicep.linkEnd(forearm);
}



function drawLink(x, y, l) {
  this.x = x;
  this.y = y;
  this.l = l;
  this.elbowX;
  this.elbowY;
}

drawLink.prototype.display = function() {
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
  // fill(255,0,0);
  // textSize(14);
  // text('shoulder',this.x-20,this.y+18)
}

function dJoints(shoulder, wrist) { 
  //draw a green line just to show it
  stroke(0, 255, 0);
  strokeWeight(.5);
  line(shoulder.x, shoulder.y, wrist.x, wrist.y);
  //find dist from pt A to B
  return dist(shoulder.x, shoulder.y, wrist.x, wrist.y);

}

drawLink.prototype.linkStart = function(wrist) {
  var distance = dJoints(this, wrist);
  console.log("distance of joints" + dJoints(forearm, wrist))

  var a = (Math.pow(armLength, 2) - Math.pow(armLength, 2) + Math.pow(distance, 2) / (2 * distance));
  var h = Math.sqrt(Math.pow(armLength, 2) - Math.pow(a, 2));
  console.log("LINK START| a:  " + a + " || " + "h:  " + h);
  
  //Now that we have (a) and (h) we can work out the coordinates of point P:
  var px = this.x + a * (wrist.x - this.x) / distance;
  var py = this.y + a * (wrist.y - this.y) / distance;
  
  fill(0);
  noStroke();
  text('P', px, py-6);
  ellipse(px,py,5,5);

  this.elbowX = px + h * (wrist.y - this.y) / distance;
  this.elbowY = py - h * (wrist.x - this.x) / distance;

  this.display();
}

drawLink.prototype.linkEnd = function(wrist) {
  var dist = -dJoints(this, wrist);
  var a = (Math.pow(armLength, 2) - Math.pow(armLength, 2) + Math.pow(dist, 2) / (2 * dist));
  var h = Math.sqrt(Math.pow(armLength, 2) - Math.pow(a, 2));
  console.log("LINK END| a:  " + a + " || " + "h:  " + h);


  var px = this.x + a * (wrist.x - this.x) / dist;
  var py = this.y + a * (wrist.y - this.y) / dist;

  this.elbowX = px + h * (wrist.y - this.y) / dist;
  this.elbowY = py - h * (wrist.x - this.x) / dist;
  //draw a circle at the elbow
  fill(0, 0, 255);//blue
  ellipse(this.elbowX, this.elbowY, 25, 25);
  noStroke();
  textSize(22);
  text('C', this.elbowX - 15, this.elbowY - 15)
    textSize(12);
  text('elbow', this.elbowX - 30, this.elbowY -35)

  this.display();
}