// 1. Elements
const canvasTag = document.querySelector('canvas');
const context = canvasTag.getContext('2d');
const bodyTag = document.querySelector('body');
const [width, height] = [window.innerWidth, window.innerHeight];
let isMouseDown = false;
let [lastX, lastY] = [0, 0];
// set the hue of the stroke style
let h = 190;
let color = true;
let direction = true;

// 2. Events
function setupCanvas() {
  // Give the canvas element a width and a height
  canvasTag.width = width;
  canvasTag.height = height;
  canvasTag.style.width = `${width}px`;
  canvasTag.style.height = `${height}px`;
  // fill the canvas with a color
  context.fillStyle = '#191919';
  context.rect(0, 0, width, height);
  context.fill();

  // shape used to draw the end points of lines
  context.lineCap = 'round'; // "butt" || "round" || "square";
  context.lineJoin = 'round'; // "butt" || "round" || "square";
}

function stroke() {
  context.strokeStyle = `hsl(${h}, 95%, 55%)`;
  // context.globalCompositeOperation = "copy"

  // change the color to the opposite direction
  if (h >= 250 || h < 190) {
    color = !color;
  }
  // if color is true increment the hue by one
  if (color) {
    h++;
    // if color is false decrement the hue by one
  } else {
    h--;
  }

  // change the direction to the opposite
  if (context.lineWidth >= 20 || context.lineWidth <= 1) {
    direction = !direction;
  }
  // if direction is true increment by 1
  if (direction) {
    context.lineWidth++;
    // if direction is false decrement by 1
  } else {
    context.lineWidth--;
  }
  console.log(h);
}

function moveDraw(event) {
  if (isMouseDown) {
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.pageX, event.pageY);
    context.stroke();
    [lastX, lastY] = [event.pageX, event.pageY];
    stroke();
  }
}

function mouseIsDown(event) {
  isMouseDown = true;
  lastX = event.pageX;
  lastY = event.PageY;
}

function mouseIsUp() {
  isMouseDown = false;
}

// 3. Listeners
setupCanvas();
canvasTag.addEventListener('mousemove', moveDraw);
canvasTag.addEventListener('mousedown', mouseIsDown);
canvasTag.addEventListener('mouseup', mouseIsUp);
