ligthnings = []

function setup() {
    createCanvas(windowWidth, windowHeight)
    pixelDensity(1)
    background(0)
    colorMode(HSB, 360, 100, 100, 100)
    strokeJoin(BEVEL)

}

function draw() {
    noStroke();
    fill(0, 25);
    rect(0, 0, width, height);

    for (var i = 0; i < ligthnings.length; i++) {
        ligthnings[i].update();
        if (ligthnings[i].life < 0) ligthnings.splice(i, 1)
    }

    if (mouseIsPressed) {

        if (frameCount % 5 == 0) ligthnings.push(new Lightning(width * 0.5, height * 0.5, mouseX, mouseY))
    }

    //filter(ERODE)
    //   console.log(ligthnings.length)//

}



function Lightning(posx, posy, x, y) {

    this.x = posx
    this.y = posy
    this.xt = x
    this.yt = y
    this.life = 15

    this.xoff = random(9999)
    this.yoff = random(9999)

    this.branches = 0
    this.splitfactor = int (random(15, 40)) /10


    this.update = function () {
        noFill()


        var d = dist(this.x, this.y, this.xt, this.yt)
        var dir = createVector(this.xt - width * 0.5, +this.yt - height * 0.5).heading()

        strokeWeight(3)
        stroke(random(54, 292), 40, 75 + random(75), this.life);
        beginShape();
        for (var i = 0; i < d; i++) {
            var x = this.x + i * cos((noise(this.xoff, frameCount * .01, i * 0.025) - 0.5) * PI / 4 + dir);
            var y = this.y + i * sin((noise(this.yoff, frameCount * .01, i * 0.025) - 0.5) * PI / 4 + dir);
            vertex(x, y)

            if (i == int(d / this.splitfactor) && this.branches < 2 && d > 100) {
                this.branches +=1
                var newAngle = random(-PI/2, PI/2)
                ligthnings.push( new Lightning(x, y, x + (d / 2) * cos(newAngle), y + (d / 2) * sin(newAngle)))
            }
        }
        endShape();

        /*
        strokeWeight(1)
        stroke(random(54, 200), 70, 35 + random(75), this.life );
        beginShape();
        for (var i = 0; i < d; i++) {
            var x = this.x + i * cos((noise(this.xoff, frameCount * .01, i * 0.05) - 0.5) * PI / 4 + dir);
            var y = this.y + i * sin((noise(this.yoff, frameCount * .01, i * 0.05) - 0.5) * PI / 4 + dir);
            vertex(x, y)
        }
        endShape();*/

        this.life -= 1;

    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

}
