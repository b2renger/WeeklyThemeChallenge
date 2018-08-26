
var pg

var noiseX, noiseY;

var noiseX2, noiseY2;

var noiseX3, noiseY3;

var noiseX4, noiseY4;

function setup() {
    createCanvas(windowWidth, windowHeight)
    pg = createGraphics(windowWidth / 7, windowHeight / 7)
    pg.pixelDensity(1)
    pg.colorMode(HSB, 360, 100,100,100)
    background(0)
    pixelDensity(1)
    seed = random(9999)
    strokeCap(ROUND)

    noiseX = random(10000);
    noiseY = random(10000);

    noiseX2 = random(10000);
    noiseY2 = random(10000);

    noiseX3 = random(10000);
    noiseY3 = random(10000);

    noiseX4 = random(10000);
    noiseY4 = random(10000);


}

function draw() {
    if (frameCount %25 ==0) console.log(frameRate())
    pg.background(0, 0, 0)

    for (var x = 0; x < pg.width; x++) {
        for (var y = 0; y < pg.height; y++) {
            var n = noise(x * 0.0023 + noiseX, y * 0.0023 + noiseY, frameCount * 0.0014);
            if (int(n * 231) % 17 == 0) {
                pg.stroke(152,56,40,255)
                pg.point(x, y);
            }
            var n2 = noise(x * 0.0123 + noiseX2, y * 0.1023 + noiseY2, frameCount * 0.0024);
              if (int(n2 * 211) % 23 == 0) {
                pg.stroke(194,69,40,255)
                pg.point(x, y);
            }

            var n3 = noise(x * 0.0053 + noiseX3, y * 0.0053 + noiseY3, frameCount * 0.0094);
              if (int(n3 * 192) % 7 == 0) {
                pg.stroke(242,30,40,255)
                pg.point(x, y);
            }

            var n4 = noise(x * 0.0077 + noiseX3, y * 0.0077 + noiseY3, frameCount * 0.014);
              if (int(n3 * 145) % 17 == 0) {
                pg.stroke(289,31,40,255 )
                pg.point(x, y);
            }
        }
    }

    pg.filter(ERODE)
   pg.filter(BLUR, 3);

    image(pg,0,0 , width, height)




}

function mousePressed(){
    noiseX = random(10000);
    noiseY = random(10000);

    noiseX2 = random(10000);
    noiseY2 = random(10000);

    noiseX3 = random(10000);
    noiseY3 = random(10000);

     noiseX4 = random(10000);
    noiseY4 = random(10000);
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
