
var ms = ["Macabre", "Mischievous", "Mystic", "Marbled", "Mesmerising", "Metaphysical", "Mysterious", "Mythological", "Metaphoric"]
var os = ["Oak", "Ocean", "Ocarina", "Obelisk", "Oyster", "Ozone", "Output", "Oscillation"]
var ns = ["Names", "Narrates", "Nests", "Needs", "Normalizes", "Neglects"]
var ds = ["Deaf", "Dual", "Dummy", "Dreamy", "Drastic", "Dogmatic", "Disruptive", "Dystopian"]
var as = ["Adagio", "Antagonism", "Approximation", "Absolute", "Accumulation", "Achievement", "Agitation", "Algotihm"]
var ys = ["Youth", "Yellow", "Year", "Yoga", "Yo-yo", "Yodel", "Yucca", "Yesterday", "Yeti", "Yogurt", "Yeast"]

var cs = [["#05668D", "#028090", "#00A896", "#02C39A", "#F48F51"],
          ["#f9ecff", "#f2d9fb", "#cbffe8", "#b7f4da", "#a8f995"],
          ["#f9c8f7", "#f9d6b3", "#eef2a6", "#a6d0f0", "#6da3ff"],
          ["#DB2B39", "#FFB400", "#29335C", "#EFC69B", "#473144"],
          ["#29C2DC", "#FCE300", "#42E17A", "#663399", "#DCDCDC"],
          ["#31393C", "#FFB400", "#2176FF", "#33A1FD", "#FDCA40"]
         ]
var csId = 0;

var fonts = ['Monoton', 'Fredericka the Great', 'Faster One', 'Nosifer', 'Sancreek','Plaster']
var fontId = 5

var det = ["a", "the", "this","that", "any", "all", "each", "every"]
var detId = [0,1]

var img2
var img
var change = true;
var textDim

function setup() {
    createCanvas(windowWidth, windowHeight)
    //imageMode(CENTER)

    img = createGraphics(windowWidth, windowHeight)
    img.pixelDensity(1)
    img.background(0)
    img.textFont(fonts[fontId])
    textFont(fonts[fontId])
    textDim  = ((width + height) / 2) / 20
    generateAcrostich();


}

function draw() {

    // animation speed
    var steps = frameCount / 75

    // randomize stuff
    if (steps % TWO_PI > 5.5 && change == true && steps % TWO_PI < 6.17) {

        for (var i = 0 ; i < detId.length; i++){
            detId[i] = int(random(det.length))
        }
        csId = int (random(cs.length))
        fontId = int(random(fonts.length))
        generateAcrostich()
        change == false;
    } else if (steps % TWO_PI > 6.17) {
        change = true
    }

    // draw the rotating triangles according to a color palette
    img.background(0)
    var prevX = windowWidth / 2;
    var prevY = -windowHeight / 2
    var radius = windowWidth * windowHeight
    for (var i = 0; i < 5; i++) {
        var angle = map(i, 0, 4, 0, PI / 1.5)
        var xpos = 0 + radius * cos(angle)
        var ypos = 0 + radius * sin(angle)

        img.push()
        img.noStroke()
        img.translate(windowWidth / 2, windowHeight / 2)
        img.rotate(PI * 3 / 2 - steps);
        img.fill(cs[csId][i])
        img.triangle(0, 0, prevX, prevY, xpos, ypos)
        img.pop()

        prevX = xpos
        prevY = ypos

    }

    // do the blending of the accrostich mask and the rotating triangles image
    background(255)
    image(img, 0, 0)
    blend(img2, 0, 0, windowWidth, windowHeight, 0, 0, windowWidth, windowHeight, DARKEST)

    // display 'monday' as an overlay
    textFont(fonts[fontId])
    textAlign(LEFT, CENTER)
    textSize(textDim)
    fill(255)
    text("M", windowWidth * 0.12, windowHeight*0.25 + 0 * textDim)
    text("O", windowWidth * 0.12, windowHeight*0.25 + 1 * textDim)
    text("N", windowWidth * 0.12, windowHeight*0.25 + 2 * textDim)
    text("D", windowWidth * 0.12, windowHeight*0.25 + 3 * textDim)
    text("A", windowWidth * 0.12, windowHeight*0.25 + 4 * textDim)
    text("Y", windowWidth * 0.12, windowHeight*0.25 + 5 * textDim)

}

function generateAcrostich() {
    img2 = createGraphics(windowWidth, windowHeight)
    img2.textFont(fonts[fontId])
    img2.background(0)
    img2.textSize(textDim)
    img2.textAlign(LEFT, CENTER)

    img2.fill(255)
    img2.textSize(textDim/2)
    img2.text(det[detId[0]], windowHeight*0.025, windowHeight*0.25)
    img2.textSize(textDim)
    img2.text(ms[int(random(ms.length))], windowWidth * 0.12, windowHeight*0.25 + 0 * textDim)
    img2.text(os[int(random(os.length))], windowWidth * 0.12, windowHeight*0.25 + 1 * textDim)
    img2.text(ns[int(random(ns.length))], windowWidth * 0.12, windowHeight*0.25 + 2 * textDim)
    img2.textSize(textDim/2)
    img2.text(det[detId[1]], windowHeight*0.025, windowHeight*0.25 + 3 * textDim)
    img2.textSize(textDim)
    img2.text(ds[int(random(ds.length))], windowWidth * 0.12, windowHeight*0.25 + 3 * textDim)
    img2.text(as[int(random(as.length))], windowWidth * 0.12, windowHeight*0.25 + 4 * textDim)
    img2.textSize(textDim/2)
    img2.text("of " , windowHeight*0.025, windowHeight*0.25 + 5 * textDim)
    img2.textSize(textDim)
    img2.text(ys[int(random(ys.length))], windowWidth * 0.12, windowHeight*0.25 + 5 * textDim)


}


// recalculate on mouseReleased
function mouseReleased() {
    generateAcrostich()
    img.background(0)
}


