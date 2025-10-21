// Arrays and Objects
// Liam Gareau
// 
// make game that you can make different hydro carbon molecules and then name them
//
// Extra for Experts:
// 

let theObjectArray = [];
let button = false;
//  let radius = 15;


function setup(){
  createCanvas(windowWidth,windowHeight);
  spawnCarbon();

  let carbonButton = createButton("Carbon");
  carbonButton.position(width/8, height/5);
  carbonButton.mousePressed(createCarbon);
}

function draw(){
  background(255);
  fill(200,200,200);
  noStroke();
  rect(0,0,width/4,height);

  moveObjects();


}

function spawnCarbon(){
  let carbon = {
    x: width/2,
    y: height/2,
    radius: 15,
    button: false,
    r: 0,
    g: 0,
    b: 0,
  };
  theObjectArray.push(carbon);
}


function createCarbon(){
  spawnCarbon();
  for (let object of theObjectArray) {
    fill(object.r, object.g, object.b);
    circle(object.x, object.y, object.radius);
  }
}

function mousePressed() {
  for (let object of theObjectArray){
    if (mouseX > object.x - object.radius && mouseX < object.x + object.radius && mouseY > object.y - object.radius && mouseY < object.y + object.radius) {
      object.button = !object.button;
    }
  }
}

function moveObjects(){
  for (let object of theObjectArray){
    if (object.button){
      object.x = mouseX;
      object.y = mouseY;
      //createCarbon();
    }
  }
  createCarbon();
}