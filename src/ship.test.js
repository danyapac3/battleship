import Ship from "./ship.js";

describe("ship", () => {
  test.skip("constructs with right length", () => {
    expect(new Ship(4).length).toBe(4);
  });
  test.skip("throws error if length is not specified", () => {
    expect(() => void new Ship()).toThrow('Length must be specified')
  });
  test.skip("Isn't sunk is hit less than its length", () => {
    const ship = new Ship(5);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  })
  test.skip("It's sunk if it's been hit enough times", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});