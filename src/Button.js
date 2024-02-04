class Button {
    constructor(x, y, w, h, img, hoverImg) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        // this.text = text;
        this.img = img;
        this.hoverImg = hoverImg;
    }

    isHovering() {
        return mouseX - leftMargin >= this.x && mouseY >= this.y && mouseX - leftMargin <= this.x + this.w && mouseY <= this.y + this.h;
    }

    show() {
        // noStroke();
        // textAlign(CENTER, CENTER);
        // textSize(20);

        if (!this.isHovering()) {
            image(this.img, this.x + leftMargin, this.y, this.w, this.h);
        } else {
            image(this.hoverImg, this.x + leftMargin, this.y, this.w, this.h);
        }

        // rect(this.x + leftMargin, this.y, this.w, this.h, 5);

        // if (!this.isHovering()) {
        //     fill(255);
        // } else {
        //     fill(0);
        // }

        // text(this.text, this.x + leftMargin, this.y);
    }
}
