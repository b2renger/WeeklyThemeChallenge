var capture;
var previousPixels;
var flow;
var w = 320,
    h = 240;
var step = 3;

var xrots = []
var yrots = []
var zpush = []

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0)
    //lights()
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function () {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.hide();
    flow = new FlowCalculator(step);
    //colorMode(HSB, 360, 100, 100, 100)
    pixelDensity(1)

    for (var i = 0; i < 1530; i++) {
        xrots[i] = 0
        yrots[i] = 0
        zpush[i] = 0

    }
}

function draw() {
    push()
    translate(-width / 2, -height / 2)
    background(0)
    if (frameCount % 25 == 0) console.log(frameRate())
    capture.loadPixels();
    if (capture.pixels.length > 0) {
        if (previousPixels) {
            // cheap way to ignore duplicate frames
            if (same(previousPixels, capture.pixels, step, width)) {
                return;
            } else {
                flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
            }
        }
        previousPixels = copyImage(capture.pixels, previousPixels);
        if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {

            noStroke()
            pointLight(210, 210, 255, width / 2, 0, -700);
            pointLight(255, 210, 210, -width / 2, 0, -700)
            pointLight(255, 210, 210, -width / 2, 0, 200)
            pointLight(210, 210, 255, width / 2, 0, 200);
            pointLight(255, 210, 210, 0, height / 2, 200)
            pointLight(210, 210, 255, 0, -height / 2, 200);
            pointLight(255, 210, 210, 0, height / 2, -700)
            pointLight(210, 210, 255, 0, -height / 2, 700);

            for (var i = 0; i < flow.flow.zones.length; i++) {

                var xpos = map(flow.flow.zones[i].x, w, 0, 0, windowWidth)
                var ypos = map(flow.flow.zones[i].y, 0, h, 0, windowHeight)
                push()

                var flowX = constrain(flow.flow.zones[i].u, -PI / 3, PI / 3)
                var flowY = constrain(flow.flow.zones[i].v, -PI / 3, PI / 3)

                var flowAvg = constrain(abs(flow.flow.zones[i].v) + abs(flow.flow.zones[i].v), 0, 10)

                if (flow.flow.zones[i].u > 2 || flow.flow.zones[i].u < -2){
                    xrots[i] = attract(xrots[i], flowX, 0.15)
                }
                else {
                    xrots[i] = attract(xrots[i], 0, 0.15)
                }

                if (flow.flow.zones[i].v > 2 || flow.flow.zones[i].v < -2){
                    yrots[i] = attract(yrots[i], flowY, 0.15)
                }
                else {
                     yrots[i] = attract(yrots[i], 0, 0.15)
                }


                if (flowAvg > 7) {
                    zpush[i] = attract(zpush[i], flowAvg, 0.15)
                } else {
                    zpush[i] = attract(zpush[i], 0, 0.15)
                }

                translate(xpos, ypos, zpush[i] * 7);
                rotateY(-xrots[i])
                rotateX(-yrots[i])

                box(45, 30)
                pop()


            }
        }
    }
    pop()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function attract(position, target, sensibility) {
    return (target - position) * sensibility + position;
}


// copy an array, creating a new array if necessary
// usage: dst = copyImage(src, dst)
// based on http://jsperf.com/new-array-vs-splice-vs-slice/113
function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) {
        dst = new src.constructor(n);
    }
    while (n--) {
        dst[n] = src[n];
    }
    return dst;
}

function same(a1, a2, stride, n) {
    for (var i = 0; i < n; i += stride) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}
