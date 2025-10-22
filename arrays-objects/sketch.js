// Arrays and Objects
// Liam Gareau
// 
// make game that you can make different hydro carbon molecules and then name them
//
// Extra for Experts:
// 

let theCarbonArray = [];
let theBondArray = [];
let button = false;

function setup(){
  createCanvas(windowWidth,windowHeight);
  spawnCarbon();
  spawnBond();
}

function draw(){
  background(255);
  fill(200,200,200);
  noStroke();
  rect(0,0,width/4,height);
  
  moveCarbon();
  moveBond();
}

function mousePressed() {
  for (let object of theCarbonArray){
    if (mouseX > object.x - object.radius && mouseX < object.x + object.radius && mouseY > object.y - object.radius && mouseY < object.y + object.radius) {
      object.button = !object.button;
    }
  }
  for (let object of theBondArray){
    if (mouseX > object.x1 && mouseX < object.x2 && mouseY > object.y1 && mouseY < object.y2) {
      object.button = !object.button;
    }
  }
}

function moveCarbon(){
  for (let object of theCarbonArray){
    if (object.button){
      object.x = mouseX;
      object.y = mouseY;
    }
  }
  createCarbon();
}

function moveBond(){
  for (let object of theBondArray){
    if (object.button){
      object.x1 = mouseX;
      object.y1 = mouseY;
      object.x2 = mouseX;
      object.y2 = mouseY;
    }
  }
  createBond();
}

function spawnCarbon(){
  let carbon = {
    x: width/8,
    y: height/5,
    radius: 15,
    button: false,
    r: 0,
    g: 0,
    b: 0,
  };
  theCarbonArray.push(carbon);
}


function createCarbon(){
  spawnCarbon();
  for (let object of theCarbonArray) {
    fill(object.r, object.g, object.b);
    circle(object.x, object.y, object.radius);
  }
}


function spawnBond(){
  let bond = {
    x1: width/8,
    y1: height/2,
    x2: width/8 + 10,
    y2: height/2,
    button: false,
    r: 255,
    g: 0,
    b: 255,
  };
  theBondArray.push(bond);
}

function createBond(){
  spawnBond();
  for (let object of theBondArray) {
    strokeWeight(10);
    stroke(object.r, object.g, object.b);
    line(object.x1, object.y1, object.x2, object.y2);
  }
}