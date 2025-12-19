// Recursion Visual Demo
// Sierpinski Triangle

let initialTriangle = [
  {x: 950, y: 50},
  {x: 50, y: 900},
  {x: 1850, y: 900},
];

let theDepth = 0;
let theColors = ["blue", "red", "green", "yellow", "orange", "teal", "purple", "maroon", "white"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  sierpinski(initialTriangle, theDepth);
}

function draw() {
  //background(220);
}

function mousePressed() {
  if (theDepth < 8) {
    theDepth++;
    background("white");
    sierpinski(initialTriangle, theDepth);
  }
}

function sierpinski(points, depth) {
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y,
    points[1].x, points[1].y,
    points[2].x, points[2].y
  );

  if (depth > 0) {
    //top triangle
    sierpinski([points[0],
      midPoint(points[0], points[1]),
      midPoint(points[0], points[2])],
    depth - 1);

    //bottom left triangle
    sierpinski([points[1],
      midPoint(points[0], points[1]),
      midPoint(points[1], points[2])],
    depth - 1);

    //bottom right triangle
    sierpinski([points[2],
      midPoint(points[0], points[2]),
      midPoint(points[1], points[2])],
    depth - 1);
  }
}

function midPoint(point1, point2) {
  let midX = (point1.x + point2.x) / 2;
  let midY = (point1.y + point2.y) / 2;
  return {x: midX, y: midY};
}