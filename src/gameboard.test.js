import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const outOfBoundsMsg = "Ship must be placed within bounds";
const shipsOverlappingMsg = "Ships mustn't overlap";

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
      }).toThrow(outOfBoundsMsg);
      expect(() => {
        gameboard.placeShip(new Ship(1), 11, 11, "vertical");
      }).toThrow(outOfBoundsMsg);
    });

    test("Ship overlaps one of bounds", () => {
      const gameboard = new Gameboard();
      expect(() => {
        gameboard.placeShip(new Ship(3), 9, 1, "horizontal");
      }).toThrow(outOfBoundsMsg);

      expect(() => {
        gameboard.placeShip(new Ship(3), 1, 9, "vertical");
      }).toThrow(outOfBoundsMsg);
    });

    test("Ships are placed at the same place", () => {
      const gameboard = new Gameboard();
      const ship1 = new Ship(1);
      const ship2 = new Ship(1);
      gameboard.placeShip(ship1, 1, 1, "horizontal");
      expect(() => {
        gameboard.placeShip(ship2, 1, 1, "horizontal");
      }).toThrow(shipsOverlappingMsg);
    });

    test("Long ships are overlapping", () => {
      const gameboard = new Gameboard();
      const ship1 = new Ship(3);
      const ship2 = new Ship(3);

      gameboard.placeShip(ship1, 3, 1, "vertical");
      expect(() => {
        gameboard.placeShip(ship2, 1, 3, "horizontal");
      }).toThrow(shipsOverlappingMsg);
    });
  });
  describe("hit method", () => {});
  describe("getCell method", () => {});
});
