function level_setup() {
    return [
        {
            text: `Try to get home! 
Use arrow keys to turn and space bar for thrust`,
            planetList: [],
            ship: { x: 100, y: 300, mass: 10, velY: 0, angle: Math.PI / 4 },
            home: { x: 860, y: windowHeight / 2, mass: 10000, img: sprites.home },
        },

        {
            text: "Avoid other planets",
            planetList: [
                { x: 20, y: 300, mass: 1000, r: 20 },
                { x: 400, y: 300, mass: 10000 },
                { x: 300, y: 400, mass: 10000 },
            ],
            ship: { x: 100, y: 300, mass: 10, velY: 0 },
            home: { x: 860, y: windowHeight / 2, mass: 1000, img: sprites.home },
        },
    ];
}
