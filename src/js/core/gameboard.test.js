import Gameboard from "./gameboard.js";
import { BOARD_SIZE } from "./gameboard.js";
import Ship from "./ship.js";

describe("gameboard", () => {
  // ---------------------------------------------------------------------------
  test("getShipAt returns placed ship at specified cell", () => {
    const board = new Gameboard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(2);
    board.placeShip(ship1, 1, 1);
    board.placeShip(ship2, 1, 3);
    expect(board.getShipAt(1, 1)).toBe(ship1);
    expect(board.getShipAt(1, 3)).toBe(ship2);
    expect(board.getShipAt(2, 3)).toBe(ship2);
  });

  // ---------------------------------------------------------------------------
  test("getShipAt returns null if there is no ship found", () => {
    const board = new Gameboard();
    expect(board.getShipAt(1, 1)).toBe(null);
    expect(board.getShipAt(1, 3)).toBe(null);
    expect(board.getShipAt(2, 3)).toBe(null);
  });

  // ---------------------------------------------------------------------------
  test.each([
    [0, 1],
    [1, 0],
    [1, 11],
    [11, 1],
  ])("Trying to get ship out of board", (x, y) => {
    const board = new Gameboard();
    expect(() => board.getShipAt(x, y)).toThrow(RangeError);
  });

  // ---------------------------------------------------------------------------
  test.each([
    [0, 1],
    [1, 0],
    [1, 11],
    [11, 1],
  ])("trying to place ship out of bounds", (x, y) => {
    const board = new Gameboard();
    const ship = new Ship(1);
    expect(() => board.placeShip(ship, x, y)).toThrow(RangeError);
  });

  // ---------------------------------------------------------------------------
  test("Correctly place ships with horizontal orientation", () => {
    const board = new Gameboard();
    const ship1 = new Ship(2);
    const ship2 = new Ship(2);
    board.placeShip(ship1, 1, 1);
    board.placeShip(ship2, 1, 3, "horizontal");
    expect(board.getShipAt(1, 1)).toBe(ship1);
    expect(board.getShipAt(2, 1)).toBe(ship1);
    expect(board.getShipAt(1, 3)).toBe(ship2);
    expect(board.getShipAt(2, 3)).toBe(ship2);
  });

  // ---------------------------------------------------------------------------
  test("Correctly place ships with vertical orientation", () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, 3, 1, "vertical");
    expect(board.getShipAt(3, 1)).toBe(ship);
    expect(board.getShipAt(3, 2)).toBe(ship);
  });

  // ---------------------------------------------------------------------------
  test("The placed ship overlaps one of bounds", () => {
    const gameboard = new Gameboard();
    expect(() => gameboard.placeShip(new Ship(3), 9, 1)).toThrow(RangeError);
    expect(() => gameboard.placeShip(new Ship(3), 1, 9, "vertical")).toThrow(
      RangeError,
    );
  });

  // ---------------------------------------------------------------------------
  test("Trying to place two ship at the same place", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    gameboard.placeShip(ship1, 1, 1, "horizontal");
    expect(() => {
      gameboard.placeShip(ship2, 1, 1, "horizontal");
    }).toThrow();
  });

  // ---------------------------------------------------------------------------
  test("Trying to place same ship twice", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(1);
    expect(() => {
      gameboard.placeShip(ship1, 1, 1, "horizontal");
      gameboard.placeShip(ship1, 3, 3, "horizontal");
    }).toThrow();
  });

  // ---------------------------------------------------------------------------
  test("Placed ships overlap", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(3);
    const ship2 = new Ship(3);

    gameboard.placeShip(ship1, 3, 1, "vertical");
    expect(() => gameboard.placeShip(ship2, 1, 3, "horizontal")).toThrow();
  });

  // ---------------------------------------------------------------------------
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
    }).toThrow();
  });

  // ---------------------------------------------------------------------------
  test("Placed ships are accessible via getShips method", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);

    gameboard.placeShip(ship1, 1, 1);
    gameboard.placeShip(ship2, 1, 3);
    expect(gameboard.getShips().includes(ship1)).toBe(true);
    expect(gameboard.getShips().includes(ship2)).toBe(true);
  });

  // ---------------------------------------------------------------------------
  test("removeShip removes ship from board", () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    board.placeShip(ship, 1, 1);
    board.removeShip(ship);
    expect(board.getShips().includes(ship)).toBe(false);
    expect(board.getShipAt(1, 1)).toBe(null);
  });

  // ---------------------------------------------------------------------------
  test("ship can be placed again after removing", () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    board.placeShip(ship, 1, 1);
    board.removeShip(ship);
    board.placeShip(ship, 1, 1);
    expect(board.getShipAt(1, 1)).toBe(ship);
  });

  // ---------------------------------------------------------------------------
  test("getHitAt method returns true if cell is hit otherwise returns false", () => {
    const board = new Gameboard();
    board.hit(1, 1);
    board.hit(2, 2);
    expect(board.getHitAt(1, 1)).toBe(true);
    expect(board.getHitAt(2, 2)).toBe(true);
    expect(board.getHitAt(1, 2)).toBe(false);
    expect(board.getHitAt(2, 1)).toBe(false);
  });

  // ---------------------------------------------------------------------------
  test.each([
    [0, 1],
    [1, 0],
    [1, 11],
    [11, 1],
  ])("Trying get hit out of the board", (x, y) => {
    const board = new Gameboard();
    expect(() => board.getHitAt(x, y)).toThrow(RangeError);
  });

  // ---------------------------------------------------------------------------
  test("Trying hit same cell twice", () => {
    const board = new Gameboard();
    board.hit(1, 1);
    board.hit(10, 10);
    expect(() => board.hit(1, 1)).toThrow();
    expect(() => board.hit(10, 10)).toThrow();
  });

  // ---------------------------------------------------------------------------
  test.each([
    [0, 1],
    [1, 0],
    [1, 11],
    [11, 1],
  ])("Trying hit cell out of the board", (x, y) => {
    const board = new Gameboard();
    expect(() => board.hit(x, y)).toThrow(RangeError);
  });

  // ---------------------------------------------------------------------------
  test("forEachCell method iterates correct number of times ", () => {
    const board = new Gameboard();
    const numberOfIterations = BOARD_SIZE * BOARD_SIZE;
    let count = 0;

    board.forEachCell(() => {
      count++;
    });

    expect(count).toBe(numberOfIterations);
  });
});
