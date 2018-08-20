var resX = 75
var resY = 25

function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(HSB,360,100,100,100)
   pixelDensity(1)
    cpt = 0
    steps = 0.000005;


}

function draw() {
    push()
    translate(width/2, height/2)
    background(0,0,250)
    strokeWeight(2)
    stroke(255)


    for (var j = -height/2 -resY; j <= height/2; j += resY ){
        beginShape();
        fill( 160 + noise(frameCount/50,j /100) *50, 50 + j/10, 90,50)
         for (var i = -width/2- resX; i <= width/2 +resX*2; i += resX ){

             cpt+= (noise(j/height*2, i /width*2) +1) * steps;
            curveVertex (i, j + (noise(cpt, i,j )-0.5)*resX*1.6)  /*i+resX,j+ (noise(cpt, i+resX,j )-0.5)*resX*2)*/

         }
        vertex(width/2, height/2);
        vertex(-width/2, height/2)

        endShape(CLOSE)
    }
  pop()
}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
