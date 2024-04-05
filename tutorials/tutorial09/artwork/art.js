const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const colors = ["#08415c", "#e1f0c4", "#6bab90", "#55917f", "#5e4c5a"];

function randomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(2); // how many redraws per second

    background(0)
    noStroke()

    let rmin = 53
    let rmax = 73
    let gmin = 25
    let gmax = 45
    let bmin = 93
    let bmax = 113
    let diff = 60

    let r1 = randomInt(rmin, rmax)
    let g1 = randomInt(gmin, gmax)
    let b1 = randomInt(bmin, bmax)

    let r2 = randomInt(rmin+diff, rmax+diff)
    let g2 = randomInt(gmin, gmax)
    let b2 = randomInt(bmin+diff, bmax+diff)

    let r3 = randomInt(rmin+2*diff, rmax+2*diff)
    let g3 = randomInt(gmin, gmax)
    let b3 = randomInt(bmin+2*diff, bmax+2*diff)

    for (let i = 0; i<10000; i++) {
        // generate a random x-position, y-position, and size:
        let x = randomInt(0, canvasWidth);
        let y = randomInt(0, canvasHeight);
        let size = randomInt(25, 125);

        // interpolation parameter (radial: 0 at screen center, 1 at screen corners)
        let t = ((x/canvasWidth - 0.5)**2 + (y/canvasHeight - 0.5)**2)*2

        // interpolation function (quadratic passing through color 1 at t=0, color 2 at t=0.5, color 3 at t=1)
        let r = 2*r1*(t-0.5)*(t-1)-4*r2*t*(t-1)+2*r3*t*(t-0.5) + randomInt(-20,20)
        let g = 2*g1*(t-0.5)*(t-1)-4*g2*t*(t-1)+2*g3*t*(t-0.5) + randomInt(-20,20)
        let b = 2*b1*(t-0.5)*(t-1)-4*b2*t*(t-1)+2*b3*t*(t-0.5) + randomInt(-20,20)

        fill(r,g,b,5);

        // Draw a random circle:
        circle(x, y, size);
    }
}
