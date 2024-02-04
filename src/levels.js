function level_setup() {
    return [
        {
            planetList: [
                { x: 100, y: 100, mass: 10000 },
                { x: 400, y: 300, mass: 10000 },
                { x: 300, y: 400, mass: 10000 },
            ],
            ship: { x: 100, y: 300, mass: 10, velY: 50 },
            home: { x: WIDTH - 100, y: windowHeight / 2, mass: 1000, img: sprites.home },
        },
    ];
}
