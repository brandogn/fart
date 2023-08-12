const arrowLen = 1,
  numFlowPts = 4,
  canvW = 950, // W = x
  canvH = 950, // H = y
  rows = 50,
  cols = 50;

const flowPoints = [];

function setup() {
  createCanvas(canvW, canvH);
  noLoop();
}

function draw() {
  background(250);

  addFlowPoints(numFlowPts);
  drawFlowPoints();
  // drawFlowGrid();
  drawCurves(100)
}

function drawFlow(x, y) {
  const flow = getFlowVec(x, y);
  drawLine(x, y, flow.x, flow.y);
}

function drawLine(x, y, dx, dy) {
  push();
  translate(x, y);

  // noStroke();
  // fill(125);
  // ellipse(0, 0, 2, 2);

  stroke(150);
  strokeWeight(2);
  fill(0);

  //   line(-dx, -dy, dx, dy);
  line(0, 0, dx, dy);

  pop();
}

function getFlowVec(x, y) {
  //   const angle = map(noise(x * 0.1, y * 0.1), 0, 1, 0, TWO_PI);
  //   const angle = (x / (canvW * 1.9)) * PI;
  // const noise_val = noise(x * 0.001, y * 0.001),
  //   angle = map(noise_val, 0, 1, 0, PI * 2);

  // return p5.Vector.fromAngle(angle).mult(arrowLen);
  return calcGravity(x, y).rotate(HALF_PI);
}

function drawFlowGrid() {
  const stepX = canvW / (rows + 1);
  const stepY = canvH / (cols + 1);
  for (let x = stepX; x < canvW - 1; x += stepX) {
    for (let y = stepX; y < canvW - 1; y += stepX) {
      drawFlow(x, y);
    }
  }
}

function addFlowPoints(n) {
  for (let i = 0; i < n; i += 1) {
    const newPt = createVector(random(canvW), random(canvH));
    flowPoints.push(newPt);
  }
}

function drawFlowPoints() {
  flowPoints.forEach((flowpt) => {
    drawLine(flowpt.x, flowpt.y, 0, 0);
  });
}

function calcGravity(x, y) {
  const gravVec = createVector(0, 0);
  flowPoints.forEach((flowpt) => {
    // gravity = distance * (vector between the two points)
    const weight = dist(x, y, flowpt.x, flowpt.y);
    const weightedVec = createVector(flowpt.x - x, flowpt.y - y).mult(
      (100 * arrowLen) / weight ** 1.5
    );
    gravVec.add(weightedVec);
  });
  return gravVec;
}

function drawCurve(x, y, len) {
  for (let i = 0; i < len * 50; i += 1) {
    const flow = getFlowVec(x, y).mult(0.1),
      dx = flow.x,
      dy = flow.y;
    drawLine(x, y, dx, dy);
    x += dx;
    y += dy;
  }
}

function drawCurves(n) {
  for (let i = 0; i < n; i += 1) {
    drawCurve(random(canvW), random(canvH),random(10,20))
  }
}
