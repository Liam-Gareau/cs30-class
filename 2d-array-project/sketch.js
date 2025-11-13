// 2d array assaignment
// Liam Gareau
// Nov 12 wed
//
// Extra for Experts:
// I used my knowledge of how the grid worked in order to code an enemy that walks towards you no matter you direction you move and have that relay onto the grid

//variables used throughout the code
const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 9;
const ENEMY = 6;
const GOAL = 7;
let grid;
let rows;
let cols;
let x;
let y;
let end = false;
let score = 0;
let enemySpeed = 60;
let thePlayer = {
  x: 0,
  y: 0,
};
let theEnemy = {
  x: x,
  y: y,
};
let theGoal = {
  x: x,
  y: y,
};

function setup() {
  //set up the size of the canvas
  createCanvas(windowWidth * 0.9, windowHeight* 0.9);

  //making the grid
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);

  //setting the enemy's position to be bottom right corner
  theEnemy.x = cols - 1;
  theEnemy.y = rows - 1;
  
  //setting the goal location to be random place on board to start
  theGoal.x = Math.floor(random(cols));
  theGoal.y = Math.floor(random(rows));

  //add player and enemy and goal to grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
  grid[theEnemy.y][theEnemy.x] = ENEMY;
  grid[theGoal.y][theGoal.x] = GOAL;
}

function draw() {
  //calling upon the functions
  background("blue");
  displayGrid();
  resetTiles();
  moveGoal();
  speedUpEnemy();
  moveEnemy(thePlayer.x, thePlayer.y, theEnemy.x, theEnemy.y);
}

//checks to see if 10 seconds has passed, if so it increases the rate in which the enemy moves towards you by decreasing the frameCount
function speedUpEnemy() {
  if (frameCount % 600 === 0 && enemySpeed > 10) {
    enemySpeed = enemySpeed - 5;
  }
}

//checks to see if the player is ontop of the goal and if so it moves the goal to a random position on the board and gives you 1 score
function moveGoal() {
  if (thePlayer.x === theGoal.x && thePlayer.y === theGoal.y){
    score++
    theGoal.x = Math.floor(random(cols));
    theGoal.y = Math.floor(random(rows));
    grid[theGoal.y][theGoal.x] = GOAL;
  }
}

//resets all the impassable black blocks back to white blocks so that the enemy can continue moving towards you
function resetTiles() {
  if (frameCount % 300 === 0) {
    for (let y = 0; y < rows; y++){
      for (let x = 0; x < cols; x++){
        if (grid[y][x] === IMPASSABLE){
          grid[y][x] = OPEN_TILE;
        }
      }
    }
  }
}

//changes the white squares to black and vice versa on click of the mouse
function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x,y);
}

//changes the white squares to black and vice versa
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

//checks to see if the game is over and if not then it moves your character with WASD
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

//math behind moving your player and making sure its character's position is properly displayed
function movePlayer(x,y){
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE || grid[y][x] === GOAL){
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

//checks in all of the cardinal directions of the enemy and determines where the player is so that it can move closer to it in the most efficient manner
function moveEnemy(x1,y1,x2,y2){
  //south east
  if (x1 > x2 && y1 > y2 && grid[y2 + 1][x2 + 1] === OPEN_TILE){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      x2++;
      y2++;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //north west
  else if (x1 < x2 && y1 < y2 && grid[y2 - 1][x2 - 1] === OPEN_TILE || grid[y2 - 1][x2 - 1] === PLAYER){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      x2--;
      y2--;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //south west
  else if (y1 > y2 && x1 < x2 && grid[y2 + 1][x2 - 1] === OPEN_TILE || grid[y2 + 1][x2 - 1] === PLAYER){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      x2--;
      y2++;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //north east
  else if (y1 < y2 && x1 > x2 && grid[y2 - 1][x2 + 1] === OPEN_TILE || grid[y2 - 1][x2 + 1] === PLAYER){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      x2++;
      y2--;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //west
  else if (x1 < x2 && grid[y2][x2 - 1] === OPEN_TILE || grid[y2][x2 - 1] === PLAYER){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      x2--;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //east
  else if (x1 > x2 && grid[y2][x2 + 1] === OPEN_TILE || grid[y2][x2 + 1] === PLAYER){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      x2++;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //north
  else if (y1 < y2 && grid[y2 - 1][x2] === OPEN_TILE || grid[y2 - 1][x2] === PLAYER){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      y2--;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //south
  else if (y1 > y2 && grid[y2 + 1][x2] === OPEN_TILE || grid[y2 + 1][x2] === PLAYER){
    if (frameCount % enemySpeed === 0){
      let oldx = theEnemy.x;
      let oldy = theEnemy.y;

      y2++;

      grid[y2][x2] = ENEMY;
      grid[oldy][oldx] = OPEN_TILE;

      theEnemy.x = x2;
      theEnemy.y = y2;
    }
  }
  //if enemy is ontop player game ends
  else if (y1 === y2 && x1 === x2){
    end = true;
    clear();
    text("Game Over, You got " + score + " points", width/2, height/2);
  }
}

//displays all the different things on the board
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
      else if (grid[y][x] === GOAL){
        fill("yellow");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

//generates the initial grid
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