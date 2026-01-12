import * as gameState from "../states/game";

const playerBoardSelector = ".current-player-board";
const enemyBoardSelector = ".current-enemy-board";

function createHitCellElement(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("hit-cell");
  cell.style.setProperty("--x", x);
  cell.style.setProperty("--y", y);

  return cell;
}

function createShipCellElement(x, y) {
  const ship = document.createElement("div");
  ship.classList.add("ship-cell");
  ship.style.setProperty("--x", x);
  ship.style.setProperty("--y", y);

  return ship;
}

function updateBoard(selector, board, cellFactory) {
  const children = [];
  board.forEach((val, x, y) => {
    if (!val) {
      return;
    }
    children.push(cellFactory(x, y));
  });

  const boardElement = document.querySelector(selector);
  boardElement.replaceChildren(...children);
}

export function updateEnemyBoard() {
  updateBoard(
    enemyBoardSelector,
    gameState.getCurrentEnemy().gameboard.hitPositions,
    createHitCellElement
  );
}

export function updatePlayerBoard() {
  updateBoard(
    playerBoardSelector,
    gameState.getCurrentPlayer().gameboard.shipPositions,
    createShipCellElement
  );
}

export function update() {
  updatePlayerBoard();
  updateEnemyBoard();
}
