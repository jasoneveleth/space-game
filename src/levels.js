function level_setup() {
    return [
        { planetList: [{ x: WIDTH / 2 - 100, y: HEIGHT - 30, velX: -300, velY: 10, img: sprites.planet[0] }] },
        {
            text: `Try to get home! 
Use arrow keys to turn and space bar for thrust.`,
            planetList: [],
            ship: { x: 100, y: 300, mass: 10, velY: 0, angle: Math.PI / 4 },
            home: { x: 860, y: windowHeight / 2, mass: 2000, img: sprites.home, r: 50 },
        },

        {
            text: "Avoid other planets",
            planetList: [
                { x: 20, y: 300, mass: 2000, img: sprites.planet[0] },
                { x: 400, y: 300, mass: 10000, img: sprites.planet[1] },
                { x: 300, y: 400, mass: 10000, img: sprites.planet[1] },
            ],
            ship: { x: 100, y: 300, mass: 10, velY: 0 },
            home: { x: 860, y: windowHeight / 2, mass: 2000, img: sprites.home, r: 50 },
        },
        {
            text: "Planets can move",
            planetList: [
                { x: 100, y: 500, velX: 0.05, velY: -0.05, mass: 5000, img: sprites.planet[0] },
                { x: 400, y: 250, velX: -0.05, velY: -0.05, mass: 10000, img: sprites.planet[1] },
                { x: 500, y: 400, velX: 0.05, velY: 0.05, mass: 10000, img: sprites.planet[1] },
                { x: 700, y: 250, velX: 0.05, mass: 5000, img: sprites.planet[0] },
            ],
            ship: { x: 100, y: 300, mass: 10, velY: 0 },
            home: { x: 860, y: windowHeight / 2, mass: 2000, img: sprites.home, r: 50 },
        },
    ];
}
