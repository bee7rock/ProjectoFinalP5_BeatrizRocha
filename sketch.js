let imagensElementos;

let elemClassN = [];
let numElementosN = 10;

let elemClassEs = [];
let numElementosEs = 2;

let escolher = [];

let pontuacao_1 = 0;
let pontuacao_2 = 0;
let pontuacao_3 = 0;

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

    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    imagensElementos = [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9];
    imagensElementos[Math.floor(Math.random(0, 8) * imagensElementos.length)];


    nums = shuffle(nums).slice(0, 3);

    for (i = 0; i < nums.length; i++) {
        escolher[i] = imagensElementos[nums[i]]
        imagensElementos.splice(nums[i], 1);
    }
    //   escolher = shuffle(nums).slice(0, 3);
    console.log(escolher, nums)
    //  imagensElementos.splice(escolher[0], 1);

    for (i = 0; i < numElementosN; i++) {
        elemClassN[i] = new Elementos(random(0, width), -15, random(3, 8), 120);
    }

    for (i = 0; i < numElementosEs; i++) {
        elemClassEs[i] = new ElemEscolhidos(random(0, width), -15, random(0, width), -15, random(0, width), -15, random(3, 8), 120, escolher);
    }
}

function draw() {
    background(210);

    if (perdeu == false) {
        for (i = 0; i < elemClassN.length; i++) {
            elemClassN[i].desenhar();
            elemClassN[i].cicloMover();
            elemClassN[i].avaliarMover();
        }

        for (i = 0; i < elemClassEs.length; i++) {
            elemClassEs[i].desenhar();
            elemClassEs[i].cicloMover();
            elemClassEs[i].avaliarMover();
        }
    }

    fill(255);
    stroke(0);
    strokeWeight(2);
    image(escolher[0], 50, 50, 50, 50);
    let imagem1 = text(`${pontuacao_1}/1`, 50, 55);
    image(escolher[1], 105, 50, 50, 50);
    let imagem2 = text(`${pontuacao_2}/1`, 105, 55);
    image(escolher[2], 160, 50, 50, 50);
    let imagem3 = text(`${pontuacao_3}/1`, 160, 55);

    text('Tens ' + tentativas + ' tentativas!', 15, 15);
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
        }
    }
}


class ElemEscolhidos {
    constructor(x_1, y_1, x_2, y_2, x_3, y_3, vely, diametro, escolher) {
        this.x_1 = x_1;
        this.y_1 = y_1;
        this.x_2 = x_2;
        this.y_2 = y_2;
        this.x_3 = x_3;
        this.y_3 = y_3;
        this.vely = vely;
        this.diametro = diametro;
        this.escolher = escolher;
    }

    desenhar() {
        image(this.escolher[0], this.x_1, this.y_1, this.diametro, this.diametro);
        image(this.escolher[1], this.x_2 + 100, this.y_2 + 150, this.diametro, this.diametro);
        image(this.escolher[2], this.x_3 + 250, this.y_3 + 200, this.diametro, this.diametro);
    }

    cicloMover() {
        this.y_1 += this.vely;
        this.y_2 += this.vely;
        this.y_3 += this.vely;
    }

    avaliarMover() {
        if (this.y_1 >= height && this.y_2 >= height && this.y_3 >= height) {
            this.y_1 = -15;
            this.x_1 = random(0, width);

            this.y_2 = -15;
            this.x_2 = random(0, width);

            this.y_3 = -15;
            this.x_3 = random(0, width);
        }
    }
}

function mousePressed() {

    if (perdeu == false) {

        if (pontuacao_1 <= 0) {
            if (mouseX > ElemEscolhidos.x_1 - ElemEscolhidos.diametro / 2 && mouseX < ElemEscolhidos.x_1 + ElemEscolhidos.diametro / 2) {
                if (mouseY > ElemEscolhidos.y_1 - ElemEscolhidos.diametro / 2 && mouseY < ElemEscolhidos.y_1 + ElemEscolhidos.diametro / 2) {

                    pontuacao_1 = 1;

                }
            } else {
                tentativas--;

                if (tentativas <= 0) {
                    perdeu = true;
                }
            }

        }
    }
    /* if (mouseX > ElemEscolhidos.x_2 - ElemEscolhidos.diametro / 2 && mouseX < ElemEscolhidos.x_2 + ElemEscolhidos.diametro / 2) {
         if (mouseY > ElemEscolhidos.y_2 - ElemEscolhidos.diametro / 2 && mouseY < ElemEscolhidos.y_2 + ElemEscolhidos.diametro / 2) {
 
             pontuacao_2 = 1;
 
         }
     }
 
     if (mouseX > ElemEscolhidos.x_3 - ElemEscolhidos.diametro / 2 && mouseX < ElemEscolhidos.x_3 + ElemEscolhidos.diametro / 2) {
         if (mouseY > ElemEscolhidos.y_3 - ElemEscolhidos.diametro / 2 && mouseY < ElemEscolhidos.y_3 + ElemEscolhidos.diametro / 2) {
 
             pontuacao_3 = 1;
 
         }
     } */
}

