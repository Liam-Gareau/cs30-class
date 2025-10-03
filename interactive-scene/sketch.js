// Interactive Scene Project
// Liam Gareau
// Oct 3 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let timer = 0;
let points = 0;
let x;
let y;
let radius = 50/2;
let direction = " ";
let colors = ["red","orange","yellow","green","blue","purple"];
let colorIndex = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //background(220);
  textSize(12);
  drawCircle();
  changeColor();
}

function drawCircle(){
  for (let t = timer; t <= 60; t++){
    if (frameCount % 60 === 0){
      clear();
      randomXandY();
      fill(colors[colorIndex]);
      circle(x,y,50);
      timer++;
    }
    return;
  }
  if (timer > 60) {
    clear();
    text(points, width / 2, height / 2);
  }
}

function randomXandY(){
  x = random(width);
  y = random(height);
}

function mouseClicked() {
  if (mouseX < x + radius && mouseX > x - radius && mouseY < y + radius && mouseY > y - radius){
    points++;
  }
}

function mouseWheel(event){
  if (event.delta > 0) {
    direction = '▲';
  } 
  else {
    direction = '▼';
  }
}

function changeColor(){
  if (direction === "▲"){
    colorIndex = (colorIndex + 1) % colors.length;
  }
  else if (direction === "▼"){
    colorIndex = (colorIndex - 1 + colors.length) % colors.length;
  }
}