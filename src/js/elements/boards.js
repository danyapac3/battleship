import * as gameState from "../states/game";

const playerBoardSelector = ".player-board";
const enemyBoardSelector = ".enemy-board";

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
  const enemy = gameState.getCurrentEnemy();
  const { gameboard } = enemy;

  const children = [];
  gameboard.hitPositions.forEach((isHit, x, y) => {
    if (!isHit) {
      return;
    }

    const cell = createCellElement(["hit"], x, y);
    const isShip = !!gameboard.getCell(x, y).ship;
    if (isShip) {
      cell.classList.add("ship");
    }
    children.push(cell);
  });

  const boardElement = document.querySelector(enemyBoardSelector);
  boardElement.replaceChildren(...children);
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
