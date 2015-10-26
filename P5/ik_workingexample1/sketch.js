var arm1;
var arm2;
var armLength;
var hingeX;
var hingeY;

function setup(){
	createCanvas(500,500);
	background(0);
	stroke(255);
	strokeWeight(5);
	
	armLength = 200;
	arm1 = new drawArm(100,150);
	arm2 = new drawArm(300,300);
}
function draw(){
	background(0);
	var dist = dJoints(arm1,arm2);
	var a = (Math.pow(armLength,2)-Math.pow(armLength,2)+Math.pow(dist,2)/(2*dist));
//	var a = Math.sqrt((Math.pow(armLength,2)-Math.pow(armLength,2)+Math.pow(dist,2))/2)
	var h = Math.sqrt(Math.pow(armLength,2)-Math.pow(a,2));

	var px = arm1.x+a*(arm2.x-arm1.x)/dist;
	var py = arm1.y+a*(arm2.y-arm1.y)/dist;

	hingeX = px+h*(arm2.y-arm1.y)/dist;
	hingeY = py-h*(arm2.x-arm1.x)/dist;
	
	arm1.display();
	arm2.display();

	arm1.x+=Math.sin(frameCount/20)*5;
	arm1.y+=Math.cos(frameCount/20)*5;
}

function drawArm(x, y){
	this.x = x;
	this.y = y;
}

drawArm.prototype.display = function(){
	rect(this.x,this.y,20,20);
	line(this.x+10,this.y+10,hingeX,hingeY);
}

function dJoints(armA,armB){
	return dist(armA.x,armA.y,armB.x,armB.y);
}
