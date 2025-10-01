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
let r = 50/2;
let c = 0;


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
  if (timer <= 60){
    if (frameCount % 60 === 0){
      clear();
      randomXandY();
      fill(c);
      circle(x,y,50);
      timer++;
    }
  }
  else{
    clear();
    text(points,width/2,height/2);
  }
}

function randomXandY(){
  x = random(width);
  y = random(height);
}

function mouseClicked() {
  if (mouseX < x + r && mouseX > x - r && mouseY < y + r && mouseY > y - r){
    points++;
  }
}

function changeColor(){
  if (mouseWheel() > 0){
    c++;
  }
  else if (mouseWheel() < 0){
    c--;
  }
}