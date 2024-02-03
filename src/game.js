let ship;
let shipImage; // image directory of the button
let planetList;
let trajectory;
let pause = false;
let verbose = false;
const G = 40;
let button;

const colors = {
    green: "#CAE7B9",
    yellow: "#F3DE8A",
    pink: "#EB9486",
    purple: "#7E6B8F",
    blue: "#9CCBEC",
    lightBlue: "#69DDFF",
};

function setup() {
    rectMode(CENTER);

    createCanvas(windowWidth, windowHeight);
    planetList = [new Body({ x: 100, y: 100, mass: 10000 }), new Body({ x: 400, y: 300, mass: 10000 }), new Body({ x: 300, y: 800, mass: 10000 })];
    ship = new Body({ x: 500, y: 300, mass: 10, velY: 50 });
    shipImage = loadImage("assets/rocket-sprite.png");
    trajectory = [];
    button = new Button(windowWidth / 2, 50, 100, 50, "Hello!", colors.blue, colors.lightBlue);
}

function draw() {
    if (pause) {
        return;
    }
    background(0);

    // calculating the gravity force on the ship
    for (let planet of planetList) {
        planet.show();
        // calculate gravitational force
        let relPosition = p5.Vector.sub(planet.pos, ship.pos);
        let magnitude = (G * planet.mass * ship.mass) / (relPosition.mag() * relPosition.mag() * relPosition.mag());
        let force = relPosition.mult(magnitude);
        // add force to ship
        ship.addForce(force);
    }

    // draw out the trajectory of the ship
    trajectory.push({ x: ship.x, y: ship.y });
    fill(255, 0, 0);
    noStroke();
    for (let point of trajectory) {
        ellipse(point.x, point.y, 5, 5);
    }
    stroke(255, 255, 255);
    fill(255, 255, 255);

    // display the ship on the screen
    ship.update(1 / 60);
    displayImage({
        dir: shipImage, 
        x: ship.x - 32, 
        y: ship.y - 32, 
        width: 64, 
        height: 64}, 
        atan2(ship.vel.x, -ship.vel.y), 
        ship.x, ship.y);

    button.show();
}

function pausePlay() {
    pause = !pause;
}

function mouseClicked() {
    if (button.isHovering()) {
        pause = !pause;
    }
}

function displayImage(imgSetup, angle, pos_x, pos_y) {
    // pos_x and pos_y 
    push();
    // translate(imgSetup.x, imgSetup.y);
    translate(pos_x, pos_y);
    rotate(angle);
    image(imgSetup.dir, -imgSetup.width/2, -imgSetup.height/2, imgSetup.width, imgSetup.height);
    // translate(imgSetup.x, imgSetup.y)
    translate(pos_x, pos_y);
    pop();
}