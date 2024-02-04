let ship;
let shipImage; // image directory of the button
let planetList;
let trajectory = [];
let pause = false;
let verbose = false;
const G = 60;
let pauseButton;
let losing_state = -1;
let currentLevel = 0;
let winning = false;
let shipImgInfo;
let sprites = {};
let home;
let level;
let level_buttons = [];
let thrust;
let thrusters_on = false;
let thrustTrajectory;
let fuel;
const WIDTH = 960;
const HEIGHT = 540;
let leftMargin = 0;
let stars = [];
let comets = [];
let displayText = "";
let frameClickedLevel = 0;

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
    sprites.planet = [loadImage("./assets/planet-sprite-1.png"), loadImage("./assets/planet-sprite-2.png")];
    for (let i = 0; i < 26; i++) {
        sprites.rocket.push(loadImage(`./assets/explosion/output${i}.png`));
    }
    sprites.buttons = {};
    sprites.buttons.numbers = [];
    sprites.buttons.numbersHover = [];
    sprites.buttons.pause = loadImage("./assets/buttons/pause.circle.png");
    sprites.buttons.pauseHover = loadImage("./assets/buttons/pause.circle.fill.png");
    sprites.buttons.play = loadImage("./assets/buttons/play.circle.png");
    sprites.buttons.playHover = loadImage("./assets/buttons/play.circle.fill.png");
    sprites.buttons.reset = loadImage("./assets/buttons/repeat.circle.png");
    sprites.buttons.resetHover = loadImage("./assets/buttons/repeat.circle.fill.png");
    for (let i = 0; i < 10; i++) {
        sprites.buttons.numbers.push(loadImage(`./assets/buttons/${i + 1}.square.png`));
        sprites.buttons.numbersHover.push(loadImage(`./assets/buttons/${i + 1}.square.fill.png`));
    }
    sprites.buttons.lock = loadImage("./assets/buttons/lock.square.fill.png");
}

function setup() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    createCanvas(windowWidth, windowHeight);

    level = level_setup();
    for (let i = 0; i < level.length; i++) {
        level[i].completed = false;
        level[i].unlocked = false;
    }
    level[0].unlocked = true;

    fuel = 150;

    pauseButton = new Button(WIDTH / 2 - level.length * 50, 50, 35, 35, sprites.buttons.pause, sprites.buttons.pauseHover);
    for (let i = 0; i < level.length; i++) {
        let levelIcon;
        let levelIconHover;
        if (level[i].unlocked) {
            levelIcon = sprites.buttons.numbers[i];
            levelIconHover = sprites.buttons.numbersHover[i];
        } else {
            levelIcon = sprites.buttons.lock;
            levelIconHover = sprites.buttons.lock;
        }
        level_buttons.push(new Button(WIDTH / 2 + 50 * (i + 1) - level.length * 50, 50, 35, 35, levelIcon, levelIconHover));
    }
    resetToLevel(0);
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
    // checking for losing conditions
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

    // check for winning conditions
    if (!winning) {
        if (ship.isColliding(home)) {
            winning = true;
        }
    }

    background(0);
    if (displayText) {
        textSize(50);
        fill(255 - Math.max(frameCount - frameClickedLevel, 0));
        noStroke();
        text(displayText, WIDTH / 2 + leftMargin, 200);
    }
    displayBackground();

    thrusters_on = false;
    leftMargin = (windowWidth - WIDTH) / 2;

    handleKeyEvents();
    displayTrajectory();
    updateThrusters();

    // calculating the gravity force on the ship
    for (let planet of planetList) {
        planet.show();
        if (pause || losing_state > 0 || winning) {
            continue;
        }
        addGravity(planet);
    }
    if (!pause && losing_state == 0 && !winning) {
        addGravity(home);
    }

    // display the ship on the screen
    if (!pause && losing_state == 0 && !winning) {
        ship.update(1 / 60);
    }
    ship.show();
    home.show();

    // show buttons and fuel bar
    pauseButton.show();
    for (let btn of level_buttons) {
        btn.show();
    }

    // fuel bar
    fill(colors.blue);
    rect(windowWidth - 150, 50, 200, 35, 5);
    fill(0, 0, 0);
    rect(windowWidth - 150, 50, 150, 10);
    fill(255, 165, 0);
    rect(windowWidth - 225 + fuel / 2, 50, fuel, 10);
    fill(255, 255, 255);

    if (losing_state > 0) {
        // if game over, display text
        textSize(100);
        textAlign(CENTER, CENTER);
        // textAlign(CENTER, CENTER);
        fill("red");
        stroke(0);
        text("GAME OVER", windowWidth / 2, windowHeight / 2);
        fill("white");
        textSize(20);
        text("PRESS RESTART TO PLAY AGAIN", windowWidth / 2, windowHeight / 2 + 75);
        fill(0);
        noStroke();
    }

    if (winning) {
        // if game over, display text
        textSize(100);
        textAlign(CENTER, CENTER);
        // textAlign(CENTER, CENTER);
        fill("white");
        stroke(0);
        text("YOU WIN", windowWidth / 2, windowHeight / 2);
        fill("white");
        textSize(20);
        text("CHOOSE A LEVEL TO PROCEED", windowWidth / 2, windowHeight / 2 + 75);
        fill(0);
        noStroke();
    }
}

function displayBackground() {
    // display stars
    for (var star of stars) {
        fill(255, 255, random(0, 255));
        ellipse(star.x, star.y, star.z, star.z);
    }
    fill(255, 255, 255);

    // display comets
    for (var comet of comets) {
        if (!pause && losing_state == 0) {
            angle = random(0, 2 * PI);
            force = p5.Vector.fromAngle(angle);
            force.mult(0.001);
            comet.addForce(force);
            comet.update();
        }
        comet.show();
    }
}

function addGravity(planet) {
    // calculate gravitational force
    let relPosition = p5.Vector.sub(planet.pos, ship.pos);
    let magnitude = (G * planet.mass * ship.mass) / (relPosition.mag() * relPosition.mag() * relPosition.mag());
    let force = relPosition.mult(magnitude);
    // add force to ship
    ship.addForce(force);
}

function handleKeyEvents() {
    if (pause || losing_state > 0 || winning) {
        return;
    }
    // handle key events
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
}

function displayTrajectory() {
    if (!pause && losing_state == 0 && !winning) {
        trajectory.push({ x: ship.x, y: ship.y });
    } else if (losing_state > 0 || winning) {
        trajectory = [];
    }
    // draw out the trajectory of the ship
    if (trajectory.length > 256) {
        trajectory.shift();
    }
    noStroke();
    for (var i = 0; i < trajectory.length; i++) {
        fill(0, i, 0);
        ellipse(trajectory[i].x + leftMargin, trajectory[i].y, 3, 3);
    }
    fill(255, 255, 255);
}

function updateThrusters() {
    if (thrusters_on & (fuel >= 0)) {
        fuel -= 1;
        thrustTrajectory.push({ x: thruster_pos.x, y: thruster_pos.y });
        if (thrustTrajectory.length > 20) {
            thrustTrajectory.shift();
        }
        noStroke();
        for (var i = thrustTrajectory.length - 1; i >= 0; i--) {
            multiplier = 255 / thrustTrajectory.length;
            fill(i * multiplier, (i * multiplier) / 2, 0);
            ellipse(thrustTrajectory[i].x + leftMargin, thrustTrajectory[i].y, 10, 10);
        }
    }

    if (!thrusters_on && thrustTrajectory.length > 0) {
        thrustTrajectory = [];
    }
}

function resetToLevel(n) {
    stars = [];
    comets = [];
    level_buttons[currentLevel].img = sprites.buttons.numbers[currentLevel];
    level_buttons[currentLevel].hoverImg = sprites.buttons.numbersHover[currentLevel];
    level_buttons[n].img = sprites.buttons.reset;
    level_buttons[n].hoverImg = sprites.buttons.resetHover;
    currentLevel = n;
    losing_state = 0;
    winning = false;
    fuel = 150;
    trajectory = [];
    generateStarsAndComets();
    planetList = level[n].planetList.map(x => new Body(x));
    displayText = level[n].text;
    ship = new Body({ ...level[n].ship, img: sprites.rocket[0] });
    home = new Body({ ...level[n].home, img: sprites.home });
    trajectory = [];
    frameClickedLevel = frameCount;
}

function mouseClicked() {
    if (pauseButton.isHovering()) {
        console.log("PAUSE");
        if (pause) {
            pauseButton.img = sprites.buttons.pause;
            pauseButton.hoverImg = sprites.buttons.pauseHover;
        } else {
            pauseButton.img = sprites.buttons.play;
            pauseButton.hoverImg = sprites.buttons.playHover;
        }
        pause = !pause;
    }

    for (let i = 0; i < level_buttons.length; i++) {
        if (level_buttons[i].isHovering() && level[i].unlocked) {
            resetToLevel(i);
        }
    }
}

function generateStarsAndComets() {
    // generating stars
    for (let i = 0; i < 75; i++) {
        let randomX = random(0, windowWidth);
        let randomY = random(0, windowHeight);
        let randomR = random(2, 5);
        stars.push(createVector(randomX, randomY, randomR));
    }
    // generating comets
    for (let i = 0; i < 75; i++) {
        let posX = random(0, windowWidth);
        let posY = random(0, windowHeight);
        let angle = random(0, 2 * PI);
        let vel = p5.Vector.mult(p5.Vector.fromAngle(angle), 0.01);
        let r = random(0.5, 2);
        console.log(vel);
        comets.push(new Body({ x: posX, y: posY, velX: vel.x, velY: vel.y, r: r, isComet: true }));
    }
    print(comets);
}
