import * as game from "../states/game.js";

function createShipCellElement(x, y) {
  const ship = document.createElement("div");
  ship.classList.add("ship-cell");
  ship.style.setProperty("--x", x);
  ship.style.setProperty("--y", y);

  return ship;
}

export function update() {
  const board = document.querySelector(".current-player-board");
  const currentPlayer = game.getCurrentPlayer();
  const gameboard = currentPlayer.gameboard;

  const children = [];
  gameboard.shipPositions.forEach((ship, x, y) => {
    if (!ship) {
      return;
    }

    const cell = createShipCellElement(x, y);
    children.push(cell);
  });

  board.replaceChildren(...children);
}
