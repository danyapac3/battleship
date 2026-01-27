import Matrix from "../utils/matrix";

export const BOARD_SIZE = 10;

// error messages
const msgOutOfBoard = "trying to access area about of board";

export class OutOfBoundsError extends Error {
  constructor() {
    super("Trying to access area out of board");
    this.name = "OutOfBounds";
  }
}

export class ShipsOverlapError extends Error {
  constructor() {
    super("Ships mustn't overlap each other");
    this.name = "ShipsOverlap";
  }
}

export class SameShipPlacedError extends Error {
  constructor() {
    super("Can't place the same ship");
    this.name = "SameShipPlaced";
  }
}

export class HitSameCellError extends Error {
  constructor(x, y) {
    super(`Can't hit cell twice x: ${x}, y: ${y}`);
    this.name = "HitSameCellError";
  }
}

export default class Gameboard {
  #hitPositions;
  #shipPositions;
  #shipCoordinates;
  #shipOrientations;
  #ships;

  constructor() {
    this.#ships = [];
    this.#shipCoordinates = new Map();
    this.#shipOrientations = new Map();
    this.#shipPositions = new Matrix(10, null);
    this.#hitPositions = new Matrix(10, false);
  }

  #isWithinBounds(x, y) {
    return [x, y].every((coord) => coord >= 1 && coord <= BOARD_SIZE);
  }

  #checkBounds(x, y) {
    if ([x, y].some((coord) => coord < 1 || coord > BOARD_SIZE)) {
      throw new RangeError(msgOutOfBoard);
    }
  }

  placeShip(ship, x, y, orientation = "horizontal") {
    this.#checkBounds(x, y);
    this.#checkBounds(
      orientation === "horizontal" ? x + ship.length - 1 : x,
      orientation === "vertical" ? y + ship.length - 1 : y,
    );

    if (this.#ships.includes(ship)) {
      throw new SameShipPlacedError();
    }

    for (let i = 0; i < ship.length; i++) {
      const shipCellX = x + (orientation === "horizontal" ? i : 0);
      const shipCellY = y + (orientation === "vertical" ? i : 0);
      const rectPattern = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 0],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      rectPattern.forEach(([xOffset, yOffset]) => {
        const currentX = shipCellX + xOffset;
        const currentY = shipCellY + yOffset;
        if (!this.#isWithinBounds(currentX, currentY)) {
          return;
        }

        if (this.#shipPositions.getCell(currentX, currentY) !== null) {
          throw new ShipsOverlapError();
        }
      });
    }

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;

      this.#shipPositions.setCell(x + xOffset, y + yOffset, ship);
    }

    this.#ships.push(ship);
    this.#shipCoordinates.set(ship, [x, y]);
    this.#shipOrientations.set(ship, orientation);
  }

  removeShip(ship) {
    if (!this.#ships.includes(ship)) {
      return false;
    }

    const index = this.#ships.indexOf(ship);
    this.#ships.splice(index, 1);
    const [x, y] = this.#shipCoordinates.get(ship);
    const orientation = this.#shipOrientations.get(ship);

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;
      this.#shipPositions.setCell(x + xOffset, y + yOffset, null);
    }

    return true;
  }

  hit(x, y) {
    if (this.getCell(x, y).isHit) {
      throw new HitSameCellError(x, y);
    }
    this.#checkBounds(x, y);
    this.#hitPositions.setCell(x, y, true);
    this.getCell(x, y).ship?.hit();
  }

  getCell(x, y) {
    this.#checkBounds(x, y);
    return {
      ship: this.#shipPositions.getCell(x, y),
      isHit: this.#hitPositions.getCell(x, y),
    };
  }

  getShipAt(x, y) {
    this.#checkBounds(x, y);
    return this.#shipPositions.getCell(x, y);
  }

  getHitAt(x, y) {
    this.#checkBounds(x, y);
    return this.#hitPositions.getCell(x, y);
  }

  getShips() {
    return [...this.#ships];
  }

  forEachCell(callback) {
    for (let y = 1; y <= 10; y++) {
      for (let x = 1; x <= 10; x++) {
        const ship = this.#shipPositions.getCell(x, y);
        const isHit = this.#hitPositions.getCell(x, y);
        callback({ x, y, ship, isHit });
      }
    }
  }
}
