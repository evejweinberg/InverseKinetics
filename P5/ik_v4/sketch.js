var rad1 = 100;
var rad2 = 100;
var sliderBlength, gui, bButton, aButton;
var bisOn = false;
var aisOn = false;

var a = { //starting positions
  x: 100,
  y: 100,
  length: 100
};

var b = {
  x: 300,
  y: 100,
  length: 100
}

var c = {
  x: 500,
  y: 400
};



function setup() {
  var canvas = createCanvas(800, 800);
  canvas.position(200, 100); 
  noFill();
  stroke(0);
  rect(0, 0, 798, 798);


  gui = new Gui();
  gui.setup();

}

function draw() {
  background(255);
  noFill();
  stroke(0);
  rect(0, 0, 798, 798);
  // gui.draw();

  stroke(0);
  text("B", b.x, b.y);
  text("A", a.x, a.y);
  text("C", c.x, c.y);
  if (mouseIsPressed) {
    c.x = mouseX;
    c.y = mouseY;
    print(mouseX + ',' + mouseY)
  }
  


  // c = ik(a, b);
  line(a.x, a.y, b.x, b.y);
  line(c.x, c.y, b.x, b.y);


  print(a.length);
  var distance = dist(a.x, a.y, c.x, c.y);
  var fDegrees = acos((rad1 * rad1 + rad2 * rad2 - distance * distance) / (2 * rad1 * rad2)) * (180.0 / 3.1415);


}



function Gui() {
  this.setup = function() {
    // sliderBlength = createSlider(20, 300, 80);
    // sliderBlength.position(10, 100);
    bButton = createButton("control B");
    bButton.position(10, 300);

    // bButton.addClass("button");
    aButton = createButton("control A");
    aButton.position(10, 330);
    // aButton.addClass("button");


    // aButton.mouseClicked(toggleA); //when A is hit call this function
    // bButton.mouseClicked(toggleB); //when B is hit call this function
  }
  this.draw = function() {
    aworking();
    bworking();
  }
}


function toggleA() {
  aisOn = true;
  bisOn = false;
}

function toggleB() { //
  bisOn = true;
  aisOn = false;
}

function bworking() {
  if (bisOn) {
    aisOn = false;
    if (mouseX > 0) {
      if (mouseIsPressed) {
        b.x = mouseX;
        b.y = mouseY;
        print(mouseX)
      }
    }
  }
}

function aworking() {
  if (aisOn) {
    bisOn = false
    if (mouseX > 0) {
      if (mouseIsPressed) {
        a.x = mouseX;
        a.y = mouseY;
        a.length = dist(a.x, a.y, b.x, b.y);
      }
    }
  }
}