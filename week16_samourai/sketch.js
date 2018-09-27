let fastStyle;
let video;

let cameraReady = false;
let startPredict = false;

let resultImg1;
let resultImg2;
let resultImg3;
let resultImg4;

let modelReady1 = false;
let modelReady2 = false;
let modelReady3 = false;
let modelReady4 = false;

let resultw = 300
let resulth = 300

var image1
var image2
var image3
var image4

var thumbW = 150
var thumbH = 250

var timeout = 100


function setup() {
    createCanvas(windowWidth, windowHeight)
    pixelDensity(1);
    background(0);
    video = createCapture(VIDEO, cameraLoaded);
    video.size(resultw, resulth);
    video.hide();

    resultImg1 = createImg('');
    resultImg1.hide();
    resultImg2 = createImg('');
    resultImg2.hide();
    resultImg3 = createImg('');
    resultImg3.hide();
    resultImg4 = createImg('');
    resultImg4.hide();

    image1 = loadImage("images/samourai1.jpg")
    image2 = loadImage("images/samourai2.jpg")
    image3 = loadImage("images/samourai3.jpg")
    image4 = loadImage("images/samourai4.jpg")

    style1 = new ml5.StyleTransfer('models/samourai1', modelLoaded1);
    style2 = new ml5.StyleTransfer('models/samourai2', modelLoaded2);
    style3 = new ml5.StyleTransfer('models/samourai3', modelLoaded3);
    style4 = new ml5.StyleTransfer('models/samourai4', modelLoaded4);
}

function draw() {

    image(resultImg1, 0, 0, windowWidth / 2, windowHeight / 2);
    image(image1, windowWidth / 2 - thumbW, windowHeight / 2 - thumbH, thumbW, thumbH)
    image(resultImg2, windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
    image(image2, windowWidth / 2 , windowHeight / 2 - thumbH, thumbW, thumbH)
    image(resultImg3, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);
    image(image3, windowWidth / 2 , windowHeight / 2 , thumbW, thumbH)
    image(resultImg4, 0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
    image(image4, windowWidth / 2 - thumbW, windowHeight / 2 , thumbW, thumbH)

    stroke(0)
    strokeWeight(4)
    line(windowWidth/2, 0, windowWidth/2, windowHeight)
    line(0, windowHeight/2, windowWidth, windowHeight/2)


}

function cameraLoaded() {
    cameraReady = true;
}

function modelLoaded1() {
    modelReady1 = true;
    predict1()
}

function modelLoaded2() {
    modelReady2 = true;
    predict2()
}

function modelLoaded3() {
    modelReady3 = true;
    predict3()
}

function modelLoaded4() {
    modelReady4 = true;
    predict4()
}




function predict1() {
    if (cameraReady && modelReady1)  {
        const result = style1.transfer(video.elt);
        resultImg1.attribute('src', result.src);
    }
    setTimeout(() => predict1(), timeout);
}

function predict2() {
    if (cameraReady && modelReady2)  {
        const result = style2.transfer(video.elt);
        resultImg2.attribute('src', result.src);
        setTimeout(() => predict2(), timeout);
    }
}

function predict3() {
    if (cameraReady && modelReady3)  {
        const result = style3.transfer(video.elt);
        resultImg3.attribute('src', result.src);
        setTimeout(() => predict3(), timeout);
    }
}

function predict4() {
    if (cameraReady && modelReady4)  {
        const result = style4.transfer(video.elt);
        resultImg4.attribute('src', result.src);
        setTimeout(() => predict4(), timeout);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
