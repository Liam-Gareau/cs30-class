// 2d array assaignment
// Liam Gareau
// Nov 12 wed
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 9;
const ENEMY = 6;
let grid;
let rows;
let cols;
let x;
let y;
let thePlayer = {
  x: 0,
  y: 0,
};
let theEnemy = {
  x: 15,
  y: 15,
};
let end = false;

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight* 0.9);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);

  //add player and enemy to grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
  grid[theEnemy.y][theEnemy.x] = ENEMY;
}

function draw() {
  background("blue");
  displayGrid();

  // let theEnemy = {
  //   x: Math.floor(width/CELL_SIZE) - 1,
  //   y: Math.floor(height/CELL_SIZE) - 1,
  // };

  moveEnemy(thePlayer.x, thePlayer.y, theEnemy.x, theEnemy.y);
}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x,y);
}

function toggleCell(x,y){
  if (x >= 0 && x < cols && y >= 0 && y < rows){
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSABLE;
    }
    else if (grid[y][x] === IMPASSABLE){
      grid[y][x] = OPEN_TILE;
    } 
  }
}

function keyPressed() {
  if (key === "w" && !end){
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  else if (key === "a" && !end) {
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  else if (key === "s" && !end) {
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  else if (key === "d" && !end) {
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x,y){
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE){
    //previous position
    let oldx = thePlayer.x;
    let oldy = thePlayer.y;
  
    //moving the player location
    thePlayer.x = x;
    thePlayer.y = y;
  
    //put player on grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  
    //reset old spot to be open tile
    grid[oldy][oldx] = OPEN_TILE;
  }
}

function moveEnemy(x1,y1,x2,y2){
  if (x1 > x2 && y1 > y2){
    if (frameCount % 30 === 0){
      x2++;
      y2++;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (x1 < x2 && y1 < y2){
    if (frameCount % 30 === 0){
      x2--;
      y2--;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (y1 > y2 && x1 < x2){
    if (frameCount % 30 === 0){
      x2--;
      y2++;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (y1 < y2 && x1 > x2){
    if (frameCount % 30 === 0){
      x2++;
      y2--;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (x1 < x2){
    if (frameCount % 30 === 0){
      x2--;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (x1 > x2){
    if (frameCount % 30 === 0){
      x2++;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (y1 < y2){
    if (frameCount % 30 === 0){
      y2--;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (y1 > y2){
    if (frameCount % 30 === 0){
      y2++;
      grid[y2][x2] = ENEMY;
      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  else if (y1 === y2 && x1 === x2){
    end = true;
    clear();
    text("Game Over", width/2, height/2);
  }
}

function displayGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === OPEN_TILE){
        fill(255);
      }
      else if (grid[y][x] === IMPASSABLE){
        fill(0);
      }
      else if (grid[y][x] === PLAYER) {
        fill("green");
      }
      else if (grid[y][x] === ENEMY){
        fill("red");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateEmptyGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}
