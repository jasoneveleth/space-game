function level_setup() {
    return [
        {
            planetList: [new Body({ x: 100, y: 100, mass: 10000 }), new Body({ x: 400, y: 300, mass: 10000 }), new Body({ x: 300, y: 800, mass: 10000 })],
            ship: new Body({ x: 100, y: 300, mass: 10, velY: 50 })
        }
    ]
}