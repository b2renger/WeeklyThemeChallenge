var capture;
var w
var h
var mic

var pg1, pg2, pg3, pg4

function setup() {
    capture = createCapture(VIDEO);

    createCanvas(windowWidth, windowHeight);
    //imageMode(CENTER)

    w = 640,
        h = 480;

    pixelDensity(1)
    capture.size(w, h);
    capture.hide();

    pg1 = createGraphics(w, h)
    pg2 = createGraphics(w, h)
    pg3 = createGraphics(w, h)
    pg4 = createGraphics(w, h)

    mic = new p5.AudioIn()
    mic.start();

    background(0)
}

function draw() {
    background(0)

    var micLevel = mic.getLevel() * 100; // 0.5 is a smoothing value

    pg1.image(capture, (noise(micLevel, 15) - 0.5) * 100, 0)
    pg1.filter(INVERT)

    pg2.image(capture, (noise(micLevel, 65) - 0.5) * 100, 0)
    pg2.filter(POSTERIZE, 5)

    pg3.image(capture, 0, (noise(micLevel,98) - 0.5) * 200)
    pg3.filter(ERODE)
    pg3.tint(0, 123, 255, 126);

    pg4.image(capture, 0, (noise(micLevel,32) - 0.5) * 200)
    pg4.filter(ERODE)
    pg4.tint(255, 111, 13, 126);


    if (micLevel < 10) {
        blend(pg1, 0, 0, w, h, 0, 0, width, height, LIGHTEST);
        blend(pg2, 0, 0, w, h, 0, 0, width, height, ADD);
    } else {
        blend(pg1, 0, 0, w, h, 0, 0, width, height, DARKEST);
        blend(pg2, 0, 0, w, h, 0, 0, width, height, ADD);
    }


    blend(pg3, 0, 0, w, h, 0, 0, width, height, LIGHTEST);
    blend(pg4, 0, 0, w, h, 0, 0, width, height, LIGHTEST);








}

function mousePressed() {


}
