function Meteorite(target) {
    this.target = target;
    this.speed = random(3.5, 10)
    this.ps = new ParticleSystem(createVector(random(width), 0), map(this.speed, 3.5, 10, 15, 3) )
    this.points = [];
    this.points.push(target)
    this.noiseOffX = random(9999)
    this.noiseOffY = random(9999)

    this.run = function () {

        this.ps.run();

        if (this.ps.origin.y < this.target.y ) {
            this.ps.origin.x +=  (this.target.x - this.ps.origin.x) * 0.025;
            this.ps.origin.y += this.speed
            this.ps.addParticle();
            this.ps.addParticle();
            this.ps.addParticle()
        } else {
            this.ps.s -= 0.05
            this.noiseOffX += 0.0015
            this.noiseOffX += 0.015
            this.ps.origin.x +=  (noise(this.noiseOffX ,12 ) - 0.5)*2
            this.ps.origin.y += (noise(this.noiseOffY  ,56) )*0.5
            this.ps.addParticle();
        }

    }

}




/*
 * @name SmokeParticles
 * @description a port of Dan Shiffman's SmokeParticleSystem example originally
 * for Processing. Creates smokey particles :p
 */

function ParticleSystem(v, s) {

    this.particles = [];
    this.origin = v.copy(); // we make sure to copy the vector value in case we accidentally mutate the original by accident


    this.s = s

    this.run = function () {
        var len = this.particles.length;
        for (var i = len - 1; i >= 0; i--) {
            var particle = this.particles[i];
            particle.render(random(180, 255), random(0, 180), 0);
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
    var vx = randomGaussian() * .5;
    var vy = randomGaussian() * .5;
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
