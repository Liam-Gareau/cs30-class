// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let state = "top";
let c1 = "red";
let c2 = "yellow";
let c3 = "green";

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeColor();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(c1);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(c2);
  ellipse(width/2, height/2, 50, 50); //middle
  fill(c3);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function changeColor(){
  if (state === "top"){
    c1 = "red";
    c2 = 255;
    c3 = 255;
    if (millis() % 1000 === 0){
      state = "bottom";
    }
  }
  else if (state === "bottom"){
    c1 = 255;
    c2 = 255;
    c3 = "green";
    if (millis() % 1000 === 0){
      state = "middle";
    }
  }
  else if (state === "middle"){
    c1 = 255;
    c2 = "yellow";
    c3 = 255;
    if (millis() % 1000 === 0){
      state = "top";
    }
  }
}