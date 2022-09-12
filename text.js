const FONT_SIZE = 40;
const FONT_FAMILY = "Verdana";
const FONT_WEIGHT = "bold";

const TEXT_SPEED = 2;
const TEXT_BLUR_SPEED = 2;

const MAX_RGB_NUMBER = 255;

const FONT = getFontString(
    FONT_SIZE, 
    FONT_FAMILY, 
    FONT_WEIGHT
);

class Color {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    getString() {
        return `rgb(${this.red},${this.green},${this.blue})`;
    }
}

function copyColor(color) {
    return new Color(color.red, color.green, color.blue);
}

class TextString {
    constructor(string, beginX, beginY, color, font, speed, blurSpeed) {
        this.string = string;
        this.x = this.beginX = beginX;
        this.y = this.beginY = beginY;
        
        this.color = copyColor(color);
        this.font = font;
        this.speed = speed;
        this.blurSpeed = blurSpeed;
        this.destroyed = false;
        this.init();
    }
    init() {
        const SPEED_RATE = 10;
        const SPEED = 1 / this.speed * SPEED_RATE;
        const BLUR_SPEED = 1 / this.blurSpeed * SPEED_RATE;

        var update = this.update.bind(this);
        var updateBlur = this.updateBlur.bind(this);

        this.speedInterval = setInterval(function() {
            update();
        }, SPEED);
        this.blurInterval = setInterval(function() {
            updateBlur();
        }, BLUR_SPEED);
    }
    update() {
        this.y--;
    }
    updateBlur() {
        this.color.red -= this.blurSpeed;
        this.color.green -= this.blurSpeed;
        this.color.blue -= this.blurSpeed;

        if(this.color.red <= 0 && this.color.green <= 0 && this.color.blue <= 0) {
            this.destroy();
        }
    }
    render() {
        ctx.textAlign = "center";
        ctx.fillStyle = this.color.getString();
        ctx.font = this.font;
        ctx.fillText(this.string, this.beginX, this.y);
    }
    destroy() {
        this.destroyed = true;
        clearInterval(this.speedInterval);
    }
}
function getFontString(fontSize, fontFamily, fontWeight) {
    return `${fontWeight} ${fontSize}px ${fontFamily}`;
}