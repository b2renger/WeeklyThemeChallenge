// centrer les carrés !!
var res = 150
var maxD = res * 1.5
var seed

function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(HSB, 360, 100, 100, 100)
    // rectMode(CORNER)
    background(0)
    pixelDensity(1)
    seed = random(5000)
    frameRate(30)
    strokeCap(SQUARE);
    background(0)

}

function draw() {

   // background(0, 0, 0)
    randomSeed(seed)
    strokeWeight(10)
    stroke(255,0,100, 50)
    point(lx, ly)
    strokeWeight(5)

    if (frameCount % 25 == 0) console.log(frameRate())

    for (var i = 0; i < 25; i++) {
        // strokeWeight(5)
        noFill()
        var s = int(random(6, 24))*5
        //var s2 = int(random(6, 24))*5
        var xpos = random(res, width - res)
        var ypos = random(res, height - res)
        noStroke()
        stroke(0);
        fill(0)
        ellipse(xpos,ypos,s)

        strokeWeight(5)
        drawLightEllipse(xpos, ypos, s-4, 0.095, 4  )

        noFill()
        strokeWeight(2)
        drawLightEllipseContour(xpos, ypos, s, 0.034)





    }

    updateLightSource()

}

var lx = 0
var ly = 0
var t = 0
var step = 0.0055
var p = 3
var q = 4
var phi = Math.PI / 2
var change = false;

function updateLightSource() {

    lx = ((width  / 2)-res) * sin(p * t) + width / 2;
    ly = ((height / 2)-res) * sin(q * t + phi) + height / 2;
    t += step

    if (int(t % PI) == 0 && change == true) {
        background(0)
        p = int(random(3, 9))
        q = int(random(3, 9))
        steps = (p + q) / 7000
        seed = random(9999)
        change = false
    }

    if (t % PI > 1) change = true
}



function drawLightRect(x, y, w, h, r) {
    for (var i = x; i < (x + w); i += r) {
        for (var j = y; j < (y + h); j += r) {
            var d = dist(lx, ly, i, j)
            if (d < maxD) {
                var gray = map(d, 0, maxD, 255, 50)
                var hu = map(d, 0, maxD, 0, 280)
                stroke(hu, 100, 100,gray/3)
                point(i, j)
            }
        }
    }
}



function drawLightEllipse(x, y, s, r,r2) {
    for (var i = 0; i <= TWO_PI; i += r) {
        for (var j = r2; j < (s / 2 ); j += r2) {
            var xpos = x + int(j) * cos(i)
            var ypos = y + int(j )* sin(i)
            var d = dist(lx, ly, xpos, ypos)
            if (d < maxD) {
                var gray = map(d, 0, maxD, 255, 100)
                var hu = map(d, 0, maxD, 0, 280)
                stroke(hu, 90, 100, gray / 5)
                point( xpos, ypos)
            }
        }
    }
}

function drawLightEllipseContour(x, y, s, r) {
    for (var i = 0; i <= TWO_PI; i += r) {
        var xpos = x + int(s / 2) * cos(i)
        var ypos = y + int(s / 2) * sin(i)
        var d = dist(lx, ly, xpos, ypos)
        if (d < maxD) {
            var gray = map(d, 0, maxD, 255, 50)
            stroke(255,0,100, 2)
            line(lx, ly, xpos, ypos)
        }
    }
}


function drawLightRectContour(x, y, w, h, r) {
    for (var i = x; i <= x + w; i += r) {
        var d = dist(lx, ly, i, y)
        if (d < maxD) {
            var gray = map(d, 0, maxD, 255, 50)
            stroke(255, 2)
            line(lx, ly, i, y)
        }
        var d = dist(lx, ly, i, y + h)
        if (d < maxD) {
            var gray = map(d, 0, maxD, 255, 50)
            stroke(255, 2)
            line(lx, ly, i, y + h)
        }
    }

    for (var j = y; j <= y + h; j += r) {
        var d = dist(lx, ly, x, j)
        if (d < maxD) {
            var gray = map(d, 0, maxD, 255, 50)
            stroke(255, 2)
            line(lx, ly, x, j)
        }
        var d = dist(lx, ly, x + w, j)
        if (d < maxD) {
            var gray = map(d, 0, maxD, 255, 50)
            stroke(255, 2)
            line(lx, ly, x + w, j)
        }
    }
}

function mouseReleased() {
    background(0)
    seed = random(9999)
    t = 0
    p = int(random(3, 9))
    q = int(random(3, 9))

    step = (p + q) / 7000
    //phi = random(TWO_PI)
    // seed = random(9999)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
