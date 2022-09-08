var canvas = document.querySelector("#container canvas");
var ctx = canvas.getContext("2d");

const WIDTH = 1280;
const HEIGHT = 720;

const SPEED = 10;
const PLAYER_SIZE = 80;
const PLAYER_COLOR = "red";

var playerX = WIDTH / 2 - PLAYER_SIZE / 2;
var playerY = HEIGHT / 2 - PLAYER_SIZE / 2;

const keys = [];
const projectiles = [];
const zombies = [];
const textObjs = [];

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    
    initKeyboard();
    initMouse();
    draw();
}

function draw() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    trySpawnZombie();
    movingSystem();
    tryDestroyZombie();

    // Projectiles rendering
    for(var p = 0; p < projectiles.length; p++) {
        var projectile = projectiles[p];
        if(projectile.destroyed) {
            projectiles.splice(p, 1);
            continue;
        }
        projectile.update();
        projectile.render();
    }

    // Zombies rendering
    for(var z = 0; z < zombies.length; z++) {
        var zombie = zombies[z];
        if(zombie.destroyed) {
            zombies.splice(z, 1);
            continue;
        }
        zombie.update();
        zombie.render();
    }

    // Text objects rendering
    for(var t = 0; t < textObjs.length; t++) {
        var text = textObjs[t];
        if(text.destroyed) {
            textObjs.splice(t, 1);
            continue;
        }
        text.render();
    }

    // Player rendering
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fillRect(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);
}

function initKeyboard() {
    document.onkeydown = function(event) {
        keys[event.key.toUpperCase()] = true;
    }
    document.onkeyup = function(event) {
        keys[event.key.toUpperCase()] = false;
    }
}
function initMouse() {
    const LEFT_BUTTON = 0;

    document.onmousedown = function(event) {
        if(event.button == LEFT_BUTTON) {
            var mouseX = event.clientX - canvas.offsetLeft;
            var mouseY = event.clientY - canvas.offsetTop;
            shot(mouseX, mouseY);
        }
    }
}

function movingSystem() {
    if(keys["W"]) playerY -= SPEED;
    if(keys["S"]) playerY += SPEED;

    if(keys["A"]) playerX -= SPEED;
    if(keys["D"]) playerX += SPEED;
}

function shot(mouseX, mouseY) {
    var angle = Math.atan2(mouseY - playerY, mouseX - playerX);
    var beginX = playerX + PLAYER_SIZE / 2;
    var beginY = playerY + PLAYER_SIZE / 2;
    projectiles.push(new Projectile(beginX, beginY, angle));
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRect(x, y, width, height) {
    return {x, y, width, height}
}

function isCollision(rect1, rect2) {
    const condX = rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x;
    const condY = rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y;
    return !(condX || condY);
}