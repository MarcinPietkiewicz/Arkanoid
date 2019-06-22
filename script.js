var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 8;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
var paddleX = 400;

var canvas, canvasContext;

function updateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = event.clientX - rect.left - root.scrollLeft;
  //var mouseY = event.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH / 2;
  //paddleY = mouseY;
}

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);
};

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > canvas.width) {
    ballSpeedX *= -1;
  }
  if (ballX < 0) {
    ballSpeedX *= -1;
  }
  if (ballY > canvas.height) {
    ballSpeedY *= -1;
  }
  if (ballY < 0) {
    ballSpeedY *= -1;
  }
}

function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
  colorCircle(ballX, ballY, 10, "white"); //draw a ball
  colorRect(
    paddleX,
    canvas.height - PADDLE_THICKNESS,
    PADDLE_WIDTH,
    PADDLE_THICKNESS,
    "white"
  );
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
