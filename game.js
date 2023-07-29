//**********************************************************************
// This file includes functions to:
// draw 60 seconds countdown, number of lives left,
// number of boxes left, "game over", and "game won" text
//**********************************************************************

// calculate 60 seconds after game start time (in seconds)
function setCountdown() {
  var secs = new Date().getTime() / 1000;
  maxSecs = secs + 60;
}

// draws a countdown timer that counts down from 60 seconds
function drawCountdown() {
  // calculate current time in seconds
  var nowSecs = new Date().getTime() / 1000;

  // calculate seconds left
  var count = Math.floor(maxSecs - nowSecs);

  textAlign(CENTER, LEFT);

  // if there is still time left
  if (count > 0) {
    // draw a rect to contain countdown text
    strokeWeight(2);
    stroke(115, 42, 199);
    rectMode(CENTER);
    rect(width / 2, 30, 220, 35, 15);
    noStroke();

    push();
    // red text for 5s and below
    if (count <= 5) fill(255, 0, 0);
    else fill(0);

    textSize(22);
    translate(width / 2 - 15, -2);
    text('Time Left: ' + count + 's', 15, 40);
    pop();
  }

  // display gameover message when countdown reaches 0s
  if (count <= 0) drawGameOver();
}

// draws the number of lives left as heart shapes
function drawLives() {
  if (lives >= 0) {
    for (var i = lives; i > 0; i--) {
      push();
      var x = -i * 30 + (width / 3 + 50);
      var y = 24;

      // draw red heart
      fill(200, 0, 0);
      strokeWeight(1);
      stroke(255, 196, 206);

      beginShape();
      vertex(x, y); // first anchor point

      // draw left half of heart
      bezierVertex(x - 10, y - 10, x - 20, (y - 10) * 2, x, y + 20);

      // draw right half of heart
      bezierVertex(x + 20, y, x + 5, y - 8, x, y);
      endShape(CLOSE);
      pop();
    }
  } else drawGameOver();
}

// draws the number of boxes left
function drawBoxesCount() {
  // display boxes count
  if (boxes.length > 0) {
    push();
    fill(255);
    textSize(22);
    text(boxes.length + ' boxes left', width / 2 + 195, 38);
    pop();
  }

  // show win message when boxes count is 0
  else drawWinText();
}

// draws the game over text
function drawGameOver() {
  noLoop();
  textAlign(CENTER, LEFT);
  textSize(70);
  textFont('Georgia');
  fill(199, 217, 60);
  text('G A M E\nO V E R', width / 2, height / 3);

  textSize(25);
  fill(242, 229, 215);
  text('Better luck next time!', width / 2, height / 2 + 80);
}

// draws "you won" text
function drawWinText() {
  noLoop();
  textAlign(CENTER);
  textSize(70);
  textFont('Georgia');
  fill(199, 217, 60);
  text('Y O U\n W O N !', width / 2, height / 2 - 50);
}

// draws the eyebrows, beak and eyes of angrybird
function drawAngryBird() {
  birdX = slingshotBird.vertices[0].x;
  birdY = slingshotBird.vertices[0].y;

  fill(0);

  // draw right eye
  push();
  fill(255);
  stroke(0);
  translate(birdX - 15, birdY - 5);
  ellipse(0, 0, 10);
  pop();

  // draw right eyebrow
  push();
  translate(birdX - 15, birdY - 15);
  rotate(radians(55));
  rect(0, 0, 6, 15);
  pop();

  // draw left eye
  push();
  fill(255);
  stroke(0);
  translate(birdX - 25, birdY - 5);
  ellipse(0, 0, 10);
  pop();

  // draw left eyebrow
  push();
  translate(birdX - 30, birdY - 15);
  rotate(radians(-55));
  rect(0, 0, 6, 15);
  pop();

  // draw yellow triangle beak
  stroke(0);
  fill(255, 166, 46);
  triangle(birdX - 20, birdY, birdX - 20, birdY + 15, birdX + 5, birdY + 5);

  noStroke();
  pop();
}
