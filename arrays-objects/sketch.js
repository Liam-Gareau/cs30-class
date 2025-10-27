// Arrays and Objects
// Liam Gareau
//
// Comment: I couldn't quite figure out how to get the carbons to bond together and form chains in the time given, I have ideas for how to do so such as checking to see if its already bonded to something or not which i had already started in the main code.
// Although I didn't get everything I wanted to done, I think my understanding for arrays and objects has improved drastically whilst fiddling with ym project and attempting to get it finished.
//
// Extra for Experts: Having multiple objects that interact with eachother
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
  // creates the gray rectangle as a sort of inventory spawner
  fill(200,200,200);
  noStroke();
  rect(0,0,width/4,height);
  
  moveCarbon();
  moveBond();
  bondCarbon();
  moveHydroCarbon();
}

function mousePressed() {
  // Checks if the mouse is over a carbon
  for (let object of theCarbonArray){
    if (mouseX > object.x - object.radius && mouseX < object.x + object.radius && mouseY > object.y - object.radius && mouseY < object.y + object.radius) {
      object.button = !object.button;
    }
  }
  // checks if mouse is over a bond
  for (let object of theBondArray){
    if (mouseX > object.x && mouseX < object.x + object.w && mouseY > object.y && mouseY < object.y + object.h) {
      object.button = !object.button;
    }
  }
}

function moveCarbon(){
  for (let object of theCarbonArray){
    if (object.button){
      // Check if the carbon was actually moved away from its original position
      if (!object.spawnedNext && (dist(mouseX, mouseY, object.x, object.y) > 5)) {
        spawnCarbon();
        object.spawnedNext = true;
      }

      // Move the carbon with the mouse
      object.x = mouseX;
      object.y = mouseY;
    }
  }

  // Draw all carbons
  for (let object of theCarbonArray) {
    fill(object.r, object.g, object.b);
    circle(object.x, object.y, object.radius);
  }
}

function moveBond(){
  for (let object of theBondArray){
    if (object.button){
      // Spawn a new bond only when first moved
      if (!object.spawnedNext && (dist(mouseX, mouseY, object.x, object.y) > 5)) {
        spawnBond();
        object.spawnedNext = true;
      }

      // Move with mouse
      object.x = mouseX - object.w/2;
      object.y = mouseY - object.h/2;
    }
  }

  // Draw all bonds
  for (let object of theBondArray) {
    fill(object.r, object.g, object.b);
    rect(object.x, object.y, object.w, object.h);
  }
}



function createCarbon(){
  //spawns the carbon on screen
  for (let object of theCarbonArray) {
    fill(object.r, object.g, object.b);
    circle(object.x, object.y, object.radius);
  }
}


function spawnCarbon(){
  //general map for carbons
  let carbon = {
    x: width/8,
    y: height/5,
    radius: 15,
    button: false,
    bondA: [],
    bondB: [],
    spawnedNext: false,
    r: 0,
    g: 0,
    b: 0,
  };
  theCarbonArray.push(carbon);
}

function spawnBond(){
  // general map for bonds
  let bond = {
    x: width/8,
    y: height/2,
    w: 20,
    h: 10,
    button: false,
    carbonA: [],
    carbonB: [],
    spawnedNext: false,
    r: 255,
    g: 0,
    b: 255,
  };
  theBondArray.push(bond);
}

function createBond(){
// draws the bonds
  for (let object of theBondArray) {
    fill(object.r, object.g, object.b);
    rect(object.x, object.y, object.w, object.h);
  }
}

function bondCarbon(){
  // sets the parameters so that you dont have multiple carbons going into the bondA array and vice versa
  for (let carbon of theCarbonArray){
    for (let bond of theBondArray){
      if (dist(carbon.x, carbon.y, bond.x, bond.y) < carbon.radius){

        if (carbon.bondA.length < 1 && bond.carbonA.length < 1){
          carbon.bondA.push(bond);
          bond.carbonA.push(carbon);
        }
        else if (carbon.bondA.length < 1 && bond.carbonA.length === 1 && bond.carbonB.length < 1 && bond.carbonA != carbon){
          carbon.bondA.push(bond);
          bond.carbonB.push(carbon);
        }
        else if (carbon.bondB.length < 1 && carbon.bondA.length === 1 && bond.carbonA.length < 1 && carbon.bondA != bond){
          carbon.bondB.push(bond);
          bond.carbonA.push(carbon);
        }
        else if (carbon.bondB.length < 1 && carbon.bondA.length === 1 && bond.carbonA.length === 1 && bond.carbonB.length < 1 && bond.carbonB != bond){
          carbon.bondB.push(bond);
          bond.carbonB.push(carbon);
        }
      }
    }
  }
}

function moveHydroCarbon(){
  for (let carbon of theCarbonArray){
    for (let bondA of carbon.bondA){
      //moves the carbon and bond if holding the carbon
      if (carbon.button){
        bondA.x = carbon.x + carbon.radius/2
        bondA.y = carbon.y - bondA.h/2
    }
    //moves the carbon and bond if holding the bond
      else if (bondA.button){
        carbon.x = bondA.x - carbon.radius/2
        carbon.y = bondA.y + bondA.h/2
      }
    }
  }
}