ligthnings = []

function setup() {
    createCanvas(windowWidth, windowHeight)
    pixelDensity(1)
    background(0)
    colorMode(HSB,360, 100,100, 100)

}

function draw() {
    noStroke();
    fill(0, 15);
    rect(0, 0, width, height);

    for (var i = 0; i < ligthnings.length; i++) {
        ligthnings[i].update();
        if (ligthnings[i].life <0) ligthnings.splice(i,1)
    }

    if (mouseIsPressed) {

        if (frameCount%5 == 0) ligthnings.push(new Lightning(mouseX, mouseY))
    }

   //filter(ERODE)
 //   console.log(ligthnings.length)//

}



function Lightning(x, y) {

    this.x = width*0.5
    this.y = height*0.5
    this.xt =x
    this.yt =y
    this.life = 25

    this.xoff = random(9999)
    this.yoff = random(9999)


    this.update = function () {
        noFill()


        var d = dist(this.x, this.y, this.xt, this.yt)
        var dir = createVector(  this.xt - width*0.5 , + this.yt - height*0.5 ).heading()

        strokeWeight(5)
        stroke(random(54, 200), 40, 35 + random(75), this.life);
        beginShape();
        for (var i = 0; i < d; i++) {
            var x = this.x + i *cos((noise(this.xoff, frameCount * .01 , i*0.05) - 0.5) * PI/4 + dir);
            var y = this.y + i *sin((noise(this.yoff, frameCount * .01,  i*0.05) - 0.5) * PI/4 + dir) ;
            vertex(x,y)
        }
        endShape();

        strokeWeight(1)
        stroke(random(54, 200), 70, 35 + random(75), this.life+50);
        beginShape();
        for (var i = 0; i < d; i++) {
            var x = this.x + i *cos((noise(this.xoff, frameCount * .01 , i*0.05) - 0.5) * PI/4 + dir);
            var y = this.y + i *sin((noise(this.yoff, frameCount * .01,  i*0.05) - 0.5) * PI/4 + dir) ;
            vertex(x,y)
        }
        endShape();



        this.life -= 1;

    }



}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

}
