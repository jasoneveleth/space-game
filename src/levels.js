const WIDTH = 960;
const HEIGHT = 540;

const level = [
    { // 0
        planetList: [{ x: WIDTH / 2 - 100, y: HEIGHT - 30, velX: -300, velY: 10, img: sprites => sprites.planet[0] }]
    },
    { // 1
        text: `Try to get home! 
Use arrow keys to turn and space bar for thrust.`,
        planetList: [],
        ship: { x: 100, y: 300, mass: 10, velY: 0, angle: Math.PI / 4 },
        home: { x: 860, y: HEIGHT / 2, mass: 2000, img: sprites => sprites.home, r: 50 },
    },
    { // 2
        text: "Avoid other planets",
        planetList: [
            { x: 20, y: 300, mass: 2000, img: sprites => sprites.planet[0] },
            { x: 400, y: 300, mass: 10000, img: sprites => sprites.planet[1] },
            { x: 300, y: 400, mass: 10000, img: sprites => sprites.planet[0] },
        ],
        ship: { x: 100, y: 300, mass: 10, velY: 0 },
        home: { x: 860, y: HEIGHT / 2, mass: 2000, img: sprites => sprites.home, r: 50 },
    },
    { // 3
        text: "Planets can move",
        planetList: [
            { x: 100, y: 500, velX: 4, velY: -4, mass: 5000, img: sprites => sprites.planet[0] },
            { x: 400, y: 250, velX: -4, velY: -4, mass: 10000, img: sprites => sprites.planet[1] },
            { x:500, y: 400, velX: 4, velY: 4, mass: 10000, img: sprites => sprites.planet[0] },
            { x: 700, y: 250, velX: 4, mass: 5000, img: sprites => sprites.planet[1] },
        ],
        ship: { x: 100, y: 300, mass: 10, velY: 0 },
        home: { x: 860, y: HEIGHT / 2, mass: 2000, img: sprites => sprites.home, r: 50 },
    },
    { // 4
        text: "Find the correct path",
        planetList: [
            { x: 400, y: 400, velX: -0.05, velY: -0.05, mass: 10000, img: sprites => sprites.planet[0] },
            { x: 730, y: 550, velX: 0.05, velY: 0.05, mass: 10000, img: sprites => sprites.planet[1] },
            { x: 700, y: 250, velX: 0.05, mass: 5000, img: sprites => sprites.planet[1] },
        ],
        ship: { x: 100, y: 300, mass: 10, velY: 0 },
        home: { x: 860, y: HEIGHT / 2, mass: 2000, img: sprites => sprites.home, r: 50 },
    },
    { // 5
        text: "Negative gravity?",
        planetList: [
            { x: 670, y: 300, velX: -0.05, mass: -5000, img: sprites => sprites.planet[3] },
            { x: 600, y: 600, velX: -0.05, mass: -5000, img: sprites => sprites.planet[3] }
        ],
        ship: { x: 100, y: 300, mass: 10, velY: 0 },
        home: { x: 860, y: 400, mass: 2000, img: sprites => sprites.home, r: 50 },
    },
    { // 6
        text: "Two worlds collide",
        planetList: [
            { x: 300, y: 500, velX: -0.05, velY: -0.05, mass: 10000, img: sprites => sprites.planet[0] },
            { x: 450, y: 350, velX: 0.05, velY: 0.05, mass: 10000, img: sprites => sprites.planet[1] },
            { x: 670, y: 300, velX: -0.05, mass: -10000, img: sprites => sprites.planet[3] },
            { x: 600, y: 600, velX: -0.05, mass: -10000, img: sprites => sprites.planet[3] }
        ],
        ship: { x: 100, y: 300, mass: 10, velY: 0 },
        home: { x: 860, y: HEIGHT / 2, mass: 2000, img: sprites => sprites.home, r: 50 },
    },
    { // 7
        text: "Far from home",
        planetList: [
            { x: 100, y: 600, velX: -0.05, mass: -10000, img: sprites => sprites.planet[3]}, 
            { x: 20, y: 150, velX: -0.05, mass: -5000, img: sprites => sprites.planet[3]}, 
            { x: 300, y: 500, velX: -0.05, velY: -0.05, mass: 10000, img: sprites => sprites.planet[2] },
            { x: 450, y: 350, velX: 0.05, velY: 0.05, mass: 10000, img: sprites => sprites.planet[0] },
            { x: 670, y: 300, velX: -0.05, mass: 10000, img: sprites => sprites.planet[1] },
            { x: 600, y: 600, velX: -0.05, mass: 10000, img: sprites => sprites.planet[1] }
        ],
        ship: { x: 100, y: 300, mass: 10, velY: 0 },
        home: { x: 860, y: HEIGHT / 2, mass: 2000, img: sprites => sprites.home, r: 50 },
    },
    { // 8
        text: "INFINITE LEVEL!!!",
    },
];