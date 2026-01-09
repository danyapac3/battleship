import Game from "./game.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";

function createGameObjects() {
  const p1 = new Player("first", new Gameboard());
  const p2 = new Player("second", new Gameboard());
  const game = new Game(p1, p2);
  return { p1, p2, game };
}

describe("Game", () => {
  test("Default player is first passed as argument.", () => {
    const { game, p1 } = createGameObjects();
    expect(game.currentPlayer).toBe(p1);
  });

  test("Toggles current player if a cell was hit before.", () => {
    const { game, p1, p2 } = createGameObjects();
    game.playTurn(1, 1);
    expect(game.currentPlayer).toBe(p2);
    game.playTurn(1, 1);
    expect(game.currentPlayer).toBe(p1);
  });

  test("Doesn't toggle player if hit a cell that was hit before.", () => {
    const { game, p1 } = createGameObjects();
    game.playTurn(1, 1);
    game.playTurn(1, 1);
    game.playTurn(1, 1);
    expect(game.currentPlayer).toBe(p1);
  });

  test("Returns true if playTurn succeeds and false otherwise.", () => {
    const { game } = createGameObjects();
    expect(game.playTurn(1, 1)).toBe(true);
    expect(game.playTurn(1, 1)).toBe(true);
    expect(game.playTurn(1, 1)).toBe(false);
  });
});
