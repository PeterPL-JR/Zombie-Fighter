const LEFT_SIDE = 0;
const RIGHT_SIDE = 1;

const TOP_SIDE = 2;
const BOTTOM_SIDE = 3;

const FONT_SIZE = 40;
const FONT_FAMILY = "Verdana";
const FONT_WEIGHT = "bold";

const TEXT_SPEED = 50;

const FONT = getFontString(
    FONT_SIZE, 
    FONT_FAMILY, 
    FONT_WEIGHT
);

class Zombie {

    static SIZE = 60;
    static SPEED = 1;
    static MAX_HEALTH = 20;

    static COLOR = "green";
    static HURT_COLOR = "#790000";

    constructor() {
        this.side = getRandom(0, 3);
        this.health = Zombie.MAX_HEALTH;
        this.destroyed = false;
        this.color = Zombie.COLOR;
        this.init();
    }
    init() {
        if(this.side == LEFT_SIDE) {
            this.beginX = this.x = -Zombie.SIZE;
            this.beginY = this.y = getRandom(0, HEIGHT - Zombie.SIZE);
        }
        if(this.side == RIGHT_SIDE) {
            this.beginX = this.x = WIDTH;
            this.beginY = this.y = getRandom(0, HEIGHT - Zombie.SIZE);
        }
        if(this.side == TOP_SIDE) {
            this.beginX = this.x = getRandom(0, WIDTH - Zombie.SIZE);
            this.beginY = this.y = -Zombie.SIZE;
        }
        if(this.side == BOTTOM_SIDE) {
            this.beginX = this.x = getRandom(0, HEIGHT - Zombie.SIZE);
            this.beginY = this.y = HEIGHT;
        }
    }
    update() {
        var angle = Math.atan2(playerY - this.y, playerX - this.x);
        this.x += Math.cos(angle) * Zombie.SPEED;
        this.y += Math.sin(angle) * Zombie.SPEED;
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, Zombie.SIZE, Zombie.SIZE);

        if(this.health < Zombie.MAX_HEALTH) {
            this.renderHealth();
        }
    }

    renderHealth() {
        const HEALTH_POINT_WIDTH = 5;
        const HEALTH_POINT_HEIGHT = 20;

        const POS_CORRECT = 20;
        const TOTAL_WIDTH = HEALTH_POINT_WIDTH * Zombie.MAX_HEALTH;
        const CENTER = this.x + Zombie.SIZE / 2;

        const BEGIN = Math.round(CENTER - TOTAL_WIDTH / 2);
        for(var i = 0; i < Zombie.MAX_HEALTH; i++) {

            const positionX = BEGIN + i * HEALTH_POINT_WIDTH;
            const positionY = this.y - HEALTH_POINT_HEIGHT - POS_CORRECT;
            const color = i <= this.health ? HEALTH_DEFAULT_COLOR : HEALTH_LOST_COLOR;
            
            ctx.fillStyle = color;
            ctx.fillRect(positionX, positionY, HEALTH_POINT_WIDTH, HEALTH_POINT_HEIGHT);
        }
    }
    destroy() {
        this.destroyed = true;
    }
    hurt(projectile) {
        const HURT_TIME = 150;
        const POWER_RATE = 0.4;

        const distance = projectile.getDistance(this.x, this.y);
        const MAX_AWARDED_DIST = Projectile.MAX_DISTANCE / 2;
        const RATE = Math.abs(MAX_AWARDED_DIST - distance) / MAX_AWARDED_DIST;

        const BASIC_POWER = projectile.power;
        const BONUS_POWER = Math.round(BASIC_POWER * POWER_RATE * RATE);
        const power = distance <= MAX_AWARDED_DIST ? BASIC_POWER + BONUS_POWER : BASIC_POWER;
        
        this.health -= power;
        this.color = Zombie.HURT_COLOR;

        var setColor = this.setColor.bind(this);
        setTimeout(function() {
            setColor(Zombie.COLOR);
        }, HURT_TIME);

        const POS_CORRECT = 100;
        renderNumber(power, this.x + Zombie.SIZE / 2, this.y - POS_CORRECT, HEALTH_DEFAULT_COLOR, FONT, TEXT_SPEED);

        if(this.health <= 0) {
            this.destroy();
        }
    }
    setColor(color) {
        this.color = color;
    }
}

function trySpawnZombie() {
    const SPAWN_ZOMBIE = 90;
    var rand = getRandom(0, SPAWN_ZOMBIE);

    if(rand == SPAWN_ZOMBIE) {
        zombies.push(new Zombie());
    }
}

function renderNumber(number, beginX, beginY, color, font, speed) {
    ctx.textStyle = color;
    ctx.font = font;

    setInterval(function() {

    }, speed);
}

function getFontString(fontSize, fontFamily, fontWeight) {
    return `${fontWeight} ${fontSize}px ${fontFamily}`;
}