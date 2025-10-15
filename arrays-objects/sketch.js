// Arrays and Objects
// Liam Gareau
// 
// make game that you can make different hydro carbon molecules and then name them
//
// Extra for Experts:
// 

let theObjectArray = [];
let theObjectButtonArray = [];
let radius = 15

function setup(){
  createCanvas(windowWidth,windowHeight);
  spawnObject();
}

function draw(){
  //background(255);
  fill(200,200,200);
  noStroke();
  rect(0,0,width/4,height);
  objectButton();
}

function spawnObject(){
  let carbon = {
    x: width/2,
    y: height/2,
    diameter: 30,
    r: 0,
    g: 0,
    b: 0,
  };
  theObjectArray.push(carbon);
}

function objectButton(){
  fill("black");
  circle(width/8, height/5, radius);
}

function mousePressed(){
  if (mouseX < width/8 + radius && mouseX > width/8 - radius && mouseY < height/5 + radius && mouseY > height/5 - radius){

  }
}