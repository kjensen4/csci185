let height = 700
let width = 1500
let scalefactor = 1000
let distance = 2.5
let torque = 1 / 200000
let centerScreen = {
    'x': width / 2,
    'y': height / 2
}

let angularVelM1Y = 0
let angularVelM1X = 0
let angularVelM2X = 0
let angularVelM2Y = 0
let angularVelRoll = 0
let angularVelReel = 0

function setup() {
    createCanvas(width, height) // TODO: make this fit the screen
    background(0)
}

function draw() {
    clear()
    background(0)

    let tetras = orthoplexTetras
    let verts = orthoplexVerts
    let isTesseract = document.getElementById('option1').selected
    if (isTesseract) {
        tetras = tesseractTetras
        verts = tesseractVerts
        scalefactor = 700
        distance = 2.5
    } else {
        tetras = orthoplexTetras
        verts = orthoplexVerts
        scalefactor = 1000
        distance = 2
    }

    // handle rotation
    basis = basis.map((v) => {
        // roll
        let v2 = reflect4d(v, { 'x': 0, 'y': 1, 'z': 0, 'w': 0 })
        v2 = reflect4d(v2, { 'x': sin(angularVelRoll), 'y': cos(angularVelRoll), 'z': 0, 'w': 0 })

        // reel
        v2 = reflect4d(v2, { 'x': 0, 'y': 0, 'z': 0, 'w': 1 })
        v2 = reflect4d(v2, { 'x': 0, 'y': 0, 'z': sin(angularVelReel), 'w': cos(angularVelReel) })

        let movedAmount = sqrt(angularVelM1X ** 2 + angularVelM1Y ** 2)
        let movedAngle = atan2(angularVelM1Y, angularVelM1X)

        v2 = reflect4d(v2, { 'x': 0, 'y': 0, 'z': 1, 'w': 0 })
        v2 = reflect4d(v2, { 'x': sin(movedAmount) * cos(movedAngle), 'y': sin(movedAmount) * sin(movedAngle), 'z': cos(movedAmount), 'w': 0 })

        movedAmount = sqrt(angularVelM2X ** 2 + angularVelM2Y ** 2)
        movedAngle = atan2(angularVelM2Y, angularVelM2X)

        v2 = reflect4d(v2, { 'x': 0, 'y': 0, 'z': 0, 'w': 1 })
        return reflect4d(v2, { 'x': sin(movedAmount) * cos(movedAngle), 'y': sin(movedAmount) * sin(movedAngle), 'z': 0, 'w': cos(movedAmount) })

    })

    // reset button
    if (keyIsDown(32)) {
        angularVelM1X *= 0.9
        angularVelM1Y *= 0.9
        angularVelM2X *= 0.9
        angularVelM2Y *= 0.9
        angularVelReel *= 0.9
        angularVelRoll *= 0.9
    }


    // projection shadow
    if (document.getElementById("ghosting").checked) {
        fill(255, 255, 255, 25)
        stroke(255, 255, 255, 25)
        strokeWeight(2)
        if (isTesseract) {
            for (const c of tesseractGhostSquares) {
                let v = c.map((e) => { return center2d(project3dTo2d(project4dTo3d(coeffsTo4d(verts[e])))) })

                quad(v[0].x, v[0].y, v[1].x, v[1].y, v[3].x, v[3].y, v[2].x, v[2].y)
            }
        } else {
            for (const c of tetras) {
                let v = c.map((e) => { return center2d(project3dTo2d(project4dTo3d(coeffsTo4d(verts[e])))) })

                triangle(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y)
                triangle(v[0].x, v[0].y, v[1].x, v[1].y, v[3].x, v[3].y)
                triangle(v[0].x, v[0].y, v[2].x, v[2].y, v[3].x, v[3].y)
                triangle(v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y)
            }
        }
    }

    // cross section
    if (document.getElementById('slice').checked) {
        noStroke()
        let drawQueue = []
        for (const c of tetras) {
            let v = []
            v[0] = coeffsTo4d(verts[c[0]])
            v[1] = coeffsTo4d(verts[c[1]])
            v[2] = coeffsTo4d(verts[c[2]])
            v[3] = coeffsTo4d(verts[c[3]])

            let o = []

            for (v1 of v) {
                for (v2 of v) {
                    if (v1.w * v2.w > 0 || v2.w <= v1.w) {
                        continue
                    }
                    o.push(project4dTo3d(vectorSum4d(v1, vectorProd4d(vectorSum4d(v2, vectorProd4d(v1, -1)), abs(v1.w) / (v2.w - v1.w)))))
                }
            }

            let n = tetraNormal4d(v[0], v[1], v[2], v[3])
            let color = {
                'r': 20 * n.x + 110,
                'g': 20 * n.y + 110,
                'b': 20 * n.z + 110
            }
            if (!isTesseract) {
                color = {
                    'r': 60 * n.x + 90,
                    'g': 60 * n.y + 90,
                    'b': 60 * n.z + 90
                }
            }

            if (o.length >= 3) {
                drawQueue.push({ 'face': [o[0], o[1], o[2]], 'color': color })
            }
            if (o.length >= 4) {
                drawQueue.push({ 'face': [o[1], o[2], o[3]], 'color': color })
            }
            if (o.length >= 5) {
                // should never happen, but it does sometimes
                // basically just scattershot faces to fill in the gaps
                drawQueue.push({ 'face': [o[0], o[1], o[4]], 'color': color })
                drawQueue.push({ 'face': [o[0], o[2], o[4]], 'color': color })
                drawQueue.push({ 'face': [o[0], o[3], o[4]], 'color': color })
            }
        }

        // backface culling
        drawQueue = drawQueue.filter((a) => {
            let a0 = { 'x': project3dTo2d(a.face[0]).x, 'y': project3dTo2d(a.face[0]).y, 'z': a.face[0].z }
            let a1 = { 'x': project3dTo2d(a.face[1]).x, 'y': project3dTo2d(a.face[1]).y, 'z': a.face[1].z }
            let a2 = { 'x': project3dTo2d(a.face[2]).x, 'y': project3dTo2d(a.face[2]).y, 'z': a.face[2].z }

            let amb = vectorSum4d(a0, vectorProd4d(a1, -1))
            let cmb = vectorSum4d(a2, vectorProd4d(a1, -1))

            let n = crossProd(amb, cmb)
            if (n.x * (a0.x + a1.x + a2.x) + n.y * (a0.y + a1.y + a2.y) + n.z * (a0.z + a1.z + a2.z) > 0) {
                n = vectorProd4d(n, -1)
            }
            if (n.z > 0) {
                return true
            }
            return false
        })

        for (let i = 0; i < drawQueue.length; i++) {
            o = drawQueue[i].face
            fill(drawQueue[i].color.r, drawQueue[i].color.g, drawQueue[i].color.b,)

            o = o.map((e) => { return center2d(project3dTo2d(e)) })
            triangle(o[0].x, o[0].y, o[1].x, o[1].y, o[2].x, o[2].y)
        }
    }
}

function mousePressed() {
    if (mouseY > 0 && mouseY < height) {
        requestPointerLock()
    }
}

// rotations via double reflection
function mouseDragged() {
    switch (mouseButton) {
        case LEFT:
            if (keyIsDown(CONTROL)) {
                angularVelRoll -= movedX * torque
                angularVelReel += movedY * torque
                break
            }
            angularVelM1X -= movedX * torque
            angularVelM1Y -= movedY * torque
            break

        case RIGHT:
            angularVelM2X -= movedX * torque
            angularVelM2Y -= movedY * torque
            break

        default:
    }
}

function mouseReleased() {
    exitPointerLock()
}

function keyPressed() {
    if (key == "r") {
        basis = [
            { 'x': 1, 'y': 0, 'z': 0, 'w': 0 },
            { 'x': 0, 'y': 1, 'z': 0, 'w': 0 },
            { 'x': 0, 'y': 0, 'z': 1, 'w': 0 },
            { 'x': 0, 'y': 0, 'z': 0, 'w': 1 },
        ]
    }
}