var seed = 123;
var pgs

function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL)

    seed = random(5000)
    randomSeed(seed)
    rectMode(CENTER)
    imageMode(CORNER)

    pgs = []
    drawTexture()
}

function draw() {
    randomSeed(seed)
    backgroundGradient();

    // do the grid
    for (var i = -windowWidth / 2 + 100; i < windowWidth / 2; i += 200) {
        for (var j = -windowHeight / 2 + 200; j < windowHeight / 2; j += 300) {

            var s = random(50, 100) // size of each element
            var texId = int(random(pgs.length))
            drawEllipse(i, j, PI / 2, s, 6, int(random(4, 20)), texId); // recursive call to draw a cactus

            // the pot it stands in
            fill(191, 112, 27)
            stroke(171, 92, 7)
            quad(i - s / 2, j + s / 2, i + s / 2, j + s / 2, i + s / 4, j + s, i - s / 4, j + s)
            rect(i, j + s / 2, s, s / 4, 0, 0, 100, 100)
            fill(150, 73, 5)
            noStroke()
            rect(i, j + s * 0.63, s * 0.88, s / 25, 0, 0, 100, 100)

        }
    }
}


// the recursive call
function drawEllipse(x, y, rot, siz, level, detail, tex) {

    push()
    translate(x, y, 0)
    rotate(rot)

    texture(pgs[tex])
    ellipse(0, 0, siz, siz, detail);
    pop()

    if (level > 1) {

        level = level - 1;
        var newsiz = siz * 0.74;

        var rot1 = rot + rot * (random(-75, 75) / 100)
        var rot2 = rot + rot * random(-75, 75) / 100

        var newx1 = x - siz / 4 - newsiz / 2 * cos(rot)
        var newy1 = y - siz / 4 - newsiz / 2 * sin(rot)

        var newx2 = x + siz / 4 + newsiz / 4 * cos(rot)
        var newy2 = y - siz / 4 - newsiz / 2 * sin(rot)

        if (random(6) <= level) drawEllipse(newx1, newy1, rot1, newsiz, level, detail, tex);
        if (random(6) <= level) drawEllipse(newx2, newy2, rot2, newsiz, level, detail, tex);

        if (level < 5 && random(100) < 35) drawFlower(siz, x, y, rot, detail)

    } else if (level == 1) {
        drawFlower(siz, x, y, rot, detail)
    }


}

// recalculate on mouseReleased
function mouseReleased() {
    seed = random(9999)
    randomSeed(seed)
    drawTexture()
    //console.log(pgs.length)

}

// generate cactus texture = green grandient + yellow crosses
function drawTexture() {
    pgs = []

    // tex based on radial gradiant
    for (var e = 0; e < 5; e++) {

        var pg = createGraphics(100, 100)
        var res = random(5, 25)
        var baseGreen = random(50, 155)

        for (var k = 0; k < res; k++) {
            pg.noStroke()
            pg.fill(0, k * (100 / res) + baseGreen, 0)
            pg.ellipse(pg.width / 2, pg.height / 2, 100 - k * (100 / res), 100 - k * (100 / res))
        }

        pg.strokeWeight(random(0.5, 2))
        pg.stroke(255, 255, random(50, 200))
        var spacing = random(20, 50)

        for (var i = 0; i <= pg.width; i += spacing) {
            for (var j = 0; j <= pg.height; j += spacing) {


                var l = random(4, 8)
                pg.line(i, j - l, i, j + l)
                // l = random(4, 8)
                pg.line(i - l, j, i + l, j)
                //l = random(4, 8)
                pg.line(i - l, j - l, i + l, j + l)
                //l = random(4, 8)
                pg.line(i - l, j + l, i + l, j - l)

            }
        }
        pgs.push(pg)
    }

    // tex based on vertical lines
    for (var e = 0; e < 5; e++) {

        var pg = createGraphics(100, 100)
        var res = random(5, 25)
        var baseGreen = random(0, 90)

        for (var k = 0; k < 100; k += res) {
            pg.noStroke()
            pg.fill(0, random(50, 110) + baseGreen, 0)
            pg.rect(0, k, pg.width, res)
        }
        pg.strokeWeight(random(0.5, 2))
        pg.stroke(255, 255, random(50, 200))
        var spacing = random(20, 50)

        for (var i = 0; i <= pg.width; i += spacing) {
            for (var j = 0; j <= pg.height; j += spacing) {


                var l = random(4, 8)
                pg.line(i, j - l, i, j + l)
                // l = random(4, 8)
                pg.line(i - l, j, i + l, j)
                //l = random(4, 8)
                pg.line(i - l, j - l, i + l, j + l)
                //l = random(4, 8)
                pg.line(i - l, j + l, i + l, j - l)

            }
        }

        pgs.push(pg)
    }


}


// simple flower made of ellispes
function drawFlower(siz, x, y, rot, detail) {

    var newsiz = siz * 0.34;
    var newx1 = x - siz / 4 - newsiz / 2 * cos(rot)
    var newy1 = y - siz / 4 - newsiz / 2 * sin(rot)

    push()
    noStroke()
    translate(x, newy1)
    fill(255, 180, 220)
    ellipse(0, -newsiz / 1.5, newsiz * 0.5, newsiz * 1.3, detail)
    fill(200, 100, 220)
    rotate(-0.34)
    ellipse(-newsiz / 8, -newsiz / 2, newsiz * 0.5, newsiz, detail)
    rotate(0.68)
    ellipse(newsiz / 8, -newsiz / 2, newsiz * 0.5, newsiz, detail)
    pop()

}


function backgroundGradient() {
    var from = color(247, 236, 207);
    var to = color(207, 244, 247);
    for (var i = -windowHeight / 2; i < windowHeight / 2; i++) {
        var c = lerpColor(from, to, map(i, -windowHeight / 2, windowHeight / 2, 0, 1))
        stroke(c)
        line(-windowWidth / 2, i, windowWidth / 2, i)
    }

}
