import * as gameState from "../states/game";

const playerBoardSelector = ".current-player-board";
const enemyBoardSelector = ".current-enemy-board";

function createCellElement(classes, x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell", ...classes);
  cell.style.setProperty("--x", x);
  cell.style.setProperty("--y", y);

  return cell;
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
    createCellElement.bind(null, ["hit"])
  );
}

export function updatePlayerBoard() {
  updateBoard(
    playerBoardSelector,
    gameState.getCurrentPlayer().gameboard.shipPositions,
    createCellElement.bind(null, ["ship"])
  );
}

export function update() {
  updatePlayerBoard();
  updateEnemyBoard();
}
