let velY;
let yCirculo;
let xCirculo;
let diametro;

function setup() {
    createCanvas(windowWidth, windowHeight);

    velY = 8;
    diametro = 70;
    yCirculo = 25;
}

function draw() {
    background(210);


    ellipse(xCirculo, yCirculo, diametro);

    yCirculo += velY;

    if (yCirculo >= height || yCirculo <= 0) {
        yCirculo = 25;
        xCirculo = random(0, width);
    }
}