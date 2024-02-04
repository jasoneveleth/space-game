let ship;
let shipImage; // image directory of the button
let planetList;
let trajectory;
let pause = false;
let verbose = false;
const G = 60;
let button;
let losing_state = -1;

let shipImgInfo;
let sprites = {};
let home;
let level;
let level1_button;
let thrust;
let thrusters_on = false;
let thrustTrajectory;
let fuel;
const WIDTH = 960;
const HEIGHT = 540;
let leftMargin = 0;
let stars = [];
let comets = [];

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
        sprites.rocket.push(loadImage(`./assets/explosion/output${i}.png`));
    }
}

function setup() {
    rectMode(CENTER);
    createCanvas(windowWidth, windowHeight);

    level = level_setup();
    resetToLevel(0);
    fuel = 150;

    trajectory = [];
    button = new Button(WIDTH / 2, 50, 35, 35, "⏸", colors.blue, colors.lightBlue);
    level1_button = new Button(WIDTH / 2 + 50, 50, 35, 35, "1", colors.blue, colors.lightBlue);
    thrust_trajectory = [];
    for (let i = 0; i < 30; i++) {
        let randomX = random(0, windowWidth);
        let randomY = random(0, windowHeight);
        stars.push(createVector(randomX, randomY));
    }
    thrustTrajectory = [];
    generateStarsAndComets();

}

function draw() {
    if (losing_state > 0) {
        console.log(losing_state, Math.floor(losing_state));
        ship.img = sprites.rocket[Math.floor(losing_state)];
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

    // display stars
    for (var star of stars) {
        fill(255, 255, random(0, 255));
        ellipse(star.x, star.y, 5, 5);
    }
    fill(255,255,255)

    // display comets
    for (var comet of comets) {
        comet.show()
    }


    thrusters_on = false;
    leftMargin = (windowWidth - WIDTH) / 2;

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

    if (keyIsDown(32) && fuel >= 0) {
        direction = p5.Vector.fromAngle(ship.angle - PI / 2);
        ship.vel.add(direction);
        thrusters_on = true;
        console.log(direction[0] * 32);
        thruster_pos = { x: ship.pos.x - direction.x * 32, y: ship.pos.y - direction.y * 32 };
    }

    // draw out the trajectory of the ship
    trajectory.push({ x: ship.x, y: ship.y });
    if (trajectory.length > 256) {
        trajectory.shift();
    }
    noStroke();
    for (var i = 0; i < trajectory.length; i++) {
        fill(0, i, 0);
        ellipse(trajectory[i].x + leftMargin, trajectory[i].y, 3, 3);
    }
    stroke(255, 255, 255);
    fill(255, 255, 255);

    // draw out the thruster light effect
    if (thrusters_on & (fuel >= 0)) {
        fuel -= 1;
        thrustTrajectory.push({ x: thruster_pos.x, y: thruster_pos.y });
        if (thrustTrajectory.length > 20) {
            thrustTrajectory.shift();
        }
        noStroke()
        for (var i = thrustTrajectory.length-1; i>=0; i--) {
            multiplier = 255 / thrustTrajectory.length
            fill(i*multiplier, i*multiplier/2, 0)
            ellipse(thrustTrajectory[i].x + leftMargin, thrustTrajectory[i].y, 10, 10)
        }
        stroke(255, 255, 255);
    }

    if (!thrusters_on && thrustTrajectory.length>0) {
        thrustTrajectory = []
    }

    // display the ship on the screen
    if (!pause && losing_state == 0) {
        ship.update(1 / 60);
    }
    ship.show();
    home.show();

    // show buttons and fuel bar
    button.show();
    level1_button.show();

    // fuel bar 
    fill(colors.blue)
    rect(windowWidth - 150, 50, 200, 35, 5)
    fill(0,0,0)
    rect(windowWidth - 150, 50, 150, 10)
    fill(255,165,0)
    rect(windowWidth - 225 + fuel/2, 50, fuel, 10)
    fill(255,255,255)
}

function resetToLevel(n) {
    losing_state = 0;
    fuel = 150;
    trajectory = [];
    generateStarsAndComets();
    planetList = level[n].planetList.map(x => new Body(x));
    ship = new Body({ ...level[n].ship, img: sprites.rocket[0] });
    home = new Body({ ...level[n].home, img: sprites.home });
    trajectory = [];
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

function generateStarsAndComets() {
    // generating stars
    for (let i = 0; i < 50; i++) {
        let randomX = random(0, windowWidth);
        let randomY = random(0, windowHeight);
        stars.push(createVector(randomX, randomY))
    }
    // generating comets
    for (let i = 0; i < 20; i++) {
        let posX = random(0, windowWidth);
        let posY = random(0, windowHeight);
        let angle = random(0, 2*PI);
        let vel = p5.Vector.mult(p5.Vector.fromAngle(angle), 100);
        console.log(vel);
        comets.push(new Body({x: posX, y: posY, velX: vel.x, velY: vel.y, r: 5, isComet: true}))
    }
    print(comets)
}
