var img = null;


var psPM10 = null;
var psPM25 = null;


var pm10Number = 0
var pm25Number = 0
var windSpeed = 1
var windDirection = 0

var noiseX
var noiseY


function preload(){
    img = loadImage("assets/texture.png")
}

function getPollutionData() {
    // get pollution data from http://aqicn.org
    httpGet("https://api.waqi.info/feed/Nantes/?token=f6a211c73567fe5a3153635406248a8d597676f9", 'json', function (response) {

        console.log(response)
        pm10Number = int(response.data.iaqi.pm10.v)
        pm25Number = int(response.data.iaqi.pm25.v)
        setTimeout(() => getPollutionData(), 5000); // data gets refreshed every
    })
}

function getWeatherData() {
    // get pollution data from http://aqicn.org
    httpGet("https://api.openweathermap.org/data/2.5/weather?q=Nantes&appid=ac2e4efcdec49f1efaca3ff012a01c79", 'json', function (response) {

        console.log(response)
        windSpeed = response.wind.speed
        windDirection = response.wind.deg
        setTimeout(() => getWeatherData(), 5000); // data gets refreshed every
    })
}


function setup() {
    createCanvas(windowWidth, windowHeight)

    getPollutionData()
    getWeatherData()

    pixelDensity(1)
    background(0)
    frameRate(35)

    psPM10 = new ParticleSystem(createVector(width * 0.5, height * 0.5), 222, 255, 200, 50);
    psPM25 = new ParticleSystem(createVector(width * 0.5, height * 0.5), 255, 255, 200, 15);

    noiseX = random(9999)
    noiseY = random(9999)
    imageMode(CENTER)
    textSize(16)
}

function draw() {
    background(0);
    push()
    //translate(width/2, height/2)
    noiseX += 0.4
    noiseY += 0.09

    var rad = (noise(noiseX, 10) - 0.5)*5 + windSpeed/2
    var orientation = (noise(noiseY, 23) - 0.5)*45 + windDirection

    var dx = rad * cos(radians(orientation))
    var dy = rad * sin(radians(orientation))
    var wind = createVector(dx, dy);

    psPM10.applyForce(wind);
    psPM10.run();
    psPM25.applyForce(wind);
    psPM25.run();

    for (var i = 0; i < pm10Number; i++) {
        psPM10.addParticle();
    }
    for (var i = 0; i < pm25Number; i++) {
        psPM25.addParticle();
    }
    if (frameCount % 25 == 0) console.log(frameRate())

    tint(222, 255, 200)
    image(img, width * 0.25, height - 50, 75, 75)
    tint(255, 255, 200)
    image(img, width * 0.75, height - 50, 25, 25)
    fill(255)
    textAlign(CENTER, CENTER)
    text("PM10 components : " + pm10Number + " ug/m3", width * 0.25, height - 15)
    text("PM25 components : " + pm25Number + " ug/m3", width * 0.75, height - 15)
    text("wind speed: " + windSpeed + " m/s, wind direction: " + windDirection + " degres", width * 0.5, height - 15)
    pop()
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    psPM10.origin = createVector(width * 0.5, height * 0.5)
    psPM25.origin = createVector(width * 0.5, height * 0.5)
}

/*
 * @name SmokeParticles
 * @description a port of Dan Shiffman's SmokeParticleSystem example originally
 * for Processing. Creates smokey particles :p
 */

function ParticleSystem(v, r, g, b, s) {

    this.particles = [];
    this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident

    this.r = r
    this.g = g
    this.b = b
    this.s = s

    this.run = function () {
        var len = this.particles.length;
        for (var i = len - 1; i >= 0; i--) {
            var particle = this.particles[i];
            particle.render(this.r, this.g, this.b);
            particle.update();
            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    this.applyForce = function (dir) {
        var len = this.particles.length;
        for (var i = 0; i < len; ++i) {
            this.particles[i].applyForce(dir);
        }
    }

    this.addParticle = function () {
        this.particles.push(new Particle(this.origin, this.s));
    }
}
//========= PARTICLE  ===========

function Particle(pos, s) {
    this.loc = pos.copy();
    var vx = randomGaussian() * 1.5;
    var vy = randomGaussian() * 1.5 ;
    this.vel = createVector(vx, vy);
    this.acc = createVector();
    this.lifespan = 25.0;
    this.s = s

    this.render = function (r, g, b) {
        noStroke()
        for (var i = 0; i < this.s; i += 5) {
            fill(r, g, b, this.lifespan)
            ellipse(this.loc.x, this.loc.y, this.s - i)
        }
        /* tint is very slow
        imageMode(CENTER);
        tint(r, g, b, this.lifespan);
        image(img, this.loc.x, this.loc.y, this.s, this.s);
        */
    }

    this.applyForce = function (f) {
        this.acc.add(f);
    }

    this.isDead = function () {
        if (this.lifespan <= 0.0) {
            return true;
        } else {
            return false;
        }
    }
    this.update = function () {
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.lifespan -= 1.05;
        this.acc.mult(0);
    }
}
