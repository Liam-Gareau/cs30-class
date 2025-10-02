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
let c = 0;
let direction = " ";
let r = 0;
let g = 0;
let b = 0;


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
      fill(r,g,b);
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
    r += 10;
    g += 20;
    b += 30;
  }
  else if (direction === "▼"){
    r -= 30;
    g -= 10;
    b -= 20;
  }
}