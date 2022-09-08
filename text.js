const FONT_SIZE = 40;
const FONT_FAMILY = "Verdana";
const FONT_WEIGHT = "bold";

const TEXT_SPEED = 50;

const MAX_RGB_NUMBER = 255;

const FONT = getFontString(
    FONT_SIZE, 
    FONT_FAMILY, 
    FONT_WEIGHT
);

class Color {
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;

        if(!this.alpha) {
            this.alpha = MAX_RGB_NUMBER;
        }
    }
    getString() {
        return `rgb(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
}

class TextString {
    constructor(string, beginX, beginY, color, font, speed) {
        this.string = string;
        this.x = this.beginX = beginX;
        this.y = this.beginY = beginY;
        
        this.color = color;
        this.font = font;
        this.speed = speed;
        this.destroyed = false;
        this.init();
    }
    init() {
        const SPEED_RATE = 10;
        const SPEED = 1 / this.speed * SPEED_RATE;

        var update = this.update.bind(this);
        setInterval(function() {
            update();
        }, SPEED);
    }
    update() {
        this.y--;
        this.color.alpha--

        if(this.color.alpha <= 0) {
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
    }
}
function getFontString(fontSize, fontFamily, fontWeight) {
    return `${fontWeight} ${fontSize}px ${fontFamily}`;
}