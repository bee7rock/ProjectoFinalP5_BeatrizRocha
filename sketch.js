let imagensElementos;

let elemClassN = [];
let numElementosN = 10;

let elemClassEs = [];
let numElementosEs = 2;

let elemClassPerder = [];
let numElemPerder = 3;

let escolher = [];

let pontuacao_1 = 0;
let pontuacao_2 = 0;
let pontuacao_3 = 0;

let tentativas = 3;

let perdeu = false;
let ganhou = false;

let aigenX;
let aigenY = -15;
let aigenVelY;
let diametroAI = 120;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function preload() {
    pincel = loadImage('/data/pincel.png')
    backgroundIMG = loadImage('/data/background.jpg');
    pintura = loadImage('/data/pintura.png');
    aigen = loadImage('/data/aigen.png');
    elem1 = loadImage('/data/elem1.png');
    elem2 = loadImage('/data/elem2.png');
    elem3 = loadImage('/data/elem3.png');
    elem4 = loadImage('/data/elem4.png');
    elem5 = loadImage('/data/elem5.png');
    elem6 = loadImage('/data/elem6.png');
    elem7 = loadImage('/data/elem7.jpg');
    elem8 = loadImage('/data/elem8.png');
    elem9 = loadImage('/data/elem9.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    aigenX = random(0, width);
    aigenVelY = random(3, 8);

    if (perdeu == false && ganhou == false) {

        let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        imagensElementos = [elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8, elem9];
        imagensElementos[Math.floor(Math.random(0, 8) * imagensElementos.length)];

        imageMode(CENTER);


        nums = shuffle(nums).slice(0, 3);
        console.log(escolher, nums)

        for (i = 0; i < nums.length; i++) {
            escolher[i] = imagensElementos[nums[i]]
            imagensElementos.splice(nums[i], 1);
        }




        for (i = 0; i < numElementosN; i++) {
            elemClassN[i] = new Elementos(random(0, width), -15, random(3, 8), 120);
        }

        for (i = 0; i < numElementosEs; i++) {
            elemClassEs[i] = new ElemEscolhidos(random(0, width), -15, random(0, width), -15, random(0, width), -15, random(3, 8), 120, escolher);
        }

        for (i = 0; i < numElemPerder; i++) {
            elemClassPerder[i] = new ElemPerder(random(0, width), -15, random(3, 8), 120);
        }
    }
}

function draw() {
    background(225);

    image(backgroundIMG, width / 2, height / 2, width, height);

    if (perdeu == false && ganhou == false) {
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

        for (i = 0; i < elemClassPerder.length; i++) {
            elemClassPerder[i].desenhar();
            elemClassPerder[i].cicloMover();
            elemClassPerder[i].avaliarMover();
        }

        text('Apanhe os Elementos corretos para formar a pintura!', width / 2, 5, 100)

        fill(255);
        stroke(0);
        strokeWeight(2);
        image(escolher[0], 80, 85, 50, 50);
        let imagem1 = text(`${pontuacao_1}/1`, 50, 55);
        image(escolher[1], 135, 85, 50, 50);
        let imagem2 = text(`${pontuacao_2}/1`, 105, 55);
        image(escolher[2], 190, 85, 50, 50);
        let imagem3 = text(`${pontuacao_3}/1`, 160, 55);

        text('Tens ' + tentativas + ' tentativas!', 15, 15);
    }


    if (pontuacao_1 == 1 && pontuacao_2 == 1 && pontuacao_3 == 1) {
        ganhou = true;
        textAlign(CENTER);
        text('Conseguiste completar a pintura! Reinicia o site para recomeçar.', width / 2, 55);
        image(pintura, width / 2, height / 2, 700, 550);
        perdeu = false;
    }

    if (tentativas <= 0) {
        perdeu = true;
        ganhou = false;
    }

    if (perdeu == true) {
        textAlign(CENTER);
        text('Perdeste... :( Reinicia o site para recomeçar.', width / 2, 55);
        ganhou = false;
    }

    image(pincel, mouseX, mouseY, 100, 100);
}

class ElemPerder {
    constructor(x, y, vely, diametro) {
        this.x = x;
        this.y = y;
        this.vely = vely;
        this.diametro = diametro;
        this.imagem = aigen;
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

    avaliar() {
        if (mouseX > this.x - this.diametro && mouseX < this.x + this.diametro) {
            if (mouseY > this.y - this.diametro && mouseY < this.y + this.diametro) {
                perdeu = true;
                ganhou = false;
            }
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
        }
    }

    avaliar() {
        if (mouseX > this.x - this.diametro && mouseX < this.x + this.diametro) {
            if (mouseY > this.y - this.diametro && mouseY < this.y + this.diametro) {
                tentativas--;
            }
        }
    }
}


class ElemEscolhidos {
    constructor(x_1, y_1, x_2, y_2, x_3, y_3, vely, diametro, escolher) {
        this.x_1 = x_1;
        this.y_1 = y_1;
        this.x_2 = x_2 + 100;
        this.y_2 = y_2 + 150;
        this.x_3 = x_3 + 250;
        this.y_3 = y_3 + 200;
        this.vely = vely;
        this.diametro = diametro;
        this.escolher = escolher;
    }

    desenhar() {
        image(this.escolher[0], this.x_1, this.y_1, this.diametro, this.diametro);
        image(this.escolher[1], this.x_2, this.y_2, this.diametro, this.diametro);
        image(this.escolher[2], this.x_3, this.y_3, this.diametro, this.diametro);
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

    avaliar() {
        if (mouseX > this.x_1 - this.diametro && mouseX < this.x_1 + this.diametro) {
            if (mouseY > this.y_1 - this.diametro && mouseY < this.y_1 + this.diametro) {
                pontuacao_1 = 1;
            }
        } else if (mouseX > this.x_2 - this.diametro && mouseX < this.x_2 + this.diametro) {
            if (mouseY > this.y_2 - this.diametro && mouseY < this.y_2 + this.diametro) {
                pontuacao_2 = 1;
            }
        } else if (mouseX > this.x_3 - this.diametro && mouseX < this.x_3 + this.diametro) {
            if (mouseY > this.y_3 - this.diametro && mouseY < this.y_3 + this.diametro) {
                pontuacao_3 = 1;
            }
        }
    }
}

function mousePressed() {
    if (pontuacao_1 == 0 || pontuacao_2 == 0 || pontuacao_3 == 0) {
        for (i = 0; i < numElementosEs; i++) {
            elemClassEs[i].avaliar();
        }

        for (i = 0; i < numElementosN; i++) {
            elemClassN[i].avaliar();
        }

        for (i = 0; i < numElemPerder; i++) {
            elemClassPerder[i].avaliar();
        }
    }
}