var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 8;

const BRICK_W = 80;
const BRICK_H = 40;
const BRICK_GAP = 5;
const BRICK_COLS = 10;
const BRICK_ROWS = 7;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);


const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var canvas, canvasContext;

var mouseX;
var mouseY;

function updateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = event.clientX - rect.left - root.scrollLeft;
  mouseY = event.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH / 2;
  //paddleY = mouseY;
}

function brickReset() {
  for (let i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
    if (Math.random() <= 1) {
      brickGrid[i] = true;
    } else {
      brickGrid[i] = false;
    }
  }
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);

  brickReset();
  ballReset();
};

function updateAll() {
  moveAll();
  drawAll();
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function ballMove() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > canvas.width) { // right
    ballSpeedX *= -1;
  }
  if (ballX < 0) { // left
    ballSpeedX *= -1;
  }
  if (ballY > canvas.height) { // bottom
    ballReset();
  }
  if (ballY < 0) { // top
    ballSpeedY *= -1;
  }
}

function ballBrickHandling() {

  var ballBrickCol = Math.floor(ballX / BRICK_W);
  var ballBrickRow = Math.floor(ballY / BRICK_H);
  var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

  // colorText(mouseBrickCol + "," + mouseBrickRow + ":" + brickIndexUnderMouse, mouseX, mouseY, 'yellow');

  if (ballBrickCol >= 0 &&
    ballBrickCol < BRICK_COLS &&
    ballBrickRow >= 0 &&
    ballBrickRow < BRICK_ROWS) {
    if (brickGrid[brickIndexUnderBall]) {

      brickGrid[brickIndexUnderBall] = false;

      var prevBallX = ballX - ballSpeedX;
      var prevBallY = ballY - ballSpeedY;
      var prevBrickCol = Math.floor(prevBallX / BRICK_W);
      var prevBrickRow = Math.floor(prevBallY / BRICK_H);

      if (prevBrickCol != ballBrickCol) {
        ballSpeedX *= -1;
      }
      if (prevBrickRow != ballBrickRow) {
        ballSpeedY *= -1;
      }

      // ballSpeedY *= -1;
    }
  }
}

function ballPaddleHandling() {
  var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
  if (ballY > paddleTopEdgeY && // below the top of paddle
    ballY < paddleBottomEdgeY && // above bottom of paddle
    ballX > paddleLeftEdgeX && // right of the left side of paddle
    ballX < paddleRightEdgeX) { // left of the right side of paddle

    ballSpeedY *= -1;

    var centerOfPaddleX = paddleX + PADDLE_WIDTH / 2
    var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
    ballSpeedX = ballDistFromPaddleCenterX * 0.35;
  }
}

function moveAll() {
  ballMove();
  ballBrickHandling();
  ballPaddleHandling();


}

function rowColToArrayIndex(col, row) {
  return col + BRICK_COLS * row;
}


function drawBricks() {
  for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {

      var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if (brickGrid[arrayIndex]) {
        colorRect(BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
      }
    }
  }


}


function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
  colorCircle(ballX, ballY, 10, "white"); //draw a ball
  colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, "white");
  drawBricks();

}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}
