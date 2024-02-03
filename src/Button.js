class Button {
    constructor(x, y, w, h, text, color, hoverColor) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.color = color;
        this.hoverColor = hoverColor;
    }

    isHovering() {
        return mouseX >= this.x && mouseY >= this.y && mouseX <= this.x + this.w && mouseY <= this.y + this.h;
    }

    show() {
        noStroke();

        if (isHoverting()) {
            fill(this.hoverColor);
        } else {
            fill(this.color);
        }

        rect(x, y, w, h);
        fill(255);
        text(text, x, y);
    }
}
