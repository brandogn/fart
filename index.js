const arrowLen = 1,
  numFlowPts = 3,
  colors = [7, 45, 70],
  canvW = 1900, // W = x
  canvH = 750; // H = y

const flowPoints = [];

function setup() {
  createCanvas(canvW, canvH);
  noLoop();
  colorMode(HSB, 100);
}

function draw() {
  background(12.22, 39, 100);

  addFlowPoints(numFlowPts);
  // drawFlowGrid();
  // drawCurves(10);
  drawCurves(500);
  // drawCurves(50000);
  saveCanvas("Img", "png");
}

function drawPoint(x, y) {
  push();

  noStroke();
  fill(getColor(x, y));
  ellipse(x, y, random(3, 7), random(3, 7));
  pop();
}

function getFlowVec(x, y) {
  return calcGravity(x, y).rotate(HALF_PI * 0.93);
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

function addFlowPoints(n) {
  for (let i = 0; i < n; i += 1) {
    const newPt = createVector(random(canvW), random(canvH));
    flowPoints.push(newPt);
  }
}

function drawCurve(x, y, len) {
  const tsteps = len * 10;
  // half = tsteps / 2;
  push();

  stroke(getColor(x, y));
  strokeWeight(0.5);
  fill(0);

  // drawPoint(x, y);
  for (let i = 1; i < tsteps; i += 1) {
    // half - abs(half - i)
    // strokeWeight(((tsteps - abs(tsteps - (i*2))) ** 0.2) - 0.7);
    const flow = getFlowVec(x, y).mult(0.1),
      dx = flow.x,
      dy = flow.y;
    line(x, y, x + dx, y + dy);
    x += dx;
    y += dy;
  }

  pop();
}

function drawCurves(n) {
  for (let i = 0; i < n; i += 1) {
    // drawCurve(random(canvW), random(canvH), random(200, 300));
    const pad = 100,
      len = random(70, 100);
    let x = random(-pad, canvW + pad),
      y = random(-pad, canvH + pad);

    // drawPoint(x,y)
    drawCurve(x, y, len + 400);

    // x = random(-pad, canvW + pad);
    // y = random(-pad, canvH + pad);
    // drawCurve(x, y, len - 50);
  }
}

function getColor(x, y) {
  const t = random(),
    n = noise(x * 0.0005, y * 0.0005);
  let res;

  if (t < randomGaussian(n)) {
    res = random(colors[0], colors[0] + 3);
    return color(res, 60, 100);
  } else if (t < randomGaussian(n)) {
    res = random(colors[1], colors[1] + 3);
    return color(res, 40, 90);
  } else {
    res = random(colors[2], colors[2] + 3);
    return color(res, 50, 90);
  }
}
