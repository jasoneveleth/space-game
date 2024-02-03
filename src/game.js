let ship;

function setup() {
    createCanvas(windowWidth, windowHeight);

    ship = new Body({ mass: 10 });
}

function draw() {
    background(0);
    // rect(100, 100, 100, 100);
    ship.addForce(createVector(10, 5));
    ship.update(1 / 60);
    ship.show();
}
