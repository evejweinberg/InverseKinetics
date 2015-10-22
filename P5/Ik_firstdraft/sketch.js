
			var blength = 280;
			var sliderBlength, gui, bButton, aButton;
			var bisOn = false;
			var aisOn = false;

			var a = {
			  x: 200,
			  y: 100,
			  length: 100
			};

			var b = {
			  x: 300,
			  y: 200,
			  length: 100
			}

			var c = {};

			function setup() {
			  background(0);
			  var canvas = createCanvas(windowWidth, windowHeight);
			  canvas.position(200,100);
			  gui = new Gui();
			  gui.setup();

			}

			function draw() {
			  background(255);
			  gui.draw();

			  stroke(128);
			 //blength = (a.length)
			  text("B", b.x, b.y);
			  text("A", a.x, a.y);
			  text("C", c.x, c.y);


			  c = ik(a, b);
			  line(a.x, a.y, c.x, c.y);
			  line(c.x, c.y, b.x, b.y);
			  //line(a.x, a.y, b.x, b.y);


			  if (a.y < c.y) {
			    c.y = lerp(a.y, c.y, .5);
			  }


			}

			function ik(o, t) {
			  /*
 var dx = o.x-t.x;
 var dy = o.y-t.y;
 var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

 var angle = (Math.pow(o.length,2)-Math.pow(t.length,2) +
Math.pow(dist,2)) / (2 * dist);
 var h = Math.sqrt(Math.pow(o.length,2)-Math.pow(angle,2));

 var returnx = o.x + a * (t.x-o.x) / dist;
 var returny = o.y + a * (t.y-o.y) / dist;

 var X = returnx + h * (t.y-o.y) / dist;
 var Y = returny-h * (t.x-o.x) / dist;
 println(X + " " + Y);
 return {x: X, y: Y};
 */

			  var angle = Math.atan2(o.y - t.y, o.x - t.x);
			  var x = t.x + Math.cos(angle) * t.length;
			  var y = t.y + Math.sin(angle) + t.length;
			  println(x + " " + y);
			  return {
			    x: x,
			    y: y
			  };

			}

			function Gui() {
			  this.setup = function() {
			   // sliderBlength = createSlider(20, 300, 80);
			   // sliderBlength.position(10, 100);
			    bButton = createButton("control B");
			    bButton.position(10, 300);

			    bButton.addClass("button");
			    aButton = createButton("control A");
			    aButton.position(10, 330);
			    aButton.addClass("button");

          // Ian's
          aButton.mouseClicked(toggleA);
			    bButton.mouseClicked(toggleB);
			  }
			  this.draw = function() {
			    //text("a length is " + a.length, 10, 10);
			    //text("b length is " + b.length, 10, 30);
			    //text("b position ", 10, 90);
			    // commented out due to 107-108
			   // aButton.mousePressed(aworking);
			   // bButton.mousePressed(bworking);
			   aworking();
			   bworking();
			  }
			}
			
      // Ian's
      function toggleA() {
        aisOn = !aisOn;
        bisOn = !bisOn;
      }
      
      function toggleB() {
        bisOn = !bisOn;
        aisOn = !aisOn;
      }

			function bworking() {
			  if (bisOn) {
			    aisOn = false;
  			  if (mouseIsPressed) {
  			    b.x = mouseX;
  			    b.y = mouseY;
  			  }
			  }
			}

			function aworking() {
			  if (aisOn) {
			    bisOn = false;
  			  if (mouseIsPressed) {
  			    a.x = mouseX;
  			    a.y = mouseY;
  			    a.length = dist(a.x, a.y, b.x, b.y);
  			  }
			  }
			}