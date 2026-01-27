const playerBoardSelector = ".player-board";
const enemyBoardSelector = ".enemy-board";

export const playerBoardElement = document.querySelector(playerBoardSelector);
export const enemyBoardElement = document.querySelector(enemyBoardSelector);

let enemyBoardClickResolver = null;
let enemyBoardClickPromise = null;

export function init() {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      playerBoardElement.appendChild(createCellElement(x, y));
      enemyBoardElement.appendChild(createCellElement(x, y));
    }
  }

  enemyBoardElement.addEventListener("click", ({ target }) => {
    if (target.classList.contains("cell")) {
      const coordinates = {
        x: parseInt(target.dataset.x),
        y: parseInt(target.dataset.y),
      };
      enemyBoardClickResolver?.(coordinates);
      enemyBoardClickResolver = null;
      enemyBoardClickPromise = null;
    }
  });
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
  board.forEachCell(({ x, y, isHit, ship }) => {
    const cellElement = getCellElementInPosition(boardElement, x, y);

    if (hideUntouchedShipCells && !isHit) {
      cellElement.classList.remove("ship", "hit");
      return;
    }

    cellElement.classList.toggle("ship", !!ship);
    cellElement.classList.toggle("hit", isHit);
  });
}

export function hidePlayerBoard() {
  hideBoardCells(playerBoardElement);
}

export function waitEnemyBoardClick() {
  return (enemyBoardClickPromise ||= new Promise((resolve) => {
    enemyBoardClickResolver = resolve;
  }));
}

export const playerBoard = {
  update: (gameboard) => updateBoard(playerBoardElement, gameboard),
};

export const enemyBoard = {
  update: (gameboard) => updateBoard(enemyBoardElement, gameboard, true),
  waitClick: () => {
    return (enemyBoardClickPromise ||= new Promise((resolve) => {
      enemyBoardClickResolver = resolve;
    }));
  },
};
