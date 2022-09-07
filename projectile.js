const HEALTH_DEFAULT_COLOR = "#d90000";
const HEALTH_LOST_COLOR = "#790000";

class Projectile {
    
    static SIZE = 30;
    static SPEED = 20;
    static COLOR = "#a0a0a0";

    static MAX_DISTANCE = 800;
    static MIN_POWER = 6;
    static MAX_POWER = 10;

    constructor(beginX, beginY, angle) {
        this.x = this.beginX = beginX;
        this.y = this.beginY = beginY;
        
        this.angle = angle;
        this.power = getRandom(Projectile.MIN_POWER, Projectile.MAX_POWER);
        this.destroyed = false;
        this.init();
    }
    init() {
        this.xSpeed = Math.cos(this.angle) * Projectile.SPEED;
        this.ySpeed = Math.sin(this.angle) * Projectile.SPEED;
    }
    update() {
        if(this.getDistance(this.x, this.y) >= Projectile.MAX_DISTANCE) {
            this.destroy();
            return;
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    render() {
        ctx.fillStyle = Projectile.COLOR;
        ctx.strokeStyle = Projectile.COLOR;

        ctx.beginPath();
        ctx.arc(this.x, this.y, Projectile.SIZE / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    getDistance(endX, endY) {
        var xDistance = Math.abs(endX - this.beginX);
        var yDistance = Math.abs(endY - this.beginY);
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
    destroy() {
        this.destroyed = true;
        this.spawnParticles();
    }
    spawnParticles() {
    }
}

function tryDestroyZombie() {
    for(var projectile of projectiles) {
        for(var zombie of zombies) {
            var pRect = getRect(projectile.x, projectile.y, Projectile.SIZE, Projectile.SIZE);
            var zRect = getRect(zombie.x, zombie.y, Zombie.SIZE, Zombie.SIZE);

            if(isCollision(pRect, zRect)) {
                zombie.hurt(projectile);
                projectile.destroy();
            }
        }
    }
}