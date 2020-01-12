let video1;

let constraints1;

let poses1 = [];

let poseNet1;

let helFont; //variable for the font
//details for the score 

//size of the circle on start
let size = 20;

let pg;
let x = 0;
let txt;


function preload() {
    helFont = loadFont('myfont.otf');
    txt = loadStrings('/sec144.txt')
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    pg = createGraphics(400, 400)

    video1 = createCapture(VIDEO);
    // video2 = createCapture(constraints2);
    //video1.size(video1.width*4, video1.height*3)
    video1.hide();
    //load posenet
    poseNet1 = ml5.poseNet(video1, modelLoaded);
    poseNet1.on('pose', function (results) {
        poses1 = results;
    });



}
// When the model is loaded
modelLoaded = function () {
    console.log('Model Loaded!');
}

function draw() {
    background(0);
    push()
    translate(video1.width, 0)
    scale(-1, 1)
    image(video1, 0, 0);
    drawKeypoints1();
    pop()
    detectDetention();
    scrollText()



}

function detectDetention() {
    for (let i = 0; i < poses1.length; i++) {
        if (poses1.length > 4 && poses1[i].pose.score > 0.9) {

            text("detained", width / 2, height - 150);
            // save("test.png");
            saveFrames('out', 'png', 1, 1, data => {
                print(data);
            });
        } else {

            text("awaiting", width / 2, height - 150);
            //save("test.png")
        }
    }

}

function drawKeypoints1() {

    //initiating the poses and nose keypoint for video1
    for (let i = 0; i < poses1.length; i++) {
        let pr = poses1[i].pose.keypoints[0];

        if (poses1[i].pose.score > 0.20) {
            //fill(255, 0, 0, 100);
            noStroke();
            //ellipse(pr.position.x, pr.position.y, size);
            textAlign(CENTER, CENTER)
            textSize(100)
            text("🤬", pr.position.x, pr.position.y)
        }
    }


}

function scrollText() {
    fill(255)
    textSize(30)
    // let stringWidth = textWidth(txt);
    //print(stringWidth)
    //print(txt.length)
    text(txt, x + 20, height - 50)
    if (x < -38000) {
        // print(x)
        x = width;
    } else {

        x--
    }
}

function keyPressed() {
    if (keyCode == 80) {
        startPlay = !(startPlay);
        console.log(startPlay);
    } else if (keyCode == 82) {
        console.log("r is pressed");
        resetScreen = true;
    }


}
