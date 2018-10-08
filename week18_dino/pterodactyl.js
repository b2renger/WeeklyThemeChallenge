function Ptero() {
    this.x = random(width)
    this.y = random(height)
    this.px = this.x
    this.py = this.y
    this.len = 2
    this.ang = 0
    this.xfactor = random(500, 1000)
    this.yfactor = random(500, 1000)
    this.lenfactor = random(25, 100)
    this.flap = 3
    this.flapfactor = random(500, 1500)

    this.run = function () {

        this.x += (noise(frameCount / this.xfactor, this.xfactor + 12) - 0.5) * 6
        this.y += (noise(frameCount / this.yfactor, this.yfactor + 14) - 0.5) * 6
        this.len = 5 + (noise(frameCount / this.lenfactor, this.lenfactor)) * 50
        this.flap = 2 + (noise(frameCount / this.flapfactor, this.flapfactor)) * 3.5
        this.ang = map(this.x - this.px, -4, 4, -0.75, 0.75);

        this.draw_ptero()
        this.wrap()

        this.px = this.x
        this.py = this.y

        this.y = constrain(this.y, 5, height * .60)

    }

    this.draw_ptero = function () {
        push()
        translate(this.x, this.y);
        rotate(this.ang)
        fill(0)
        stroke(0)
        for (var q = 0; q < this.len; q += 2) {
            /* The angle is to make the movement */
            var angle = cos(radians(this.len - q + frameCount * this.flap)) * q;

            var x1 = sin(radians(-90 - angle)) * (q * 3);
            var y1 = cos(radians(-90 - angle)) * (q * 3);
            var x2 = cos(radians(-angle)) * (q * 3);
            var y2 = sin(radians(-angle)) * (q * 3);
            //ellipse(0, 0, this.len / 2, this.len / 8)
            triangle(this.len/4, 0 , -this.len/4, 0, (noise(frameCount/100) - 0.5)*this.len/2, 5)
            triangle(this.len/4, 0 , -this.len/4, 0, (noise(frameCount/100) - 0.5)*this.len/2, -2)
            bezier(-5, 0, x1 / 2, y1 / 2, x1 / 2, y1 / 2, x1, y1);
            bezier(5, 0, x2 / 2, y2 / 2, x2 / 2, y2 / 2, x2, y2);
            line(0, 0, -5, 10)
            line(-5,10, -3, 12)
            line(0, 0, 5, 10)
            line(5,10, 3, 12)
        }
        pop()
    }

    this.wrap = function () {
        if (this.x < 0) {
            this.x = width
            this.xfactor = random(500, 1000)
            this.yfactor = random(500, 1000)
            this.lenfactor = random(25, 100)
            this.flap = 3
            this.flapfactor = random(500, 1500)

        }

        if (this.x > width) {
            this.x = 0
            this.xfactor = random(500, 1000)
            this.yfactor = random(500, 1000)
            this.lenfactor = random(25, 100)
            this.flap = 3
            this.flapfactor = random(500, 1500)
        }


    }
}
