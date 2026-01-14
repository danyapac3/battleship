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

function updateBoard(boardElement, board) {
  const { hitPositions, shipPositions } = board;

  hitPositions.forEach((isHit, x, y) => {
    const cellElement = getCellElementInPosition(boardElement, x, y);
    cellElement.classList.toggle("ship", !!shipPositions.getCell(x, y));
    cellElement.classList.toggle("hit", isHit);
  });
}

function updatePlayerBoard() {
  updateBoard(playerBoard, gameState.getCurrentPlayer().gameboard);
}

function updateEnemyBoard() {
  updateBoard(enemyBoard, gameState.getCurrentEnemy().gameboard);
}

export function update() {
  updatePlayerBoard();
  updateEnemyBoard();
}
