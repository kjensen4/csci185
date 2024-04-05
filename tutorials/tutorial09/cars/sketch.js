const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight; 

// feel free to change these values as you like!
const cars = [{
    x: 100,
    y: 100,
    width: 200,
    speed: 5,
    acceleration: 0.02,
    color: 'hotpink'
},
{
    x: canvasWidth-100,
    y: canvasHeight-100,
    width: 200,
    speed: -5,
    acceleration: -0.01,
    color: 'green'
}]


// required to set up the canvas:
function setup() {
    createCanvas(canvasWidth, canvasHeight);
}


// animation loop:
function draw() {
    // clear the canvas:
    clear();

    // move the car:
    for (let i = 0; i < cars.length; i++) {
        cars[i].x += cars[i].speed;
        cars[i].speed += cars[i].acceleration;

        // seamless wrap
        if (cars[i].x >= canvasWidth-cars[i].width/2) {
            drawCar(cars[i].x-canvasWidth, cars[i].y, cars[i].width, cars[i].color)
        } else if (cars[i].x <= cars[i].width/2) {
            drawCar(cars[i].x+canvasWidth, cars[i].y, cars[i].width, cars[i].color)
        }
    
        // screen wrap
        if (cars[i].x >= canvasWidth+cars[i].width/2) {
            cars[i].x = cars[i].width/2
        } else if (cars[i].x <= -cars[i].width/2) {
            cars[i].x = canvasWidth-cars[i].width/2
        }

        // redraw the car:
        drawCar(cars[i].x, cars[i].y, cars[i].width, cars[i].color);
    }
    
    // draw the grid (optional -- feel free to remove this line):
    // drawGrid(canvasWidth, canvasHeight);
}


// this function's job is to draw a car based on the 
// parameters the user passes in (x, y, size, fillColor, and wheelColor)
function drawCar(x, y, size, fillColor, wheelColor='black') {
    strokeWeight(0);
    
    // body
    fill(fillColor);
    rect(x - size/4, y - (size/5 + size/7), size / 2, size/7); // top
    rect(x - size/2, y - size/5, size, size/5); // bottom

    // wheels:
    fill(wheelColor);
    circle(x - size / 4, y, size / 6);
    circle(x + size / 4, y, size / 6);
}
