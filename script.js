let circleX = 0;
let circleY = 0;
let circleColour = "#fff";
let clearCircle = false;

function setup() {
    // Create screen reader accessible description
    textOutput();

    createCanvas(720, 400);

    // Use degrees as units for angles
    // The arc() function uses angles
    angleMode(DEGREES);

    // Draw a light gray background
    background(220);

}

function draw() {

    if (clearCircle == true) {

        background(220);

    }

    fill(circleColour);
    circle(circleX, circleY, 50);
}

$(window).on("load", init);

function init() {

    const handsfree = new Handsfree({ hands: true })
    handsfree.enablePlugins('browser')
    handsfree.start()
    handsfree.showDebugger();

    $('#debug').append(handsfree.debug.$wrap);

    handsfree.use('logger', data => {
        if (!data.hands) return
        if (data.hands.landmarksVisible[0]) {
            console.log(data.hands.landmarks[0][8].x)

            circleX = (1 - data.hands.landmarks[0][8].x) * 720;
            circleY = data.hands.landmarks[0][8].y * 400;
        }
    })

    handsfree.on('finger-pinched-0-0', () => {
        circleColour = "red";
    })

    handsfree.on('finger-pinched-released-0-0', () => {
        circleColour = "white";
    })    

    handsfree.on('finger-pinched-1-0', () => {
        clearCircle  = true;        
    })


    handsfree.on('finger-pinched-released-1-0', () => {
        clearCircle  = false;        
    })

}