import Game from "./game.js";
import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const shipPlaces = [
  [1, 1],
  [1, 3],
  [1, 5],
];

function createGameboard() {
  const gameboard = new Gameboard();
  shipPlaces.forEach(([x, y]) => {
    gameboard.placeShip(new Ship(1), x, y);
  });
  return gameboard;
}

function createPlayer(name) {
  return new Player(name, createGameboard());
}

function createGame() {
  const p1 = createPlayer("p1");
  const p2 = createPlayer("p2");
  return {
    p1,
    p2,
    game: new Game(p1, p2),
  };
}

describe("Game class", () => {
  test("getCurrentPlayer method returns first parameter given to constructor after creating", () => {
    const { p1, game } = createGame();
    expect(game.getCurrentPlayer()).toBe(p1);
  });

  test("getCurrentEnemy method returns second parameter given to constructor after creating", () => {
    const { p2, game } = createGame();
    expect(game.getCurrentEnemy()).toBe(p2);
  });

  test("togglePlayer toggles current player and enemy", () => {
    const { p1, p2, game } = createGame();
    game.togglePlayer();
    expect(game.getCurrentPlayer()).toBe(p2);
    expect(game.getCurrentEnemy()).toBe(p1);
    game.togglePlayer();
    expect(game.getCurrentPlayer()).toBe(p1);
    expect(game.getCurrentEnemy()).toBe(p2);
  });

  test("playRound returns true if the specified cell is hit for the first time otherwise it returns false", () => {
    const { game } = createGame();
    expect(game.playRound(1, 1)).toBe(true);
    expect(game.playRound(1, 1)).toBe(true);
    expect(game.playRound(1, 1)).toBe(false);
    expect(game.playRound(1, 1)).toBe(false);
  });

  test("playRound toggles player and enemy only if cell succesfuly hit", () => {
    const { p1, p2, game } = createGame();
    game.playRound(1, 1);
    expect(game.getCurrentPlayer()).toBe(p2);
    expect(game.getCurrentEnemy()).toBe(p1);
    game.playRound(2, 2);
    expect(game.getCurrentPlayer()).toBe(p1);
    expect(game.getCurrentEnemy()).toBe(p2);
    game.playRound(1, 1);
    expect(game.getCurrentPlayer()).toBe(p1);
    expect(game.getCurrentEnemy()).toBe(p2);
  });

  test("getWinner returns  null if there is no winner yet", () => {
    const { game } = createGame();
    expect(game.getWinner()).toBe(null);
  });

  test("getWinner: returns winner if there is one", () => {
    const { p1, p2, game } = createGame();
    shipPlaces.forEach(([x, y]) => {
      game.playRound(x, y);
      game.togglePlayer();
    });
    expect(game.getWinner()).toBe(p1);
  });

  test("getWinner returns current player if both players have all ships sunk", () => {
    const { p1, p2, game } = createGame();
    shipPlaces.forEach(([x, y]) => {
      game.playRound(x, y);
      game.playRound(x, y);
    });
    expect(game.getWinner()).toBe(p1);
    game.togglePlayer();
    expect(game.getWinner()).toBe(p2);
  });
});
