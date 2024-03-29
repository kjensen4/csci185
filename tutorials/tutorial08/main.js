function setup() {
    // Code to set up the canvas. Do not edit.
    const canvasEl = document.querySelector('#canvas-holder');
    const canvasWidth = canvasEl.offsetWidth;
    const canvasHeight = canvasEl.offsetHeight; 
    const myCanvas = createCanvas(canvasWidth, canvasHeight);
    myCanvas.parent("canvas-holder");
    background('#FFF');
}

const shapes = {
    circle: 0,
    square: 1,
    triangle: 2,
}


function mouseDragged(){
    let color = document.querySelector("#color").value
    let size = document.querySelector("#size").value
    let shape = document.querySelector("#shape").selectedIndex

    fill(color);
    strokeWeight(0);

    switch (shape) {
        case shapes.circle:
            circle(mouseX, mouseY, size);
            break;
        case shapes.square:
            square(mouseX-size/2, mouseY-size/2, size);
            break;
        case shapes.triangle: 
            // Specify (mouseX, mouseY) to be center of equilateral triangle w/ side lengths `size`
            let sqrt3 = Math.sqrt(3)
            // sqrt3/6 ~ 0.289
            // sqrt3/3 ~ 0.577
            triangle(
                mouseX-size/2,  mouseY+size*sqrt3/6,
                mouseX+size/2,  mouseY+size*sqrt3/6,
                mouseX,         mouseY-size*sqrt3/3
            )
            break;
        default:
            break;
    }
}

function mousePressed () {
    mouseDragged()
}
