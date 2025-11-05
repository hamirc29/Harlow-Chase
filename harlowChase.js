let harlow;
let shark;
let fish;
let pSize;
let pX;
let pY;
let pVx;
let pVy;
let playerSpeed;
let numC;
let cSize;
let cX;
let cY;
let cXMultiplier;
let cYMultiplier;
let cVx;
let cVy;
let eSize;
let eX;
let eY;
let eVx;
let eVy;
let eXMultiplier;
let eYMultiplier;
let gameOver;
function setup() {
    fullScreen();
    gameOver = false;
    pSize = 100;
    pX = width / 2;
    pY = height / 2;
    pVx = 0;
    pVy = 0;
    playerSpeed = 10;
    eSize = 200;
    eX = eSize / 2;
    eY = height / 2;
    eVx = 3;
    eVy = 3;
    eXMultiplier = 1;
    eYMultiplier = 1;
    cSize = 50;
    numC = 5;
    cX = new Array(numC);
    cY = new Array(numC);
    cVx = new Array(numC);
    cVy = new Array(numC);
    cXMultiplier = new Array(numC);
    cYMultiplier = new Array(numC);
    for (let i = 0; i < numC; i++) {
        cX[i] = random(cSize / 2, width - cSize / 2);
        cY[i] = random(cSize / 2, height - cSize / 2);
        cVx[i] = random(3, 8);
        cVy[i] = random(3, 8);
        cXMultiplier[i] = random(2) * 2 - 1;
        cYMultiplier[i] = random(2) * 2 - 1;
    }
}
function preload() {
    shark = loadImage("Angry Shark.png");
    fish = loadImage("Goldfish.png");
    harlow = loadImage("Harlow.png");
}
function draw() {
    background(10, 60, 207);
    imageMode(CENTER);
    rectMode(CENTER);
    noCursor();
    textSize(100);
    textAlign(CENTER); //draw player
    fill(255);
    image(harlow, pX, pY, pSize, pSize);
    pX += pVx;
    pY += pVy;
    if (pSize > eSize + 100) {
        shark = loadImage("Scared Shark.png"); //eSize = 100;
        eVx = 12;
        eVy = 12;
        eRun();
    } else {
        eFollow();
    } //Draw Enemy
    fill(0, 255, 0);
    image(shark, eX, eY, eSize, eSize);
    eX += eVx * eXMultiplier;
    eY += eVy * eYMultiplier; //enemy
    if (eX < eSize / 2) eX = eSize / 2;
    if (eX > width - eSize / 2) eX = width - eSize / 2;
    if (eY < eSize / 2) eY = eSize / 2;
    if (eY > height - eSize / 2) eY = height - eSize / 2;
    if (collision(eX, eY, eSize)) {
        gameOver = true;
    }
    if (gameOver) {
        if (pSize > eSize) {
            background(255);
            fill(0, 255, 0);
            text("YOU WIN", width / 2, height / 2);
            numC = 0;
            stopMoving();
        } else {
            background(0);
            fill(255, 0, 0);
            text("YOU DIED", width / 2, height / 2);
            numC = 0;
            stopMoving();
        }
    } //draw fish
    for (let i = 0; i < numC; i++) {
        fill(255, 0, 0);
        image(fish, cX[i], cY[i], cSize, cSize);
        cX[i] += cVx[i] * cXMultiplier[i];
        cY[i] += cVy[i] * cYMultiplier[i];
        cWrap(cX, cY);
        if (collision(cX[i], cY[i], cSize)) {
            pSize += 15;
            cX[i] = random(cSize / 2, width - cSize / 2);
            cY[i] = random(cSize / 2, height - cSize / 2);
        }
    }
}
function cWrap(cX, cY) {
    for (let i = 0; i < numC; i++) {
        if (cX[i] < -cSize / 2) cX[i] = width + cSize / 2;
        if (cX[i] > width + cSize / 2) cX[i] = -cSize / 2;
        if (cY[i] < -cSize / 2) cY[i] = height + cSize / 2;
        if (cY[i] > height + cSize / 2) cY[i] = -cSize / 2;
    }
    pWrap();
}
function keyPressed() {
    if (key == CODED) {
        if (keyCode == UP_ARROW) {
            pVy = playerSpeed * -1;
            pVx = 0;
        }
        if (keyCode == DOWN_ARROW) {
            pVy = playerSpeed;
            pVx = 0;
        }
        if (keyCode == LEFT_ARROW) {
            pVx = playerSpeed * -1;
            pVy = 0;
        }
        if (keyCode == RIGHT_ARROW) {
            pVx = playerSpeed;
            pVy = 0;
        }
    }
}
function collision(x, y, size) {
    let distP = dist(pX, pY, x, y);
    if (distP < pSize / 2 + createCanvas / 2) {
        return true;
    } else {
        return false;
    }
}
function pWrap() {
    if (pX < -pSize / 2) pX = width + pSize / 2;
    if (pX > width + pSize / 2) pX = -pSize / 2;
    if (pY < -pSize / 2) pY = height + pSize / 2;
    if (pY > height + pSize / 2) pY = -pSize / 2;
}
function eFollow() {
    if (pX > eX) eXMultiplier = 1;
    else if (pX < eX) eXMultiplier = -1;
    else eXMultiplier = 0;
    if (pY > eY) eYMultiplier = 1;
    else if (pY < eY) eYMultiplier = -1;
    else eYMultiplier = 0;
}
function eRun() {
    if (pX > eX) eXMultiplier = -1;
    else if (pX < eX) eXMultiplier = 1;
    else eXMultiplier = 0;
    if (pY > eY) eYMultiplier = -1;
    else if (pY < eY) eYMultiplier = 1;
    else eYMultiplier = 0;
}
function stopMoving() {
    eVx = 0;
    eVy = 0;
    playerSpeed = 0;
    for (let i = 0; i < numC; i++) {
        cXMultiplier[i] = 0;
        cYMultiplier[i] = 0;
    }
}
