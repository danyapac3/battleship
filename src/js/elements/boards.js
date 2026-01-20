const playerBoardSelector = ".player-board";
const enemyBoardSelector = ".enemy-board";

export const playerBoard = document.querySelector(playerBoardSelector);
export const enemyBoard = document.querySelector(enemyBoardSelector);

export function init() {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      playerBoard.appendChild(createCellElement(x, y));
      enemyBoard.appendChild(createCellElement(x, y));
    }
  }
}

function createCellElement(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.x = x;
  cell.dataset.y = y;
  return cell;
}

function hideBoardCells(boardElement) {
  const cells = boardElement.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("ship", "hit");
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

export function hidePlayerBoard() {
  hideBoardCells(playerBoard);
}

export function updatePlayerBoard(gameboard) {
  updateBoard(playerBoard, gameboard);
}

export function updateEnemyBoard(gameboard) {
  updateBoard(enemyBoard, gameboard, true);
}
