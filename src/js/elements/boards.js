import * as gameState from "../states/game";

const playerBoardSelector = ".player-board";
const enemyBoardSelector = ".enemy-board";

export const playerBoard = document.querySelector(playerBoardSelector);
export const enemyBoard = document.querySelector(enemyBoardSelector);

function createCellElement(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.x = x;
  cell.dataset.y = y;
  return cell;
}

export function init() {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      playerBoard.appendChild(createCellElement(x, y));
      enemyBoard.appendChild(createCellElement(x, y));
    }
  }
}

function getCellElementInPosition(board, x, y) {
  return board.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
}

function updateBoard(boardElement, board, hideUntouchedShipCells) {
  const { hitPositions, shipPositions } = board;

  hitPositions.forEach((isHit, x, y) => {
    const cellElement = getCellElementInPosition(boardElement, x, y);

    if (hideUntouchedShipCells && !isHit) {
      cellElement.classList.remove("ship", "hit");
      return;
    }

    cellElement.classList.toggle("ship", !!shipPositions.getCell(x, y));
    cellElement.classList.toggle("hit", isHit);
  });
}

function updatePlayerBoard() {
  updateBoard(playerBoard, gameState.getCurrentPlayer().gameboard);
}

function updateEnemyBoard() {
  updateBoard(enemyBoard, gameState.getCurrentEnemy().gameboard, true);
}

export function update() {
  updatePlayerBoard();
  updateEnemyBoard();
}
