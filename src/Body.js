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

    show(size_x, size_y) {
        ellipse(this.x, this.y, size_x || 50, size_y || 50);
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

        this.clearForces()

        return this;
    }
}