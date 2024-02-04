class Body {
    constructor(options) {
        this.pos = createVector(options.x || 0, options.y || 0);
        this.vel = createVector(options.velX || 0, options.velY || 0);
        this.angle = options.angle || 0;
        this.mass = options.mass || 1;
        this.forces = [];
        this.angularVel = options.angularVel || 0;
        this.angularAcc = options.angularAcc || 0;
        this.torques = [];
        this.inertia = options.inertia || 1;
        this.r = options.r || 50;
        this.img = options.img;
    }

    get x() {
        return this.pos.x;
    }

    get y() {
        return this.pos.y;
    }

    set x(val) {
        this.pos.x = val;
    }

    set y(val) {
        this.pos.y = val;
    }

    show() {
        if (!this.img) {
            fill(255, 0, 0);
            ellipse(this.x, this.y, this.r, this.r);
            return this;
        }

        // pos_x and pos_y are positions
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        image(this.img, -this.img.width, -this.img.height, this.img.width * 2, this.img.height * 2);
        // translate(imgSetup.x, imgSetup.y)
        translate(this.pos.x, this.pos.y);
        pop();

        return this;
    }

    clearForces() {
        this.forces = [];
    }

    addForce(force) {
        this.forces.push(force);
        return this;
    }

    update(dt) {
        let F = createVector();

        for (let force of this.forces) {
            F.add(force);
        }

        let acc = p5.Vector.div(F, this.mass);
        this.vel.add(p5.Vector.mult(acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        // this.angle = atan2(this.vel.x, -this.vel.y);

        this.clearForces();

        return this;
    }

    isColliding(other) {
        return (this.x - other.x) ** 2 + (this.y - other.y) ** 2 <= this.r + other.r;
    }
}
