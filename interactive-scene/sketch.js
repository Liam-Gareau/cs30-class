// Interactive Scene Project
// Liam Gareau
// Oct 3 2025
//
// Extra for Experts:
// I fiugred out how to make the scroll wheel when scroll up and down shufle through a list of colors to change the color of your ball

//All of my variables
let timer = 0;
let points = 0;
let x;
let y;
let radius = 50/2;
let direction = " ";
let colors = ["red","orange","yellow","green","blue","purple"];
let colorIndex = 0;

//Setup step
function setup(){
  createCanvas(windowWidth, windowHeight);
}

//Draw step
function draw(){
  textSize(12);
  drawCircle();
  //changeColor();
}

//Main function that spawns in the circles and counts the time of the game so that it stops after 60 seconds
function drawCircle(){
  for (let t = timer; t <= 60; t++){
    if (frameCount % 60 === 0){
      clear();
      randomXandY();
      changeColor();
      fill(colors[colorIndex]);
      circle(x,y,50);
      timer++;
      direction = "middle";
    }
    return;
  }
  if (timer > 60) {
    clear();
    text("Congrats, You got " + points + " Points!", width / 2, height / 2);
  }
}

//Added function to randomize x and y values where their needed
function randomXandY(){
  x = random(width);
  y = random(height);
}

//Ask's if the mouse is on the circle and if clicked gives you point
//It's made so that the more you click on the ball the more points are rewarded so that you arent hard capped at a max of 60 points
function mouseClicked() {
  if (mouseX < x + radius && mouseX > x - radius && mouseY < y + radius && mouseY > y - radius){
    points++;
  }
}

//Detects if mouse wheel scrolled up or down using state variables
function mouseWheel(event){
  if (event.delta > 0) {
    direction = "up";
  } 
  else if(event.delta < 0){
    direction = "down";
  }
  else if(event.delta === 0){
    direction = "middle";
  }
}

//Detects the current state variable and scrolls through the color list to give you a color
//Coded so that if you go over the amount of things in the list it loops back to the beginning allowing fo more colors to be added in the future
function changeColor(){
  if (direction === "up"){
    colorIndex = (colorIndex + 1) % colors.length;
  }
  else if (direction === "down"){
    colorIndex = (colorIndex - 1 + colors.length) % colors.length;
  }
  else if (direction === "middle"){
    colorIndex = colorIndex;
  }
}