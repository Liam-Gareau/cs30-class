// Interactive Scene Project
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let timer = 50;
let points = 0;
let x;
let y;
let r = 50/2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width;
  y = height;
}

function draw() {
  //background(220);
  textSize(12);
  drawCircle();
  countPoints();
}

function drawCircle(){
  if (timer <= 60){
    if (frameCount % 60 === 0){
      clear();
      randomXandY();
      circle(x,y,50);
      timer++;
    }
  }
  else{
    clear();
    text(points,width/2,height/2);
  }
}

function countPoints(){
  if (mouseX < x + r && mouseX > x - r && mouseY < y + r && mouseY > y - r && mouseIsPressed){
    points++;
  }
}
function randomXandY(){
  x = random(width);
  y = random(height);
}