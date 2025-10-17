// Arrays and Objects
// Liam Gareau
// 
// make game that you can make different hydro carbon molecules and then name them
//
// Extra for Experts:
// 

let theObjectArray = [];
let theObjectButtonArray = [];
let button = false;


function setup(){
  createCanvas(windowWidth,windowHeight);
  spawnCarbon();
}

function draw(){
  //background(255);
  fill(200,200,200);
  noStroke();
  rect(0,0,width/4,height);

  let carbonButton = createButton("Carbon");
  carbonButton.position(width/8, height/5);
  carbonButton.mousePressed(createCarbon);
}

function spawnCarbon(x,y){
  let carbon = {
    x: width/2,
    y: height/2,
    radius: 15,
    r: 0,
    g: 0,
    b: 0,
  };
  theObjectArray.push(carbon);
}


function createCarbon(){
  for (let object of theObjectArray) {
    fill(object.r, object.g, object.b);
    circle(object.x, object.y, object.radius);
  }
}

