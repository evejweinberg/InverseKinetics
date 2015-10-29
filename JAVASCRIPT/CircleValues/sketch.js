function showValues() {
  var r = 60
  fill(255, 0, 0);
  for (var i = 0; i < 360; i++) {
    ellipse(cos(i) * r + width / 2, sin(i) * r + width / 2, 5, 5);
  }

}