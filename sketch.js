let imagensElementos;
let elms;

let elemClass = [];
let numElementos = 15;

let escolher;

let tentativas = 3;

let perdeu = false;

function preload() {
    elem1 = loadImage('/data/elem1.jpg');
    elem2 = loadImage('/data/elem2.jpg');
    elem3 = loadImage('/data/elem3.jpg');
    elem4 = loadImage('/data/elem4.jpg');
    elem5 = loadImage('/data/elem5.jpg');
    elem6 = loadImage('/data/elem6.jpg');
    elem7 = loadImage('/data/elem7.jpg');
    elem8 = loadImage('/data/elem8.png');
    elem9 = loadImage('/data/elem9.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    imagensElementos = [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9];
    imagensElementos[Math.floor(Math.random(0, 8) * imagensElementos.length)];


    escolher = shuffle(imagensElementos).slice(0, 3);


    for (i = 0; i < numElementos; i++) {
        elemClass[i] = new Elementos(random(0, width), -15, random(3, 8), 120);
    }
}

function draw() {
    background(210);


    if (perdeu == false) {
        for (i = 0; i < elemClass.length; i++) {
            elemClass[i].desenhar();
            elemClass[i].cicloMover();
            elemClass[i].avaliarMover();
        }

        apanharElem();
    }


    fill(255);
    stroke(0);
    strokeWeight(2);
    image(escolher[0], 50, 50, 50, 50);
    let imagem1 = text('0/1', 50, 55);
    image(escolher[1], 105, 50, 50, 50);
    let imagem2 = text('0/1', 105, 55);
    image(escolher[2], 160, 50, 50, 50);
    let imagem3 = text('0/1', 160, 55);

    text('Tens ' + tentativas + ' tentativas!', 15, 15);
}

function apanharElem() {
    if (mouseX > escolher[0, 1, 2].x - escolher[0, 1, 2].diametro / 2 && mouseX < escolher[0, 1, 2].x + escolher[0, 1, 2].diametro / 2) {
        if (mouseY > escolher[0, 1, 2].y - escolher[0, 1, 2].diametro / 2 && mouseY < escolher[0, 1, 2].y + escolher[0, 1, 2].diametro / 2) {
            imagem1 = text('1/1', 50, 55);
            imagem2 = text('1/1', 105, 55);
            imagem3 = text('1/1', 160, 55);
        }
    } else {
        tentativas--;

        if (tentativas <= 0) {
            perdeu = true;
        }
    }
}

class Elementos {
    constructor(x, y, vely, diametro) {
        this.x = x;
        this.y = y;
        this.vely = vely;
        this.diametro = diametro;
        this.imagem = imagensElementos[Math.floor(Math.random(0, 8) * imagensElementos.length)];
    }

    desenhar() {
        image(this.imagem, this.x, this.y, this.diametro, this.diametro);
    }

    cicloMover() {
        this.y += this.vely;
    }

    avaliarMover() {
        if (this.y >= height) {
            this.y = -15;
            this.x = random(0, width);

            this.imagem;
        }
    }
} 