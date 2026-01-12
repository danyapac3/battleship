import * as gameState from "../states/game";
// TODO: Merge with current player board as they mostly identical;

const selector = ".current-enemy-board";

function createHitCellElement(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("hit-cell");
  cell.style.setProperty("--x", x);
  cell.style.setProperty("--y", y);

  return cell;
}

export function update() {
  const enemy = gameState.getCurrentEnemy();
  const { gameboard } = enemy;
  const enemyBoardElement = document.querySelector(selector);

  const children = [];
  gameboard.hitPositions.forEach((val, x, y) => {
    if (!val) {
      return;
    }
    children.push(createHitCellElement(x, y));
  });

  enemyBoardElement.replaceChildren(...children);
}
