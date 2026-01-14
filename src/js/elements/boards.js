import * as gameState from "../states/game";

const playerBoardSelector = ".player-board";
const enemyBoardSelector = ".enemy-board";

const playerBoard = document.querySelector(playerBoardSelector);
const enemyBoard = document.querySelector(enemyBoardSelector);

function createCellElement() {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  return cell;
}

export function init() {
  for (let i = 0; i < 10 * 10; i++) {
    playerBoard.appendChild(createCellElement());
    enemyBoard.appendChild(createCellElement());
  }
}

function getCellElementInPosition(board, x, y) {
  return board.children[x - 1 + (y - 1) * 10];
}

function updatePlayerBoard() {
  const { shipPositions } = gameState.getCurrentPlayer().gameboard;
  shipPositions.forEach((ship, x, y) => {
    const cellElement = getCellElementInPosition(playerBoard, x, y);
    cellElement.classList.toggle("ship", !!ship);
  });
}

function updateEnemyBoard() {
  const { shipPositions } = gameState.getCurrentEnemy().gameboard;
  const { hitPositions } = gameState.getCurrentEnemy().gameboard;

  hitPositions.forEach((isHit, x, y) => {
    const cellElement = getCellElementInPosition(enemyBoard, x, y);
    cellElement.classList.toggle("ship", !!shipPositions.getCell(x, y));
    cellElement.classList.toggle("hit", isHit);
  });
}

export function update() {
  updatePlayerBoard();
  updateEnemyBoard();
}
