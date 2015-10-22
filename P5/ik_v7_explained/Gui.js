function Gui() {
  this.setup = function() {
    bButton = createButton("control B");
    bButton.position(10, 300);
    dButton = createButton("control D");
    dButton.position(10, 330);
    bButton.mouseClicked(this.toggleB); //when B is hit call this function
    dButton.mouseClicked(this.toggleD); //when B is hit call this function

  }
  this.toggleB = function() {
    bisOn = true;
    aisOn = false;
    disOn = false;
  }
  this.toggleD = function() { //
    bisOn = false;
    aisOn = false;
    disOn = true;
  }


  this.togglesworking = function() {
    if (bisOn) {
      if (mouseX > 0) {
        if (mouseIsPressed) {
          arm1.x = mouseX;
          arm1.y = mouseY;
        }
      }
    }

    if (disOn) {
      if (mouseX > 0) {
        if (mouseIsPressed) {
          arm4.x = mouseX;
          arm4.y = mouseY;
        }
      }
    }
  }

}