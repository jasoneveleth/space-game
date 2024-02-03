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
        return mouseX >= this.x - this.w / 2 && mouseY >= this.y - this.h / 2 && mouseX <= this.x + this.w / 2 && mouseY <= this.y + this.h / 2;
    }

    show() {
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);

        if (!this.isHovering()) {
            fill(this.color);
        } else {
            fill(255);
        }

        rect(this.x, this.y, this.w, this.h, 5);

        if (!this.isHovering()) {
            fill(255);
        } else {
            fill(0);
        }

        text(this.text, this.x, this.y);
    }
}
