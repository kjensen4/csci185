function tetraNormal4d(p1, p2, p3, p4) {
    let bma = vectorSum4d(p2, vectorProd4d(p1, -1))
    let cma = vectorSum4d(p3, vectorProd4d(p1, -1))
    let dma = vectorSum4d(p4, vectorProd4d(p1, -1))

    let out = {
        'x': (bma.y * cma.z * dma.w - bma.y * cma.w * dma.z - bma.z * cma.y * dma.w + bma.z * cma.w * dma.y + bma.w * cma.y * dma.z - bma.w * cma.z * dma.y),
        'y': -(bma.x * cma.z * dma.w - bma.x * cma.w * dma.z - bma.z * cma.x * dma.w + bma.z * cma.w * dma.x + bma.w * cma.x * dma.z - bma.w * cma.z * dma.x),
        'z': (bma.x * cma.y * dma.w - bma.x * cma.w * dma.y - bma.y * cma.x * dma.w + bma.y * cma.w * dma.x + bma.w * cma.x * dma.y - bma.w * cma.y * dma.x),
        'w': -(bma.x * cma.y * dma.z - bma.x * cma.z * dma.y - bma.y * cma.x * dma.z + bma.y * cma.z * dma.x + bma.z * cma.x * dma.y - bma.z * cma.y * dma.x)
    }

    if (out.x * (p1.x + p2.x + p3.x + p4.x) + out.y * (p1.y + p2.y + p3.y + p4.y) + out.z * (p1.z + p2.z + p3.z + p4.z) + out.w * (p1.w + p2.w + p3.w + p4.w) < 0) {
        out = vectorProd4d(out, -1)
    }
    return out
}

function vectorSum4d(v1, v2) {
    return {
        'x': v1.x + v2.x,
        'y': v1.y + v2.y,
        'z': v1.z + v2.z,
        'w': v1.w + v2.w,
    }
}

function vectorProd4d(v, s) {
    return {
        'x': v.x * s,
        'y': v.y * s,
        'z': v.z * s,
        'w': v.w * s,
    }
}

function crossProd(v1, v2) {
    return {
        'x': v1.y * v2.z - v1.z * v2.y,
        'y': v1.z * v2.x - v1.x * v2.z,
        'z': v1.x * v2.y - v1.y * v2.x,
    }
}

function coeffsTo4d(p) {
    return {
        'x': p.a * basis[0].x + p.b * basis[1].x + p.c * basis[2].x + p.d * basis[3].x,
        'y': p.a * basis[0].y + p.b * basis[1].y + p.c * basis[2].y + p.d * basis[3].y,
        'z': p.a * basis[0].z + p.b * basis[1].z + p.c * basis[2].z + p.d * basis[3].z,
        'w': p.a * basis[0].w + p.b * basis[1].w + p.c * basis[2].w + p.d * basis[3].w,
    }
}

function project4dTo3d(p) {
    return {
        'x': p.x / (p.w + distance),
        'y': p.y / (p.w + distance),
        'z': p.z / (p.w + distance),
    }
}

function project3dTo2d(p) {
    return {
        'x': p.x / (p.z + distance),
        'y': p.y / (p.z + distance),
    }
}

function center2d(p) {
    return {
        'x': p.x * scalefactor + centerScreen.x, 
        'y': p.y * scalefactor + centerScreen.y
    }
}

// geometric algebra reflection formula. not particularly efficient for our purposes, but very easy to remember
function reflect4d(p, v) {
    lenv = 1 / sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2 + v.w ** 2)

    v2 = [v.x / lenv, v.y / lenv, v.z / lenv, v.w / lenv]
    p2 = [p.x, p.y, p.z, p.w]

    let direct = [[[], [], [], []], [[], [], [], []], [[], [], [], []], [[], [], [], []]]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                direct[i][j][k] = -v2[i] * p2[j] * v2[k]
            }
        }
    }

    return {
        'x': direct[0][0][0] + direct[1][1][0] + direct[2][2][0] + direct[3][3][0] - direct[1][0][1] - direct[2][0][2] - direct[3][0][3] + direct[0][1][1] + direct[0][2][2] + direct[0][3][3],
        'y': direct[1][1][1] + direct[0][0][1] + direct[2][2][1] + direct[3][3][1] - direct[0][1][0] - direct[2][1][2] - direct[3][1][3] + direct[1][0][0] + direct[1][2][2] + direct[1][3][3],
        'z': direct[2][2][2] + direct[0][0][2] + direct[1][1][2] + direct[3][3][2] - direct[0][2][0] - direct[1][2][1] - direct[3][2][3] + direct[2][0][0] + direct[2][1][1] + direct[2][3][3],
        'w': direct[3][3][3] + direct[0][0][3] + direct[1][1][3] + direct[2][2][3] - direct[0][3][0] - direct[1][3][1] - direct[2][3][2] + direct[3][0][0] + direct[3][1][1] + direct[3][2][2],
    }
}