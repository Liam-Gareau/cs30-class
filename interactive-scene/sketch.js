// Interactive Scene
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let timer = 0;
let points = 0;
let button = false;
let x = width;
let y = height;
let r = 50/2;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //background(220);
  drawCircle();
  countTime();
  countPoints();
}

function drawCircle(){
  if (timer <= 60){
    if (frameCount % 60 === 0){
      clear();
      circle(random(x),random(y),50);
    }
  }
}

function countTime(){
  if (frameCount % 60 === 0 && timer > 0){
    timer++;
  }
}

function countPoints(){
  if (mouseX < x + r && mouseX > x - r && mouseY < y + r && mouseY > y - r && mouseIsPressed){
    points++;
  }
}