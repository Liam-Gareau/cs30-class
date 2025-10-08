let theBallArray = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  spawnBall(width/2, height/2);

}

function draw() {
  background(255,0,0);
  moveCircle();
  bounceIfNeeded();
  showCircle();
  
  
  function moveCircle(){
    for (let ball of theBallArray){
      ball.x = ball.x + ball.dx;
      ball.y = ball.y + ball.dy;
    }
  }

  function bounceIfNeeded(){
    for (let ball of theBallArray){
      if (ball.x < ball.radius || ball.x > width - ball.radius){
        ball.dx = ball.dx * -1;
        randomizeColor(ball);
      }
      if (ball.y < ball.radius || ball.y > height - ball.radius){
        ball.dy = ball.dy * -1;
        randomizeColor(ball);
      }
    }
  }
  
  function showCircle(){
    //fill(r,g,b)
    for (let ball of theBallArray){
      fill(ball.r,ball.g,ball.b);
      circle(ball.x, ball.y, ball.radius*2);
    }
  }
  function randomizeColor(theBall){
    theBall.r = random(255);
    theBall.g = random(255);
    theBall.b = random(255);
  }
      
}

function spawnBall(x, y){
  let newBall = {
    x: x,
    y: y,
    dx: random (-10,10),
    dy: random(-10,10),
    radius: random(25, 75),
    r: random(255),
    g: random(255),
    b: random(255),
  };
  theBallArray.push(newBall);
}

function mousePressed(){
  spawnBall(mouseX, mouseY);  
}