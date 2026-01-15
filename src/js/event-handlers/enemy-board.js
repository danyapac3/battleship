import * as gameState from "../states/game";
import { enemyBoard as board } from "../elements/boards";

board.addEventListener("click", ({ target }) => {
  if (!target.classList.contains("cell")) {
    return;
  }

  const cell = target;

  const x = parseInt(cell.dataset.x);
  const y = parseInt(cell.dataset.y);

  gameState.playTurn(x, y);
});
