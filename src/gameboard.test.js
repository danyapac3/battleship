import Gameboard from "./gameboard.js";
import {
  OutOfBoundsError,
  SameShipPlacedError,
  ShipOverlappingError,
  ShipTouchError,
} from "./gameboard.js";
import Ship from "./ship.js";

describe("gameboard", () => {
  describe("placeShip method", () => {
    test("place a ship in correct place", () => {
      const gameboard = new Gameboard();
      expect(() =>
        gameboard.placeShip(new Ship(1), 1, 1, "vertical")
      ).not.toThrow();
    });

    test("Ship is placed out of the bounds", () => {
      const gameboard = new Gameboard();
      expect(() => {
        gameboard.placeShip(new Ship(1), -1, -1, "vertical");
      }).toThrow(OutOfBoundsError);
      expect(() => {
        gameboard.placeShip(new Ship(1), 11, 11, "vertical");
      }).toThrow(OutOfBoundsError);
    });

    test("Ship overlaps one of bounds", () => {
      const gameboard = new Gameboard();
      expect(() => {
        gameboard.placeShip(new Ship(3), 9, 1, "horizontal");
      }).toThrow(OutOfBoundsError);

      expect(() => {
        gameboard.placeShip(new Ship(3), 1, 9, "vertical");
      }).toThrow(OutOfBoundsError);
    });

    test("Ships are placed at the same place", () => {
      const gameboard = new Gameboard();
      const ship1 = new Ship(1);
      const ship2 = new Ship(1);
      gameboard.placeShip(ship1, 1, 1, "horizontal");
      expect(() => {
        gameboard.placeShip(ship2, 1, 1, "horizontal");
      }).toThrow(ShipOverlappingError);
    });

    test("Long ships are overlapping", () => {
      const gameboard = new Gameboard();
      const ship1 = new Ship(3);
      const ship2 = new Ship(3);

      gameboard.placeShip(ship1, 3, 1, "vertical");
      expect(() => {
        gameboard.placeShip(ship2, 1, 3, "horizontal");
      }).toThrow(ShipOverlappingError);
    });

    test.each([
      [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
      ],
    ])("The ships touch each other", ({ x, y }) => {
      const gameboard = new Gameboard();
      gameboard.placeShip(new Ship(1), 2, 2, "horizontal");
      expect(() => {
        gameboard.placeShip(new Ship(1), x, y, "horizontal");
      }).toThrow(ShipTouchError);
    });

    test("Same ship is placed twice at the same place", () => {
      const gameboard = new Gameboard();
      const ship1 = new Ship(1);
      expect(() => {
        gameboard.placeShip(ship1, 1, 1, "horizontal");
        gameboard.placeShip(ship1, 2, 1, "horizontal");
      }).toThrow(SameShipPlacedError);
    });
  });

  describe("hit method", () => {
    test.each([
      [
        { x: 1, y: 1 },
        { x: 10, y: 10 },
      ],
    ])("Hitting area inside of gameboard", ({ x, y }) => {
      const gameboard = new Gameboard();
      expect(() => {
        gameboard.hit(x, y);
      }).not.toThrow();
    });

    test.each([
      [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 11, y: 1 },
        { x: 1, y: 11 },
      ],
    ])("Hitting area outside of gameboard", ({ x, y }) => {
      const gameboard = new Gameboard();
      expect(() => {
        gameboard.hit(x, y);
      }).toThrow(OutOfBoundsError);
    });
  });

  describe("getCell method", () => {
    test("Shows whether there is ship at specified cell", () => {
      const gameboard = new Gameboard();
      const ship1 = new Ship(3);
      const ship2 = new Ship(2);
      gameboard.placeShip(ship1, 1, 1, "horizontal");
      gameboard.placeShip(ship2, 1, 3, "vertical");
      expect(gameboard.getCell(1, 1).ship).toBe(ship1);
      expect(gameboard.getCell(2, 1).ship).toBe(ship1);
      expect(gameboard.getCell(3, 1).ship).toBe(ship1);
      expect(gameboard.getCell(1, 2).ship).toBe(null);
      expect(gameboard.getCell(1, 3).ship).toBe(ship2);
      expect(gameboard.getCell(1, 4).ship).toBe(ship2);
      expect(gameboard.getCell(10, 10).ship).toBe(null);
    });

    test("Shows whether specified cell is hit", () => {
      const gameboard = new Gameboard();
      gameboard.hit(1, 1);
      gameboard.hit(3, 5);
      expect(gameboard.getCell(1, 1).isHit).toBe(true);
      expect(gameboard.getCell(3, 5).isHit).toBe(true);
      expect(gameboard.getCell(3, 7).isHit).toBe(false);
    });

    test("Trying to access cell out of board", () => {
      const gameboard = new Gameboard();
      expect(() => gameboard.getCell(0, 0)).toThrow(OutOfBoundsError);
      expect(() => gameboard.getCell(11, 0)).toThrow(OutOfBoundsError);
      expect(() => gameboard.getCell(0, 11)).toThrow(OutOfBoundsError);
    });
  });
});
