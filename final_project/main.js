function setup() {
    createCanvas(1500,900) // TODO: make this fit the screen
    background(0)
}

let tess = {
    'size': 400,
    'c': 1,
    'i': 0,
    'j': 0,
    'k': 0,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0
}

let baseVerts = [
    {'x': 1, 'y': 0, 'z': 0, 'w': 0},
    {'x': -1, 'y': 0, 'z': 0, 'w': 0},
    {'x': 0, 'y': 1, 'z': 0, 'w': 0},
    {'x': 0, 'y': -1, 'z': 0, 'w': 0},
    {'x': 0, 'y': 0, 'z': 1, 'w': 0},
    {'x': 0, 'y': 0, 'z': -1, 'w': 0},
    {'x': 0, 'y': 0, 'z': 0, 'w': 1},
    {'x': 0, 'y': 0, 'z': 0, 'w': -1},
]

function draw() {
    clear()
    background(0)

    let centerScreen = {
        'x': 1500/2,
        'y': 900/2
    }

    color(255)
    stroke(255)
    strokeWeight(10)

    for (const v of baseVerts) {
        let p = project3dTo2d(project4dTo3d(v))
        point(p.x*tess.size+centerScreen.x,p.y*tess.size+centerScreen.y)
    }
}



function project4dTo3d(p) {
    let distance = 3

    return {
        'x': p.x/(p.w+distance),
        'y': p.y/(p.w+distance),
        'z': p.z/(p.w+distance),
    }
}

function project3dTo2d(p) {
    let distance = 3

    return {
        'x': p.x/(p.z + distance),
        'y': p.y/(p.z + distance),
    }
}

function mousePressed() {
    requestPointerLock()
}

// probably won't use, but:
// van elfrinkhof, via wikipedia: 
//  a  -b  -c  -d  |  p  -q  -r  -s
//  b   a  -d   c  |  q   p   s  -r
//  c   d   a  -b  |  r  -s   p   q
//  d  -c   b   a  |  s   r  -q   p
// where (a^2 + b^2 + c^2 + d^2)(p^2 + q^2 + r^2 + s^2) = 1

function mouseDragged() {
    baseVerts = baseVerts.map((v)=>{
        let movedAngle = atan2(movedY, movedX)
        let movedAmount = sqrt(movedX**2 + movedY**2)/200

        v2 = reflect4d(v, {'x': 0, 'y':0, 'z':1, 'w':0})
        return reflect4d(v2, {'x':sin(movedAmount)*cos(movedAngle), 'y':sin(movedAmount)*sin(movedAngle), 'z':cos(movedAmount), 'w':0})
    })
}

function reflect4d(p, v) {
    lenv = 1/sqrt(v.x**2 + v.y**2 + v.z**2 + v.w**2)
    
    v2 = [v.x/lenv, v.y/lenv, v.z/lenv, v.w/lenv]
    p2 = [p.x, p.y, p.z, p.w]

    let direct = [[[],[],[],[]],[[],[],[],[]],[[],[],[],[]],[[],[],[],[]]]
    for (let i = 0; i<4; i++) {
        for (let j = 0; j<4; j++) {
            for (let k = 0; k<4; k++) {
                direct[i][j][k] = -v2[i]*p2[j]*v2[k]
            }
        }
    }

    let out = {
        'x': direct[0][0][0]+direct[1][1][0]+direct[2][2][0]+direct[3][3][0]-direct[1][0][1]-direct[2][0][2]-direct[3][0][3]+direct[0][1][1]+direct[0][2][2]+direct[0][3][3],
        'y': direct[1][1][1]+direct[0][0][1]+direct[2][2][1]+direct[3][3][1]-direct[0][1][0]-direct[2][1][2]-direct[3][1][3]+direct[1][0][0]+direct[1][2][2]+direct[1][3][3],
        'z': direct[2][2][2]+direct[0][0][2]+direct[1][1][2]+direct[3][3][2]-direct[0][2][0]-direct[1][2][1]-direct[3][2][3]+direct[2][0][0]+direct[2][1][1]+direct[2][3][3],
        'w': direct[3][3][3]+direct[0][0][3]+direct[1][1][3]+direct[2][2][3]-direct[0][3][0]-direct[1][3][1]-direct[2][3][2]+direct[3][0][0]+direct[3][1][1]+direct[3][2][2],
    }

    return out
}

function mouseReleased() {
    exitPointerLock()
}