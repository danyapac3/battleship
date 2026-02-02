import Matrix from "../utils/matrix";

export const BOARD_SIZE = 10;

// error messages
const msgOutOfBoard = "Trying to access area about of board.";
const msgShipsOverlap = "Ships mustn't overlap each other.";
const msgPlacingSameShip = "Cannot place same ship twice.";
const msgHittingSameCell = "Cannot hit cell that already hit";

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
      throw new Error(msgPlacingSameShip);
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
          throw new Error(msgShipsOverlap);
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

  randomize(ships) {
    const randomTo = (max) => Math.floor(Math.random() * (max + 1));
    const randomInt = (from, to) => randomTo(to - from) + from;
    const randomOrientation = () => ["horizontal", "vertical"][randomTo(1)];

    this.#ships.forEach((ship) => {
      this.removeShip(ship);
      ships.push(ship);
    });
    // ships sorted from longest to shortest;
    sortedShips = ships.sort((a, b) => b.length - a.length);

    sortedShips.forEach((ship) => {
      while (true) {
        let x, y;
        const orientation = randomOrientation();

        if (orientation === "horizontal") {
          x = randomInt(1, BOARD_SIZE - ship.length + 1);
          y = randomInt(1, BOARD_SIZE);
        } else {
          x = randomInt(1, BOARD_SIZE);
          y = randomInt(1, BOARD_SIZE - ship.length + 1);
        }

        try {
          this.placeShip(ship, x, y, orientation);
        } catch (e) {
          continue;
        }
        break;
      }
    });
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
    this.#checkBounds(x, y);

    if (this.getHitAt(x, y)) {
      throw new Error(msgHittingSameCell);
    }

    this.#hitPositions.setCell(x, y, true);
    this.getShipAt(x, y)?.hit();
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

  isAllShipsSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}
