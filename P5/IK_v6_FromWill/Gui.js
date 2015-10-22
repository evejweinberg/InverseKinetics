function Gui() {
  this.setup = function() {
      // sliderBlength = createSlider(20, 300, 80);
      // sliderBlength.position(10, 100);
      bButton = createButton("control B");
      bButton.position(10, 300);
      aButton = createButton("control A");
      aButton.position(10, 330);
      dButton = createButton("control D");
      dButton.position(10, 330);
      // aButton.addClass("button");


      aButton.mouseClicked(toggleA); //when A is hit call this function
      bButton.mouseClicked(toggleB); //when B is hit call this function
      dButton.mouseClicked(toggleD); //when B is hit call this function

    }
    // this.draw = function() {
    //   aworking();
    //   bworking();
    // }
}


function toggleA() {
  // print('aToggle')
  aisOn = true;
  bisOn = false;
  disOn = false;
}

function toggleB() { //
  // print('bToggle')
  bisOn = true;
  aisOn = false;
  disOn = false;
}

function toggleD() { //
  // print('dToggle')
  bisOn = false;
  aisOn = false;
  disOn = true;
}

function bworking() {
  // print('bworking')
  if (bisOn) {
    // aisOn = false;
    if (mouseX > 0) {
      print('mouse>0')
      if (mouseIsPressed) {
        arm1.x = mouseX;
        arm1.y = mouseY;
        // print(mouseX)
      }
    }
  }
}

function dworking() {
  // print('bworking')
  if (disOn) {
    // aisOn = false;
    if (mouseX > 0) {
      print('mouse>0')
      if (mouseIsPressed) {
        arm4.x = mouseX;
        arm4.y = mouseY;
        // print(mouseX)
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
        // a.length = dist(a.x, a.y, b.x, b.y);
      }
    }
  }
}