const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // function invocations goes here:
    // drawShape(100, 100, 150, "#db5461", "#102e4a");
    // drawShape(200, 200, 75, "#102e4a", "#8093f1");
    // drawShape(100, 325, 100, "#8093f1", "#7fb285");
    // drawShape(250, 375, 125, "#7fb285", "#0bc9cd");
    // drawShape(450, 200, 250, "#0bc9cd", "#db5461");

    drawGrid(canvasWidth, canvasHeight);
}

/**
 * Create the drawShape function definition here:
 * The function should draw two concentric circles of different colors.
 * The function should accept the following parameters (in order):
 *      x: the x-coordinate of the center of the circle(s).
 *      y: the y-coordinate of the center of the circle(s).
 *      size: the diameter of the larger circle.
 *      color1: the color of the larger circle.
 *      color2: the color of the smaller circle, which is 1/2 the diameter of the larger circle.
 */
