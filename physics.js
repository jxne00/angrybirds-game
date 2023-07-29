function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true,
    angle: 0,
  });
  World.add(engine.world, [ground]);
}

function drawGround() {
  push();
  fill(0, 154, 23);
  drawVertices(ground.vertices);
  pop();
}

function setupPropeller() {
  // setup static body of type rectangle
  options = { isStatic: true, angle: angle };
  propeller = Bodies.rectangle(150, 480, 200, 15, options);
  World.add(engine.world, [propeller]);
}

// updates and draws the propeller
function drawPropeller() {
  push();

  // set the angle and angular velocity of the propeller
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed; // update angle by angleSpeed

  // draw the propeller
  fill(226, 187, 123);
  drawVertices(propeller.vertices);
  pop();
}

function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95,
  });
  Matter.Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}

function drawBirds() {
  push();
  // loop over birds array and draw birds
  for (var i = 0; i < birds.length; i++) {
    fill(255, 0, 0);
    drawVertices(birds[i].vertices);

    // remove bird from world and array if it leaves the screen
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]); // remove from world
      birds.splice(i, 1); // remove from array
      i--;
    }
  }
  pop();
}

// creates a tower of boxes
function setupTower() {
  // create a tower of 80x80 pixels boxes that is 6 boxes high 3 boxes wide
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
      var size = 80;

      var x = width - size - i * size;
      var y = height - size - j * size;
      var box = Bodies.rectangle(x, y, size, size);

      World.add(engine.world, [box]);
      boxes.push(box);

      // use a range of random colors for the boxes
      var randCol = color(random(10, 160), random(10, 110), random(10, 130));
      colors.push(randCol);
    }
  }
}

// draws tower of boxes
function drawTower() {
  push();
  // loop over boxes array and draw each box using colors from colors array
  for (var i = 0; i < boxes.length; i++) {
    stroke(0);
    strokeWeight(2);
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
    noStroke();

    // remove box from world and array if it leaves the screen
    if (isOffScreen(boxes[i])) {
      removeFromWorld(boxes[i]);
      boxes.splice(i, 1);
      colors.splice(i, 1);
      i--;
    }
  }
  pop();
}

function setupSlingshot() {
  // set up slingshotBird as a body of type circle, set constraint and add to world
  var options = { friction: 0, restitution: 0.95 };
  slingshotBird = Bodies.circle(180, 180, 20, options);

  // set mass as 10x of original mass
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

  // constraint
  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 200 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.0001,
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}

// draws slingshot bird and its constraint
function drawSlingshot() {
  push();
  // draw slingshot bird and slingshot constraint
  stroke(211, 211, 211);
  strokeWeight(1);
  fill(255, 0, 0);
  drawVertices(slingshotBird.vertices); // draw slingshot bird
  drawConstraint(slingshotConstraint); // draw slingshot constraint

  // draw the parts of angry bird
  drawAngryBird();
}

function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 },
  };
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
