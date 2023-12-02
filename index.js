const arrowLen = 1,
  numFlowPts = 5,
  colors = [7, 45, 70],
  canvW = 1900, // W = x
  canvH = 600; // H = y

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
  drawCurves(1000);
  // drawCurves(500);
  // drawCurves(25);
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
      100 / weight ** 1.5
    );
    gravVec.add(weightedVec);
  });
  return gravVec;
}

function addFlowPoints(n) {
  const points = [
    // [525.5938475106399, 569.2901246681279],
    // [1243.6964113451947, 466.51327173388273],
    // [1550.6474882391517, 239.39441861039361],
    [-60, 200],
    [1234, -70],
    [1960, 600],
  ];
  points.forEach((pt) => {
    const newPt = createVector(
      pt[0] + random(-50, 50),
      pt[1] + random(-50, 50)
    );
    flowPoints.push(newPt);
  });

  // for (let i = 0; i < n; i += 1) {
  //   const newPt = createVector(random(canvW), random(canvH));
  //   flowPoints.push(newPt);
  // }
}

function drawCurve(x, y, len, angle) {
  const tsteps = len * 10;
  let flow, x_t, y_t, dx, dy;
  // half = tsteps / 2;
  push();

  stroke(getColor(x, y));
  strokeWeight(0.5);
  fill(0);

  // drawPoint(x, y);
  x_t = x;
  y_t = y;
  for (let i = 1; i < tsteps; i += 1) {
    // strokeWeight((tsteps - abs(tsteps - i * 2)) ** 0.1 - 1);
    flow = getFlowVec(x_t, y_t).mult(0.1);
    dx = flow.x;
    dy = flow.y;
    line(x_t, y_t, x_t + dx, y_t + dy);
    x_t += dx;
    y_t += dy;
  }

  x_t = x;
  y_t = y;
  for (let i = 1; i < tsteps; i += 1) {
    flow = getFlowVec(x_t, y_t).mult(0.1);
    dx = flow.x;
    dy = flow.y;
    line(x_t, y_t, x_t - dx, y_t - dy);
    x_t -= dx;
    y_t -= dy;
  }

  pop();
}

function drawCurves(n) {
  for (let i = 0; i < n; i += 1) {
    const len = random(-20, 20),
      x = random(canvW),
      y = random(canvH);

    drawCurve(x, y, len + 808);
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
    return color(res, 40, 90);g
  } else {
    res = random(colors[2], colors[2] + 3);
    return color(res, 50, 90);
  }
}


/*
ideas:
jelly fish biolumniscent
squid
candles
ion enginees
clouds
ice algae

leafs
birds
water color
thunder
grain
flames
stars

night vision, different computer vision

*/

