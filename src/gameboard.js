const BOARD_SIZE = 10;

class Matrix {
  #innerArray;
  #size;
  constructor(size, initialValue) {
    this.#size = size;
    this.#innerArray = new Array(size * size).fill(initialValue);
  }

  getCell(x, y) {
    return this.#innerArray[x - 1 + (y - 1) * this.#size];
  }

  setCell(x, y, value) {
    return (this.#innerArray[x - 1 + (y - 1) * this.#size] = value);
  }
}

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
    this.shipPositions = new Matrix(10, null);
    this.hits = new Matrix(10, false);
  }

  #checkBounds(x, y) {
    if ([x, y].some((coord) => coord < 1 || coord > BOARD_SIZE)) {
      throw new OutOfBoundsError();
    }
  }

  placeShip(ship, x, y, orientation = "horizontal") {
    this.#checkBounds(x, y);
    this.#checkBounds(
      orientation === "horizontal" ? x + ship.length : x,
      orientation === "vertical" ? y + ship.length : y
    );

    if (this.ships.includes(ship)) {
      throw new SameShipPlacedError();
    }

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;
      if (this.shipPositions.getCell(x + xOffset, y + yOffset) !== null) {
        throw new ShipOverlappingError();
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;

      this.shipPositions.setCell(x + xOffset, y + yOffset, ship);
    }

    this.ships.push(ship);
  }

  hit(x, y) {
    this.#checkBounds(x, y);
    this.hits.setCell(x, y, true);
  }

  getCell(x, y) {
    this.#checkBounds(x, y);
    return {
      ship: this.shipPositions.getCell(x, y),
      isHit: this.hits.getCell(x, y),
    };
  }
}
