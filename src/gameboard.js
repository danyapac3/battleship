export class OutOfBoundsError extends Error {
  constructor() {
    super("Trying to access area out of board");
    this.name = "OutOfBounds";
  }
}

export class ShipOverlappingError extends Error {
  constructor() {
    super("Ships mustn't overlap");
    this.name = "ShipOverlapping";
  }
}

export class SameShipPlacedError extends Error {
  constructor() {
    super("Can't place the same ship");
    this.name = "Can't place the same";
  }
}

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.shipPositions = Array.from({ length: 10 }).map(() =>
      Array.from({ length: 10 }).fill(null)
    );
    this.hits = Array.from({ length: 10 }).map(() =>
      Array.from({ length: 10 }).fill(false)
    );
  }

  placeShip(ship, x, y, orientation = "horizontal") {
    if (x < 1 || y < 1 || x > 10 || y > 10) {
      throw new OutOfBoundsError();
    }
    if (orientation === "horizontal" && x + ship.length - 1 > 10) {
      throw new OutOfBoundsError();
    }
    if (orientation === "vertical" && y + ship.length - 1 > 10) {
      throw new OutOfBoundsError();
    }

    if (this.ships.includes(ship)) {
      throw new SameShipPlacedError();
    }

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;
      if (this.shipPositions[x - 1 + xOffset][y - 1 + yOffset] !== null) {
        throw new ShipOverlappingError();
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;
      this.shipPositions[x - 1 + xOffset][y - 1 + yOffset] = ship;
    }

    this.ships.push(ship);
  }

  hit(x, y) {
    if (x < 1 || y < 1 || x > 10 || y > 10) {
      throw new OutOfBoundsError();
    }
    this.hits[x - 1][y - 1] = true;
  }
}
