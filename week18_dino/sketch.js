// add meteorites with particle system on explosio and lava steam
// rework ptero : head and legs / reinit size flap etc when going off screen / let them fly off at the top and constrain at the bottom

function preload() {

}

var ptero = []
var meteorites = []

function setup() {
    createCanvas(windowWidth, windowHeight)
    pixelDensity(1)
    background(0)

    for (var i = 0; i < 4; i++) {
        ptero[i] = new Ptero()
    }

    backgroundGroundGradient()
    drawMountains()

}

function draw() {
    //background(0);
    //background(0);
    backgroundSkyGradient()
    drawMountains()
    backgroundGroundGradient()

    fill(79, 90, 76)

    for (var i = 0; i < ptero.length; i++) {
        ptero[i].run()
    }

    for (var i = 0; i < meteorites.length; i++) {
        meteorites[i].run()
         if (meteorites[i].ps.origin.x < 0 || meteorites[i].ps.origin.x > width || meteorites[i].ps.origin.y > height) {
             meteorites.splice(i,1)
         }
    }

    if (frameCount %45 == 0) meteorites.push(new Meteorite(createVector(random(width * 0.02, width * 0.98), random(height * 0.75, height *0.90))))

    console.log(meteorites.length)
}

function drawMountains() {
    beginShape();
    fill(100, 76, 76)
    noStroke()
    //vertex(0, height);
    vertex(0, height * 0.76)
    for (var i = 0; i < width; i += 5) {
        var xpos = i;
        var ypos = noise(i / 250, 15) * 150;
        vertex(xpos, -ypos + height * 0.76)
    }
    vertex(width, height * 0.76)
    //vertex(width, height)
    endShape(CLOSE);

}

function backgroundSkyGradient() {
    push()
    strokeWeight(5)
    var from = color(103, 0, 207);
    var to = color(255, 194, 103);
    for (var i = 0; i < height * 0.75; i += 5) {
        var c = lerpColor(from, to, map(i, 0, height * 0.75, 0, 1))
        stroke(c)
        line(0, i, width, i)
    }
    pop()
}

function backgroundGroundGradient() {
    /*noStroke()
    fill(130, 106, 106, 5)
    rect(0, height*0.72, width, height*0.28)*/

    push()
    strokeWeight(1)
    var from = color(100, 76, 76, 100);
    var to = color(150, 126, 116,100);
    for (var i = height * 0.75; i < height; i += 1) {
        var c = lerpColor(from, to, map(i, height * 0.75, height, 0, 1))

        stroke(c)
        line(0, i, width, i)
    }
    pop()
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

}
