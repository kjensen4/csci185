const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const colors = ["#08415c", "#e1f0c4", "#6bab90", "#55917f", "#5e4c5a"];

function randomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(min, max) {
    return {r: randomInt(min.r, max.r), g: randomInt(min.g, max.g), b: randomInt(min.b, max.b)}
}

function colorSum (a,b) {
    return {r: a.r+b.r, g: a.g+b.g, b: a.b+b.b}
}

function colorScale (a,s) {
    return {r: a.r*s, g: a.g*s, b: a.b*s}
}

// Quadratic interpolation: returns a when t==0, b when t==0.5, and c when t==1
function colorInterpolate(t,a,b,c){
    let temp = colorSum(colorScale(a, 2*(t-1)*(t-0.5)), colorScale(b, -4*t*(t-1)))
    return colorSum(temp, colorScale(c, 2*t*(t-0.5)))
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(2); // how many redraws per second

    background(0)
    noStroke()

    let colormin = {r:53, g: 25, b: 93}
    let colormax = {r:73, g: 45, b: 113}
    let diff = {r: 60, g: 0, b: 60}

    let colors = []
    for (let i = 0; i < 3; i++) {
        colors[i] = randomColor(colormin, colormax)
        colormin = colorSum(colormin,diff)
        colormax = colorSum(colormax,diff)
    }

    for (let i = 0; i<10000; i++) {
        // generate a random x-position, y-position, and size:
        let x = randomInt(0, canvasWidth);
        let y = randomInt(0, canvasHeight);
        let size = randomInt(25, 125);

        // interpolation parameter (radial: 0 at screen center, 1 at screen corners)
        let t = ((x/canvasWidth - 0.5)**2 + (y/canvasHeight - 0.5)**2)*2

        // choose fill color
        let interpolatedColor = colorInterpolate(t, colors[0], colors[1], colors[2])
        let randomOffset = randomColor({r:-20,g:-20,b:-20}, {r:20,g:20,b:20})
        let fillColor = colorSum(interpolatedColor, randomOffset)

        // draw
        fill(fillColor.r, fillColor.g, fillColor.b,5);
        circle(x, y, size);
    }
}
