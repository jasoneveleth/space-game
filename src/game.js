let ship;
let shipImage; // image directory of the button
let planetList;
let trajectory;
let pause = false;
let verbose = false;
const G = 40;
let button;
let shipAngle;
let shipImgInfo;

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
    shipAngle = atan(ship.vel.x, -ship.vel.y);
    shipImgInfo = {
        dir: loadImage("assets/rocket-sprite.png"),
        x: ship.x - 32,
        y: ship.y - 32,
        width: 64,
        height: 64,
    };
    trajectory = [];
    button = new Button(windowWidth / 2, 50, 35, 35, "⏸", colors.blue, colors.lightBlue);

    
}

function draw() {
    background(0);
    button.show();

    // calculating the gravity force on the ship
    for (let planet of planetList) {
        planet.show();

        if (pause) {
            continue;
        }
        // calculate gravitational force
        let relPosition = p5.Vector.sub(planet.pos, ship.pos);
        let magnitude = (G * planet.mass * ship.mass) / (relPosition.mag() * relPosition.mag() * relPosition.mag());
        let force = relPosition.mult(magnitude);
        // add force to ship
        ship.addForce(force);
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

    // display the ship on the screen
    if (!pause) {
        ship.update(1 / 60);
    }
    ship.displayImage(shipImgInfo, shipAngle);

    // if (keyIsDown('a'.charCodeAt(0))) {
    //     shipAngle -= PI/9;
    //     // console.log("key a is pressed")
    // }
    // if (keyIsDown('d'.charCodeAt(0))) {
    //     shipAngle += PI/9;
    // }

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
}

function displayImage(imgSetup, angle, pos_x, pos_y) {
    // pos_x and pos_y
    push();
    // translate(imgSetup.x, imgSetup.y);
    translate(pos_x, pos_y);
    rotate(angle);
    image(imgSetup.dir, -imgSetup.width / 2, -imgSetup.height / 2, imgSetup.width, imgSetup.height);
    // translate(imgSetup.x, imgSetup.y)
    translate(pos_x, pos_y);
    pop();
}




// function keyPressed() {
//     if (key === 'a') {
//         shipAngle -= PI/9;
//     } else if (key === 'd') {
//         shipAngle += PI/9;
//     }
// }
