const outOfBoundsMsg = "Ship must be placed within bounds";
const shipsOverlappingMsg = "Ships mustn't overlap";

export default class Gameboard {
  constructor() {
    this.shipPositions = Array.from({ length: 10 }).map(() =>
      Array.from({ length: 10 }).fill(null)
    );
  }

  placeShip(ship, x, y, orientation = "horizontal") {
    if (x < 1 || y < 1 || x > 10 || y > 10) {
      throw outOfBoundsMsg;
    }
    if (orientation === "horizontal" && x + ship.length - 1 > 10) {
      throw outOfBoundsMsg;
    }
    if (orientation === "vertical" && y + ship.length - 1 > 10) {
      throw outOfBoundsMsg;
    }

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;
      if (this.shipPositions[x - 1 + xOffset][y - 1 + yOffset] !== null) {
        throw shipsOverlappingMsg;
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const xOffset = orientation === "horizontal" ? i : 0;
      const yOffset = orientation === "vertical" ? i : 0;
      this.shipPositions[x - 1 + xOffset][y - 1 + yOffset] = ship;
    }
  }
}
