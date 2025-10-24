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
    console.log(mouseX > object.x1 && mouseX < object.x1 + object.w);
    console.log(mouseX > object.x1 && mouseX < object.x1 + object.w && mouseY > object.y1 && mouseY < object.y1 + object.h);


    if (mouseX > object.x1 && mouseX < object.x1 + object.w && mouseY > object.y1 && mouseY < object.y1 + object.h) {
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
      object.x1 = mouseX - object.w/2;
      object.y1 = mouseY - object.h/2;
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
  //added this so that it spawns less so that your game doesn't start to lag eventually
  if (frameCount%10 === 0){
    spawnCarbon();
  }
  //spawns the carbon on screen
  for (let object of theCarbonArray) {
    fill(object.r, object.g, object.b);
    circle(object.x, object.y, object.radius);
  }
}


function spawnBond(){
  let bond = {
    x1: width/8,
    y1: height/2,
    w: 20,
    h: 10,
    button: false,
    r: 255,
    g: 0,
    b: 255,
  };
  theBondArray.push(bond);
}

function createBond(){
  if (frameCount%10 === 0){
    spawnBond();
  }
  for (let object of theBondArray) {
    fill(object.r, object.g, object.b);
    rect(object.x1, object.y1, object.w, object.h);
  }
}