let ship;
let shipImage; // image directory of the button
let planetList;
let trajectory;
let pause = false;
let verbose = false;
const G = 40;
let button;
let losing_state = -1

let shipImgInfo;
let sprites = {};
let home;
let level;
let level1_button;
let thrust;
let thrusters_on = false;
let thrust_trajectory;
const WIDTH = 960;
const HEIGHT = 540;
let leftMargin = 0;

const colors = {
    green: "#CAE7B9",
    yellow: "#F3DE8A",
    pink: "#EB9486",
    purple: "#7E6B8F",
    blue: "#9CCBEC",
    lightBlue: "#69DDFF",
};

function preload() {
    sprites.rocket = [loadImage("./assets/rocket-sprite.png")];
    sprites.home = loadImage("./assets/home-sprite.png");
    for (let i = 0; i < 26; i++) {
        sprites.rocket.push(loadImage(`./assets/explosion/output${i}.png`))
    }
}

function setup() {
    rectMode(CENTER);
    createCanvas(windowWidth, windowHeight);

    level = level_setup();
    resetToLevel(0);

    trajectory = [];
    button = new Button(windowWidth / 2, 50, 35, 35, "⏸", colors.blue, colors.lightBlue);
    level1_button = new Button(windowWidth / 2 + 50, 50, 35, 35, "1", colors.blue, colors.lightBlue);
    thrust_trajectory = [];
}

function draw() {
    if (losing_state > 0) {
        console.log(losing_state, Math.floor(losing_state));
        ship.img = sprites.rocket[Math.floor(losing_state)]
        losing_state += 0.5;
        losing_state = Math.min(losing_state, 26);
    } else {
        for (let planet of planetList) {
            if (ship.isColliding(planet)) {
                losing_state = 1;
            }
        }
    }

    background(0);
    button.show();
    level1_button.show();
    thrusters_on = false;
    leftMargin;

    // calculating the gravity force on the ship
    for (let planet of planetList) {
        planet.show();

        if (pause || losing_state > 0) {
            continue;
        }
        // calculate gravitational force
        let relPosition = p5.Vector.sub(planet.pos, ship.pos);
        let magnitude = (G * planet.mass * ship.mass) / (relPosition.mag() * relPosition.mag() * relPosition.mag());
        let force = relPosition.mult(magnitude);
        // add force to ship
        ship.addForce(force);
    }

    if (keyIsDown(LEFT_ARROW)) {
        ship.angle -= PI / 90;
        console.log(ship.angle);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ship.angle += PI / 90;
    }

    if (keyIsDown(32)) {
        direction = p5.Vector.fromAngle(ship.angle - PI / 2);
        ship.vel.add(direction);
        thrusters_on = true;
        thrusters_pos = { x: ship.pos.x - direction[0] * 32, y: ship.pos.y - direction[1] * 32 };
    }

    // draw out the trajectory of the ship
    trajectory.push({ x: ship.x, y: ship.y });
    if (trajectory.length > 256) {
        trajectory.shift();
    }
    noStroke();
    for (var i = 0; i < trajectory.length; i++) {
        fill(0, i, 0);
        ellipse(trajectory[i].x, trajectory[i].y, 3, 3);
    }
    stroke(255, 255, 255);
    fill(255, 255, 255);

    // draw out the thruster light effect
    if (thrusters_on) {
        thrust_trajectory.push({ x: thrusters_pos.x, y: thrusters_pos.y });
        if (thrust_trajectory.length > 20) {
            thrust_trajectory.shift();
        }
        // TODO
    }

    // display the ship on the screen
    if (!pause && losing_state == 0) {
        ship.update(1 / 60);
    }
    ship.show();
    home.show();
}

function resetToLevel(n) {
    losing_state = 0;
    planetList = level[n].planetList.map(x => new Body(x));
    ship = new Body({ ...level[n].ship, img: sprites.rocket[0] });
    home = new Body({ ...level[n].home, img: sprites.home });
}

function mouseClicked() {
    if (button.isHovering()) {
        if (pause) {
            button.text = "⏸";
        } else {
            button.text = "▶";
        }
        pause = !pause;
    }

    if (level1_button.isHovering()) {
        resetToLevel(0);
    }
}
